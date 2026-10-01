import { NextRequest, NextResponse } from "next/server";
import { BrevoClient } from "@getbrevo/brevo";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      fullName,
      email,
      phone,
      company,
      service,
      serviceTitle,
      category,
      answers,
      additionalNotes,
    } = body;

    if (!email || !fullName || !service) {
      return NextResponse.json(
        { error: "Name, email, and service are required." },
        { status: 400 }
      );
    }

    // 1. Post to Payload CMS service-inquiries collection
    const hosts = [
      process.env.NEXT_PUBLIC_PAYLOAD_URL,
      "http://localhost:3001",
      "https://cms.thirdvizion.com",
    ].filter(Boolean) as string[];

    let cmsSuccess = false;
    let createdDoc = null;

    const cmsPayload = {
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone?.trim() || null,
      company: company?.trim() || null,
      service: service.trim(),
      serviceTitle: serviceTitle?.trim() || service.trim(),
      category: category?.trim() || null,
      status: "new",
      answers: Array.isArray(answers)
        ? answers.map((a: any) => ({
            question: a.question || "",
            answer: a.answer || "",
          }))
        : [],
      additionalNotes: additionalNotes?.trim() || null,
    };

    for (const host of hosts) {
      try {
        const res = await fetch(`${host}/api/service-inquiries`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(cmsPayload),
        });

        if (res.ok) {
          const data = await res.json();
          createdDoc = data.doc;
          cmsSuccess = true;
          break;
        } else {
          const errData = await res.json().catch(() => ({}));
          console.warn(`Payload CMS (${host}) response not ok:`, errData);
        }
      } catch (err) {
        console.warn(`Failed to post service inquiry to host ${host}:`, err);
      }
    }

    // 2. Send email notification via Brevo if configured
    if (process.env.BREVO_API_KEY) {
      try {
        const brevo = new BrevoClient({
          apiKey: process.env.BREVO_API_KEY as string,
        });

        const formattedAnswersHtml =
          Array.isArray(answers) && answers.length > 0
            ? `<h3>Questionnaire Answers:</h3>
               <table style="border-collapse:collapse;width:100%;">
                 ${answers
                   .map(
                     (a: any) => `
                   <tr style="border-bottom:1px solid #eee;">
                     <td style="padding:8px 0;font-weight:bold;color:#333;">${a.question}</td>
                     <td style="padding:8px 0;color:#555;">${a.answer}</td>
                   </tr>`
                   )
                   .join("")}
               </table>`
            : "";

        // Admin Notification
        const adminEmailPromise = brevo.transactionalEmails.sendTransacEmail({
          subject: `New Service Questionnaire Lead: ${serviceTitle || service} from ${fullName}`,
          htmlContent: `
            <h2>New Service Consultation Inquiry Submitted</h2>
            <p><strong>Service:</strong> ${serviceTitle || service} (${category || "N/A"})</p>
            <p><strong>Name:</strong> ${fullName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || "N/A"}</p>
            <p><strong>Company:</strong> ${company || "N/A"}</p>
            ${formattedAnswersHtml}
            ${
              additionalNotes
                ? `<p><strong>Additional Notes:</strong><br/>${additionalNotes.replace(
                    /\n/g,
                    "<br/>"
                  )}</p>`
                : ""
            }
          `,
          sender: { name: "Thirdvizion Inquiries", email: "business@thirdvizion.com" },
          to: [{ email: "business@thirdvizion.com", name: "Thirdvizion Team" }],
        });

        // User Confirmation
        const userEmailPromise = brevo.transactionalEmails.sendTransacEmail({
          subject: `We received your inquiry for ${serviceTitle || "our service"} - ThirdVizion`,
          htmlContent: `
            <h2>Dear ${fullName.split(" ")[0]},</h2>
            <p>Thank you for submitting your consultation requirements for <strong>${
              serviceTitle || "our service"
            }</strong>.</p>
            <p>Our solution architects will review your answers and prepare a customized proposal.</p>
            <br/>
            <p>Warm regards,</p>
            <p><strong>ThirdVizion Team</strong></p>
          `,
          sender: { name: "Thirdvizion", email: "business@thirdvizion.com" },
          to: [{ email: email, name: fullName }],
        });

        await Promise.allSettled([adminEmailPromise, userEmailPromise]);
      } catch (brevoErr) {
        console.warn("Brevo email notification skipped or failed:", brevoErr);
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: "Service inquiry submitted and saved to CMS successfully.",
        doc: createdDoc,
        cmsSaved: cmsSuccess,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Service Inquiry API error:", error?.message || error);
    return NextResponse.json(
      { error: "Failed to submit inquiry to CMS." },
      { status: 500 }
    );
  }
}
