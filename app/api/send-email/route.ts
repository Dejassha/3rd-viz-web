import { NextRequest, NextResponse } from "next/server";
import { BrevoClient } from "@getbrevo/brevo";

const brevo = new BrevoClient({
    apiKey: process.env.BREVO_API_KEY as string,
});

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { fullName, email, applicantType } = body;

        if (!fullName || !email) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // --- Notify admin ---
        const adminEmailPromise = brevo.transactionalEmails.sendTransacEmail({
            subject: `New ${applicantType === "intern" ? "Internship" : "Job"} Application`,
            htmlContent: `
        <h2>New ${applicantType} application submitted</h2>
        <p><strong>Name: </strong> ${fullName}</p>
        <p><strong>Email: </strong> ${email}</p>
      `,
            sender: { name: "Thirdvizion Careers", email: "workmail@thirdvizion.com" },
            to: [{ email: "workmail@thirdvizion.com", name: "Thirdvizion Careers" }], // your inbox, stays fixed
        });

        // --- Confirmation to the applicant (dynamic recipient) ---
        const userEmailPromise = brevo.transactionalEmails.sendTransacEmail({
            subject: "We received your application!",
            htmlContent: `
        <h2>Dear, ${fullName}!</h2>
        <p>Greetings from <strong>ThirdVizion Labs!</strong></p>
        <p>Thankyou for your interest in joining out team. We,re pleased to inform you that we have successfully recieved your application and the details submitted through our Careers page.</p>
        <p>Our HR team will review your application, and if your profile matches our current requirements, we will contact you shortly regarding the next steps in the recruitment process.</p>
        <p>We appreciate your interest in <strong>ThirdVizion Labs</strong> and wish you the very best!</p>
        <p>Warm Regards,</p>
        <p><strong>HR Team</strong></p>
       <p><strong>ThirdVizion Labs Private Limited</strong></p>
       `,
            sender: { name: "Thirdvizion Careers", email: "workmail@thirdvizion.com" },
            to: [{ email: email, name: fullName }], // ← dynamic, comes from the form
        });

        await Promise.all([adminEmailPromise, userEmailPromise]);

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error: any) {
        console.error("Brevo email error:", error?.response?.body || error?.message || error);
        return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }
}