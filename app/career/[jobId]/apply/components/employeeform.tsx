import { Form, Input, Select, DatePicker, Upload, Space, message } from 'antd';
import { InboxOutlined, DownOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';

const { Dragger } = Upload;
const { TextArea } = Input;

const countryCodes = [
  { value: '+91', label: '+91' },
  { value: '+1', label: '+1' },
  { value: '+44', label: '+44' },
  { value: '+61', label: '+61' },
  { value: '+971', label: '+971' },
  { value: '+65', label: '+65' },
  { value: '+49', label: '+49' },
  { value: '+33', label: '+33' },
  { value: '+81', label: '+81' },
  { value: '+86', label: '+86' },
  { value: '+92', label: '+92' },
  { value: '+880', label: '+880' },
  { value: '+94', label: '+94' },
  { value: '+977', label: '+977' },
  { value: '+55', label: '+55' },
  { value: '+27', label: '+27' },
  { value: '+39', label: '+39' },
  { value: '+34', label: '+34' },
  { value: '+966', label: '+966' },
  { value: '+60', label: '+60' },
  { value: '+62', label: '+62' },
  { value: '+63', label: '+63' },
  { value: '+84', label: '+84' },
  { value: '+82', label: '+82' },
  { value: '+31', label: '+31' },
  { value: '+41', label: '+41' },
  { value: '+46', label: '+46' },
  { value: '+47', label: '+47' },
  { value: '+45', label: '+45' },
  { value: '+353', label: '+353' },
  { value: '+64', label: '+64' },
];

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

export default function EmployeeForm() {
  const prefixSelector = (
    <Form.Item name="countryCode" noStyle initialValue="+91">
      <Select
        style={{ width: 85 }}
        options={countryCodes}
        showSearch
        suffixIcon={<DownOutlined style={{ color: '#FFFFFF' }} />}
        popupMatchSelectWidth={false}
        filterOption={(input, option) =>
          (option?.label ?? '').toLowerCase().includes(input.toLowerCase()) ||
          (option?.value ?? '').toLowerCase().includes(input.toLowerCase())
        }
      />
    </Form.Item>
  );

  const uploadProps: UploadProps = {
    name: 'file',
    multiple: false,
    maxCount: 1,
    accept: '.pdf,.doc,.docx',
    beforeUpload: (file) => {
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isLt5M) {
        message.error('File must be smaller than 5MB!');
        return Upload.LIST_IGNORE;
      }
      return false;
    },
  };

  return (
    <div className="space-y-8">
      {/* Resume Upload */}
      <div>
        <h3 className="text-xl font-semibold mb-2 text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
          RESUME / CV UPLOAD <span className="text-red-500">*</span>
        </h3>
        <p className="text-[#8C909F] text-sm mb-4">
          Attach your resume or CV (PDF or DOCX format).
        </p>

        <Form.Item
          name="resume"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[{ required: true, message: 'Please upload your resume/CV!' }]}
        >
          <Dragger {...uploadProps}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined className="!text-[#4D8EFF] !text-5xl" />
            </p>
            <p className="ant-upload-text text-[#4D8EFF] font-semibold">
              UPLOAD RESUME / CV
            </p>
            <p className="ant-upload-hint !text-white font-medium">
              PDF / DOCX
            </p>
          </Dragger>
        </Form.Item>
      </div>

      {/* Employee Details */}
      <div>
        <h3 className="text-2xl mb-6 text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
          EMPLOYEE JOB APPLICATION DETAILS
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <Form.Item
            label={<span className="text-[#8C909F] text-sm">FULL NAME <span className="text-red-500">*</span></span>}
            name="fullName"
            rules={[
              { required: true, message: 'Please input your full name!' },
              { pattern: /^[a-zA-Z\s]+$/, message: 'Please enter alphabets only!' }
            ]}
          >
            <Input
              placeholder="Enter your full name"
              onInput={(e: React.FormEvent<HTMLInputElement>) => {
                e.currentTarget.value = e.currentTarget.value.replace(/[^a-zA-Z\s]/g, '');
              }}
            />
          </Form.Item>

          {/* Email Address */}
          <Form.Item
            label={<span className="text-[#8C909F] text-sm">EMAIL ADDRESS <span className="text-red-500">*</span></span>}
            name="email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email!' }
            ]}
          >
            <Input placeholder="name@example.com" />
          </Form.Item>

          {/* Phone Number */}
          <Form.Item
            label={<span className="text-[#8C909F] text-sm">PHONE NUMBER <span className="text-red-500">*</span></span>}
            required
          >
            <Space.Compact style={{ width: '100%' }}>
              {prefixSelector}
              <Form.Item
                name="phone"
                noStyle
                rules={[
                  { required: true, message: 'Please input your phone number!' },
                  { pattern: /^[0-9]{10}$/, message: 'Phone number must be exactly 10 digits!' }
                ]}
              >
                <Input
                  placeholder="0000000000"
                  maxLength={10}
                  onInput={(e: React.FormEvent<HTMLInputElement>) => {
                    e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, '').slice(0, 10);
                  }}
                />
              </Form.Item>
            </Space.Compact>
          </Form.Item>

          {/* Highest Qualification */}
          <Form.Item
            label={<span className="text-[#8C909F] text-sm">HIGHEST QUALIFICATION <span className="text-red-500">*</span></span>}
            name="qualification"
            rules={[{ required: true, message: 'Please input your highest qualification!' }]}
          >
            <Input placeholder="e.g. B.E. / B.Tech / M.Tech / MBA / MCA" />
          </Form.Item>

          {/* Total Experience */}
          <Form.Item
            label={<span className="text-[#8C909F] text-sm">TOTAL EXPERIENCE <span className="text-red-500">*</span></span>}
            name="totalExperience"
            rules={[{ required: true, message: 'Please select total experience!' }]}
          >
            <Select
              placeholder="Select Experience Level"
              suffixIcon={<DownOutlined style={{ color: '#FFFFFF' }} />}
              options={[
                { value: 'Fresher', label: 'Fresher (0 Years)' },
                { value: '1-2 Years', label: '1 - 2 Years' },
                { value: '3-5 Years', label: '3 - 5 Years' },
                { value: '5-8 Years', label: '5 - 8 Years' },
                { value: '8+ Years', label: '8+ Years' },
              ]}
            />
          </Form.Item>

          {/* Current / Previous Company */}
          <Form.Item
            label={<span className="text-[#8C909F] text-sm">CURRENT / PREVIOUS COMPANY <span className="text-red-500">*</span></span>}
            name="previousCompany"
            rules={[{ required: true, message: 'Please input company name!' }]}
          >
            <Input placeholder="Enter company name (or N/A if Fresher)" />
          </Form.Item>

          {/* Current Job Title */}
          <Form.Item
            label={<span className="text-[#8C909F] text-sm">CURRENT JOB TITLE <span className="text-red-500">*</span></span>}
            name="jobTitle"
            rules={[{ required: true, message: 'Please input your current job title!' }]}
          >
            <Input placeholder="e.g. Senior Frontend Developer / N/A" />
          </Form.Item>

          {/* Applying For */}
          <Form.Item
            label={<span className="text-[#8C909F] text-sm">APPLYING FOR <span className="text-red-500">*</span></span>}
            name="applyingFor"
            rules={[{ required: true, message: 'Please input target job position!' }]}
          >
            <Input placeholder="Position title" />
          </Form.Item>

          {/* Key Skills */}
          <Form.Item
            label={<span className="text-[#8C909F] text-sm">KEY SKILLS <span className="text-red-500">*</span></span>}
            name="keySkills"
            rules={[{ required: true, message: 'Please input your key skills!' }]}
          >
            <Input placeholder="e.g. React, Next.js, Three.js, Node.js" />
          </Form.Item>

          {/* Expected Salary */}
          <Form.Item
            label={<span className="text-[#8C909F] text-sm">EXPECTED SALARY <span className="text-red-500">*</span></span>}
            name="expectedSalary"
            rules={[{ required: true, message: 'Please input expected salary!' }]}
          >
            <Input placeholder="e.g. ₹6,000,000 LPA or As per industry standards" />
          </Form.Item>

          {/* Notice Period */}
          <Form.Item
            label={<span className="text-[#8C909F] text-sm">NOTICE PERIOD <span className="text-red-500">*</span></span>}
            name="noticePeriod"
            rules={[{ required: true, message: 'Please select notice period!' }]}
          >
            <Select
              placeholder="Select Notice Period"
              suffixIcon={<DownOutlined style={{ color: '#FFFFFF' }} />}
              options={[
                { value: 'Immediate', label: 'Immediate Joining' },
                { value: '15 Days', label: '15 Days' },
                { value: '30 Days', label: '30 Days' },
                { value: '60 Days', label: '60 Days' },
                { value: '90 Days', label: '90 Days' },
              ]}
            />
          </Form.Item>

          {/* Available Joining Date */}
          <Form.Item
            label={<span className="text-[#8C909F] text-sm">AVAILABLE JOINING DATE <span className="text-red-500">*</span></span>}
            name="availableJoiningDate"
            rules={[{ required: true, message: 'Please select available joining date!' }]}
          >
            <DatePicker className="!w-full" placeholder="mm/dd/yy" format="MM/DD/YYYY" />
          </Form.Item>

          {/* Portfolio / LinkedIn URL */}
          <Form.Item
            label={<span className="text-[#8C909F] text-sm">PORTFOLIO / LINKEDIN URL</span>}
            name="portfolioUrl"
            className="md:col-span-2"
          >
            <Input placeholder="https://linkedin.com/in/username or portfolio link" />
          </Form.Item>

          {/* Cover Letter */}
          <Form.Item
            label={<span className="text-[#8C909F] text-sm">COVER LETTER (OPTIONAL)</span>}
            name="coverLetter"
            className="md:col-span-2"
          >
            <TextArea placeholder="Add cover letter or additional note for recruiters..." rows={4} />
          </Form.Item>
        </div>
      </div>
    </div>
  );
}
