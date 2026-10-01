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

export default function InternForm() {
  const prefixSelector = (
    <Form.Item name="countryCode" noStyle initialValue="+91">
      <Select
        style={{ width: 85 }}
        options={countryCodes}
        showSearch
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
          RESUME UPLOAD <span className="text-red-500">*</span>
        </h3>
        <p className="text-[#8C909F] text-sm mb-4">
          Attach your resume (PDF or DOCX format).
        </p>

        <Form.Item
          name="resume"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[{ required: true, message: 'Please upload your resume!' }]}
        >
          <Dragger {...uploadProps}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined className="!text-[#4D8EFF] !text-5xl" />
            </p>
            <p className="ant-upload-text text-[#4D8EFF] font-semibold">
              UPLOAD RESUME
            </p>
            <p className="ant-upload-hint !text-white font-medium">
              PDF / DOCX
            </p>
          </Dragger>
        </Form.Item>
      </div>

      {/* Internship Details */}
      <div>
        <h3 className="text-2xl mb-6 text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
          INTERNSHIP APPLICATION DETAILS
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

          {/* College / University */}
          <Form.Item
            label={<span className="text-[#8C909F] text-sm">COLLEGE / UNIVERSITY <span className="text-red-500">*</span></span>}
            name="college"
            rules={[{ required: true, message: 'Please input your college/university!' }]}
          >
            <Input placeholder="Enter college or university name" />
          </Form.Item>

          {/* Course / Degree */}
          <Form.Item
            label={<span className="text-[#8C909F] text-sm">COURSE / DEGREE <span className="text-red-500">*</span></span>}
            name="course"
            rules={[{ required: true, message: 'Please input your course/degree!' }]}
          >
            <Input placeholder="e.g. B.Tech / B.E. / BCA / M.Tech" />
          </Form.Item>

          {/* Department / Specialization */}
          <Form.Item
            label={<span className="text-[#8C909F] text-sm">DEPARTMENT / SPECIALIZATION <span className="text-red-500">*</span></span>}
            name="department"
            rules={[{ required: true, message: 'Please input your department!' }]}
          >
            <Input placeholder="e.g. Computer Science, IT, AI & DS" />
          </Form.Item>

          {/* Current Year / Semester */}
          <Form.Item
            label={<span className="text-[#8C909F] text-sm">CURRENT YEAR / SEMESTER <span className="text-red-500">*</span></span>}
            name="currentYear"
            rules={[{ required: true, message: 'Please select your current year/semester!' }]}
          >
            <Select
              placeholder="Select Year / Semester"
              suffixIcon={<DownOutlined style={{ color: '#FFFFFF' }} />}
              options={[
                { value: '1st Year', label: '1st Year' },
                { value: '2nd Year', label: '2nd Year' },
                { value: '3rd Year', label: '3rd Year' },
                { value: '4th Year', label: '4th Year' },
                { value: 'Final Semester', label: 'Final Semester' },
                { value: 'Passed Out', label: 'Passed Out / Recent Graduate' },
              ]}
            />
          </Form.Item>

          {/* Internship Role */}
          <Form.Item
            label={<span className="text-[#8C909F] text-sm">INTERNSHIP ROLE <span className="text-red-500">*</span></span>}
            name="internshipRole"
            rules={[{ required: true, message: 'Please input preferred internship role!' }]}
          >
            <Input placeholder="e.g. Frontend Intern, AR/VR Intern, 3D Intern" />
          </Form.Item>

          {/* Preferred Start Date */}
          <Form.Item
            label={<span className="text-[#8C909F] text-sm">PREFERRED START DATE <span className="text-red-500">*</span></span>}
            name="preferredStartDate"
            rules={[{ required: true, message: 'Please select preferred start date!' }]}
          >
            <DatePicker className="!w-full" placeholder="mm/dd/yy" format="MM/DD/YYYY" />
          </Form.Item>

          {/* Portfolio / LinkedIn URL */}
          <Form.Item
            label={<span className="text-[#8C909F] text-sm">PORTFOLIO / LINKEDIN URL</span>}
            name="portfolioUrl"
          >
            <Input placeholder="https://linkedin.com/in/username or portfolio link" />
          </Form.Item>

          {/* Why do you want to join? */}
          <Form.Item
            label={<span className="text-[#8C909F] text-sm">WHY DO YOU WANT TO JOIN? <span className="text-red-500">*</span></span>}
            name="whyJoin"
            rules={[{ required: true, message: 'Please write why you want to join!' }]}
            className="md:col-span-2"
          >
            <TextArea placeholder="Tell us briefly about your interest and motivation..." rows={4} />
          </Form.Item>
        </div>
      </div>
    </div>
  );
}
