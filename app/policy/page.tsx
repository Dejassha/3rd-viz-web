"use client";

import React from "react";

const sections = [
  {
    id: 1,
    title: "Introduction",
    content: `ThirdVizion ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your personal information when you visit www.thirdvizion.com or engage with our services. By using our website or services, you agree to the practices described in this policy.`,
  },
  {
    id: 2,
    title: "Information We Collect",
    content: `We collect information you provide directly — such as your name, email address, phone number, company name, and project details when you fill out a form or contact us.

We also collect certain data automatically when you visit our website, including your IP address, browser type, pages visited, and device information, via cookies and similar tracking technologies.`,
  },
  {
    id: 3,
    title: "How We Use Your Information",
    content: `We use your information to:

— Deliver and manage our services
— Respond to enquiries and provide support
— Send relevant updates or marketing communications (where opted in)
— Improve our website and user experience
— Comply with legal obligations
— Detect and prevent fraud or security issues`,
  },
  {
    id: 4,
    title: "Legal Basis for Processing",
    content: `Where required by law (including GDPR and India's Digital Personal Data Protection Act, 2023), we process your data based on:

— Your consent
— Contractual necessity
— Legitimate business interests
— Legal obligation`,
  },
  {
    id: 5,
    title: "Sharing Your Information",
    content: `We do not sell, rent, or trade your personal information. We may share data with trusted service providers (e.g., cloud hosting, CRM tools such as Salesforce and Zoho) who are contractually bound to protect it, or with legal authorities when required by law.`,
  },
  {
    id: 6,
    title: "Cookies",
    content: `We use essential, analytics, and preference cookies to operate and improve our website. You can manage cookie preferences through your browser settings. Continued use of our website constitutes consent to our cookie usage.`,
  },
  {
    id: 7,
    title: "Data Retention",
    content: `We retain personal data only as long as necessary:

— Client data: up to 7 years after the end of a business relationship
— Enquiry data: up to 2 years
— Marketing data: until you unsubscribe`,
  },
  {
    id: 8,
    title: "Data Security",
    content: `We use SSL/TLS encryption, access controls, and secure cloud infrastructure to protect your data. While we apply commercially reasonable safeguards, no method of internet transmission is 100% secure.`,
  },
  {
    id: 9,
    title: "Your Rights",
    content: `Depending on your location, you may have the right to access, correct, delete, restrict, or port your personal data, or to withdraw consent at any time. To exercise these rights, contact us at privacy@thirdvizion.com. We will respond within 30 days.`,
  },
  {
    id: 10,
    title: "Children's Privacy",
    content: `Our services are not directed at children under 18. We do not knowingly collect data from minors. If you believe we have done so inadvertently, please contact us and we will delete it promptly.`,
  },
  {
    id: 11,
    title: "Changes to This Policy",
    content: `We may update this Privacy Policy periodically. Changes will be reflected by a revised date at the top of this page. Continued use of our website after changes constitutes acceptance of the updated policy.`,
  },
  {
    id: 12,
    title: "Contact Us",
    content: `For any questions or requests regarding this Privacy Policy:

ThirdVizion Technology Solutions
www.thirdvizion.com
privacy@thirdvizion.com`,
  },
];

export default function PrivacyPolicy() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&display=swap');

        .pp-wrap {
          background: #000;
          min-height: 100vh;
          color: #707070;
          font-family: 'Inter', sans-serif;
          font-weight: 300;
          padding: 80px 24px 120px;
        }

        .pp-inner {
          max-width: 720px;
          margin: 0 auto;
        }

        .pp-header {
          margin-bottom: 64px;
          border-bottom: 1px solid #1a1a1a;
          padding-bottom: 40px;
        }

        .pp-label {
          font-size: 13px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #404040;
          margin-bottom: 20px;
        }

        .pp-title {
          font-size: 36px;
          font-weight: 400;
          color: #909090;
          letter-spacing: -0.02em;
          margin-bottom: 16px;
          line-height: 1.2;
        }

        .pp-date {
          font-size: 14px;
          color: #444;
          letter-spacing: 0.05em;
        }

        .pp-section {
          border-bottom: 1px solid #161616;
          padding: 36px 0;
        }

        .pp-section:last-of-type {
          border-bottom: none;
        }

        .pp-section-header {
          display: flex;
          align-items: baseline;
          gap: 20px;
          margin-bottom: 20px;
        }

        .pp-num {
          font-size: 12px;
          color: #333;
          letter-spacing: 0.12em;
          min-width: 22px;
          font-family: 'Inter', sans-serif;
        }

        .pp-name {
          font-size: 19px;
          font-weight: 400;
          color: #888;
          letter-spacing: 0.01em;
        }

        .pp-text {
          font-size: 16px;
          line-height: 1.9;
          color: #585858;
          padding-left: 42px;
          white-space: pre-line;
          letter-spacing: 0.01em;
          margin: 0;
        }

        .pp-footer {
          margin-top: 64px;
          padding-top: 32px;
          border-top: 1px solid #161616;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
        }

        .pp-footer-brand {
          font-size: 13px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #383838;
        }

        .pp-footer-link {
          font-size: 13px;
          color: #383838;
          text-decoration: none;
          letter-spacing: 0.03em;
          transition: color 0.2s;
        }

        .pp-footer-link:hover {
          color: #707070;
        }

        @media (max-width: 600px) {
          .pp-wrap { padding: 48px 20px 80px; }
          .pp-title { font-size: 26px; }
          .pp-name { font-size: 16px; }
          .pp-text { font-size: 15px; padding-left: 28px; }
        }
      `}</style>

      <div className="pp-wrap">
        <div className="pp-inner">

          <header className="pp-header">
            <p className="pp-label">ThirdVizion Technology Solutions</p>
            <h1 className="pp-title">Privacy Policy</h1>
            <p className="pp-date">Effective 2025 &nbsp;·&nbsp; Version 1.0</p>
          </header>

          {sections.map((s) => (
            <div key={s.id} className="pp-section">
              <div className="pp-section-header">
                <span className="pp-num">{String(s.id).padStart(2, "0")}</span>
                <span className="pp-name">{s.title}</span>
              </div>
              <p className="pp-text">{s.content}</p>
            </div>
          ))}

          <footer className="pp-footer">
            <span className="pp-footer-brand">ThirdVizion</span>
            <a href="mailto:privacy@thirdvizion.com" className="pp-footer-link">
              privacy@thirdvizion.com
            </a>
            <a
              href="https://www.thirdvizion.com"
              className="pp-footer-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              thirdvizion.com
            </a>
          </footer>

        </div>
      </div>
    </>
  );
}