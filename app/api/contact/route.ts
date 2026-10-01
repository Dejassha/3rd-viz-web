import { NextRequest, NextResponse } from "next/server";
import { BrevoClient } from "@getbrevo/brevo";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { firstName, lastName, companyName, service, email, description } = body;

    if (!email || !firstName) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const fullName = `${firstName} ${lastName || ""}`.trim();

    if (process.env.BREVO_API_KEY) {
      try {
        const brevo = new BrevoClient({
          apiKey: process.env.BREVO_API_KEY as string,
        });

        // Notify admin
        const adminEmailPromise = brevo.transactionalEmails.sendTransacEmail({
          subject: `New Service Inquiry: ${service || "General"} from ${fullName}${companyName ? ` (${companyName})` : ""}`,
          htmlContent: `
            <h2>New Contact Inquiry Submitted</h2>
            <p><strong>Name:</strong> ${fullName}</p>
            <p><strong>Company:</strong> ${companyName || "N/A"}</p>
            <p><strong>Service Requested:</strong> ${service || "General Inquiry"}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Description / Requirements:</strong></p>
            <p>${description ? description.replace(/\n/g, "<br/>") : "No description provided."}</p>
          `,
          sender: { name: "Thirdvizion Contact", email: "business@thirdvizion.com" },
          to: [{ email: "business@thirdvizion.com", name: "Thirdvizion Inquiries" }],
        });

        // Confirmation to sender
        const userEmailPromise = brevo.transactionalEmails.sendTransacEmail({
          subject: "We received your inquiry - ThirdVizion",
          htmlContent: `
            <h2>Dear ${firstName},</h2>
            <p>Thank you for getting in touch with <strong>ThirdVizion</strong>!</p>
            <p>We have successfully received your inquiry regarding <strong>${service || "our services"}</strong>.</p>
            <p>Our team will review your project details and get in touch with you shortly.</p>
            <br/>
            <p>Warm regards,</p>
            <p><strong>ThirdVizion Team</strong></p>
          `,
          sender: { name: "Thirdvizion", email: "business@thirdvizion.com" },
          to: [{ email: email, name: fullName }],
        });

        await Promise.allSettled([adminEmailPromise, userEmailPromise]);
      } catch (brevoErr) {
        console.warn("Brevo email send skipped or failed:", brevoErr);
      }
    }

    return NextResponse.json({ success: true, message: "Inquiry received successfully" }, { status: 200 });
  } catch (error: any) {
    console.error("Contact API error:", error?.message || error);
    return NextResponse.json({ error: "Failed to submit inquiry" }, { status: 500 });
  }
}
