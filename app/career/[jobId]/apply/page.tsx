'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { ConfigProvider, Form, App } from 'antd';
import InternForm from './components/internform';
import EmployeeForm from './components/employeeform';
import './apply.css';

const PAYLOAD_URL = process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3001';
const INTERNAL_API_URL = process.env.NEXT_PUBLIC_INTERNAL_API_URL || 'http://localhost:5001';

function ApplicationFormContent() {
  const params = useParams();
  const jobId = params.jobId as string;
  const { message } = App.useApp();

  const [applicantType, setApplicantType] = useState<'intern' | 'employee'>('intern');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form] = Form.useForm();

  const handleToggle = (type: 'intern' | 'employee') => {
    if (type !== applicantType) {
      setApplicantType(type);
      form.resetFields();
    }
  };

  const handleSubmit = async (values: any) => {
    setIsSubmitting(true);
    try {
      let resumeId: string | null = null;

      // 1. Upload Resume
      if (values.resume && values.resume.length > 0) {
        const file = values.resume[0].originFileObj || values.resume[0];
        const formData = new FormData();
        formData.append('file', file);

        const uploadRes = await fetch(`${INTERNAL_API_URL}/api/upload/public`, {
          method: 'POST',
          body: formData,
        });

        if (!uploadRes.ok) {
          const uploadErr = await uploadRes.json().catch(() => null);
          console.error('Resume upload error:', uploadErr);
          throw new Error(
            uploadErr?.message || uploadErr?.error || 'Failed to upload resume'
          );
        }

        const uploadData = await uploadRes.json();
        resumeId = uploadData.url || uploadData.filename || null;
      }

      // 2. Format dates & payload aligned with Payload CMS Applications schema
      const formattedPhone = values.countryCode ? `${values.countryCode} ${values.phone}` : values.phone;

      const applicationData: Record<string, any> = {
        applicationType: applicantType === 'intern' ? 'internship' : 'job',
        fullName: values.fullName,
        email: values.email,
        phone: formattedPhone,
        portfolioUrl: values.portfolioUrl || undefined,
        jobId: jobId || undefined,
      };

      if (resumeId) {
        applicationData.resumeId = resumeId;
      }

      if (applicantType === 'intern') {
        applicationData.college = values.college;
        applicationData.course = values.course;
        applicationData.department = values.department;
        applicationData.currentYear = values.currentYear;
        applicationData.internshipRole = values.internshipRole;
        applicationData.preferredStartDate = values.preferredStartDate
          ? values.preferredStartDate.toISOString()
          : undefined;
        applicationData.whyJoin = values.whyJoin;
      } else {
        applicationData.highestQualification = values.qualification;
        applicationData.totalExperience = values.totalExperience;
        applicationData.currentCompany = values.previousCompany;
        applicationData.currentJobTitle = values.jobTitle;
        applicationData.applyingFor = values.applyingFor;
        applicationData.keySkills = values.keySkills;
        applicationData.expectedSalary = values.expectedSalary;
        applicationData.noticePeriod = values.noticePeriod;
        applicationData.availableJoiningDate = values.availableJoiningDate
          ? values.availableJoiningDate.toISOString()
          : undefined;
        applicationData.coverLetter = values.coverLetter || undefined;
      }

      // 3. Submit application to Internal Backend (Prisma / internal_website_vspace)
      const applicationRes = await fetch(`${INTERNAL_API_URL}/api/applications`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(applicationData),
      });

      if (!applicationRes.ok) {
        const errorData = await applicationRes.json().catch(() => null);
        console.error('Internal backend application submission error:', errorData);
        throw new Error(
          errorData?.message ||
            errorData?.errors?.[0]?.message ||
            'Failed to submit application'
        );
      }

      // 4. Send confirmation + admin notification email via Brevo
      try {
        await fetch('/api/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fullName: values.fullName,
            email: values.email,
            applicantType,
          }),
        });
      } catch (emailError) {
        console.error('Email send error:', emailError);
      }

      message.success(
        `${applicantType === 'intern' ? 'Internship' : 'Job'} application submitted successfully!`
      );
      form.resetFields();
    } catch (error: any) {
      console.error('Submission error:', error);
      message.error(error?.message || 'There was an error submitting your application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <div
      className="min-h-screen bg-black text-white"
      style={{
        paddingLeft: '80px',
        paddingRight: '80px',
        paddingTop: '48px',
        paddingBottom: '64px',
      }}
    >
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm mb-8">
        <a href="/career" className="text-[#8C909F] hover:text-white transition-colors">
          Career Home
        </a>
        <span className="text-[#8C909F]">›</span>
        <a href={`/career/${jobId}`} className="text-[#8C909F] hover:text-white transition-colors">
          Job Details
        </a>
        <span className="text-[#8C909F]">›</span>
        <span className="bg-gradient-to-r from-[#ADC6FF] to-[#4D8EFF] bg-clip-text text-transparent font-medium">
          Application Form
        </span>
      </nav>

      {/* Main Form Container */}
      <div className="bg-[#0F1115] border border-[#1F2228] rounded-2xl p-8 md:p-12">
        <h1
          className="text-4xl md:text-5xl text-center mb-8"
          style={{ fontFamily: 'Anta, sans-serif' }}
        >
          REGISTER WITH THIRDVIZION
        </h1>

        {/* Toggle Switcher */}
        <div className="flex justify-center mb-10">
          <div className="bg-[#191B23] border border-[#32353C] p-1.5 rounded-full flex gap-2 max-w-md w-full">
            <button
              type="button"
              onClick={() => handleToggle('intern')}
              className={`flex-1 py-3 px-6 rounded-full font-semibold transition-all duration-300 text-center text-sm md:text-base ${
                applicantType === 'intern'
                  ? 'bg-gradient-to-r from-[#ADC6FF] to-[#4D8EFF] text-[#1E1E1E] shadow-lg'
                  : 'text-[#8C909F] hover:text-white hover:bg-[#222630]'
              }`}
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              INTERN
            </button>
            <button
              type="button"
              onClick={() => handleToggle('employee')}
              className={`flex-1 py-3 px-6 rounded-full font-semibold transition-all duration-300 text-center text-sm md:text-base ${
                applicantType === 'employee'
                  ? 'bg-gradient-to-r from-[#ADC6FF] to-[#4D8EFF] text-[#1E1E1E] shadow-lg'
                  : 'text-[#8C909F] hover:text-white hover:bg-[#222630]'
              }`}
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              EMPLOYEE
            </button>
          </div>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className="application-form"
        >
          {applicantType === 'intern' ? <InternForm /> : <EmployeeForm />}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-12 pt-8 border-t border-[#1F2228]">
            <button
              type="button"
              onClick={handleBack}
              className="px-6 py-3 border border-[#32353C] rounded-full text-white hover:bg-[#191B23] transition-colors flex items-center gap-2"
            >
              ← BACK
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-gradient-to-r from-[#ADC6FF] to-[#4D8EFF] text-[#1E1E1E] font-medium px-8 py-3 rounded-full hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSubmitting
                ? 'SUBMITTING...'
                : `SUBMIT ${applicantType === 'intern' ? 'INTERNSHIP' : 'APPLICATION'} →`}
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default function ApplicationFormPage() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#4D8EFF',
          colorBgBase: '#0F1115',
          colorBgContainer: '#0F1115',
          colorBgElevated: '#191B23',
          colorText: '#FFFFFF',
          colorTextSecondary: '#8C909F',
          colorTextPlaceholder: '#8C909F',
          colorBorder: '#32353C',
          borderRadius: 8,
          fontFamily: 'Poppins, sans-serif',
        },
      }}
    >
      <App>
        <ApplicationFormContent />
      </App>
    </ConfigProvider>
  );
}