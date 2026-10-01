import { Form, Input, Select, DatePicker, Radio } from 'antd';
import { DownOutlined } from '@ant-design/icons';

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

const PersonalInfo = () => {
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

  return (
    <div>
      <h2 className="text-2xl mb-6" style={{ fontFamily: 'Outfit, sans-serif' }}>
        PERSONAL INFO
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Form.Item
          label={<span className="text-[#8C909F] text-sm">FIRST NAME <span className="text-red-500">*</span></span>}
          name="firstName"
          rules={[
            { required: true, message: 'Please input your first name!' },
            { pattern: /^[a-zA-Z\s]+$/, message: 'Please enter alphabets only!' }
          ]}
        >
          <Input
            placeholder="Jana"
            onInput={(e: React.FormEvent<HTMLInputElement>) => {
              e.currentTarget.value = e.currentTarget.value.replace(/[^a-zA-Z\s]/g, '');
            }}
          />
        </Form.Item>

        <Form.Item
          label={<span className="text-[#8C909F] text-sm">LAST NAME <span className="text-red-500">*</span></span>}
          name="lastName"
          rules={[
            { required: true, message: 'Please input your last name!' },
            { pattern: /^[a-zA-Z\s]+$/, message: 'Please enter alphabets only!' }
          ]}
        >
          <Input
            placeholder="G"
            onInput={(e: React.FormEvent<HTMLInputElement>) => {
              e.currentTarget.value = e.currentTarget.value.replace(/[^a-zA-Z\s]/g, '');
            }}
          />
        </Form.Item>

        <Form.Item
          label={<span className="text-[#8C909F] text-sm">EMAIL <span className="text-red-500">*</span></span>}
          name="email"
          rules={[
            { required: true, message: 'Please input your email!' },
            { type: 'email', message: 'Please enter a valid email!' }
          ]}
        >
          <Input placeholder="Jana@123gmail.com" />
        </Form.Item>

        <Form.Item
          label={<span className="text-[#8C909F] text-sm">PHONE NO <span className="text-red-500">*</span></span>}
          name="phone"
          rules={[
            { required: true, message: 'Please input your phone number!' },
            { pattern: /^[0-9]{10}$/, message: 'Phone number must be exactly 10 digits!' }
          ]}
        >
          <Input
            addonBefore={prefixSelector}
            placeholder="0000000000"
            maxLength={10}
            onInput={(e: React.FormEvent<HTMLInputElement>) => {
              e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, '').slice(0, 10);
            }}
          />
        </Form.Item>

        <Form.Item
          label={<span className="text-[#8C909F] text-sm">FATHER&apos;S NAME <span className="text-red-500">*</span></span>}
          name="fatherName"
          rules={[
            { required: true, message: 'Please input your father\'s name!' },
            { pattern: /^[a-zA-Z\s]+$/, message: 'Please enter alphabets only!' }
          ]}
        >
          <Input
            placeholder="Enter father's name"
            onInput={(e: React.FormEvent<HTMLInputElement>) => {
              e.currentTarget.value = e.currentTarget.value.replace(/[^a-zA-Z\s]/g, '');
            }}
          />
        </Form.Item>

        <Form.Item
          label={<span className="text-[#8C909F] text-sm">MOTHER&apos;S NAME <span className="text-red-500">*</span></span>}
          name="motherName"
          rules={[{ required: true, message: 'Please input your mother\'s name!' }]}
        >
          <Input placeholder="NAME" />
        </Form.Item>

        <Form.Item
          label={<span className="text-[#8C909F] text-sm">BLOOD GROUP <span className="text-red-500">*</span></span>}
          name="bloodGroup"
          rules={[{ required: true, message: 'Please input your blood group!' }]}
        >
          <Input placeholder="Enter your Blood group" />
        </Form.Item>

        <Form.Item
          label={<span className="text-[#8C909F] text-sm">GENDER <span className="text-red-500">*</span></span>}
          name="gender"
          rules={[{ required: true, message: 'Please select your gender!' }]}
        >
          <Select
            placeholder="SELECT GENDER"
            suffixIcon={<DownOutlined style={{ color: '#FFFFFF' }} />}
            options={[
              { value: 'male', label: 'Male' },
              { value: 'female', label: 'Female' },
              { value: 'other', label: 'Other' },
              { value: 'prefer_not_to_say', label: 'Prefer not to say' },
            ]}
          />
        </Form.Item>

        <Form.Item
          label={<span className="text-[#8C909F] text-sm">DATE OF BIRTH <span className="text-red-500">*</span></span>}
          name="dob"
          rules={[{ required: true, message: 'Please select your date of birth!' }]}
        >
          <DatePicker className="!w-full" placeholder="mm/dd/yy" format="MM/DD/YYYY" />
        </Form.Item>

        <Form.Item
          label={<span className="text-[#8C909F] text-sm">REFERRAL (OPTIONAL)</span>}
          name="referral"
        >
          <Input placeholder="23ee67" />
        </Form.Item>

        <Form.Item
          label={<span className="text-[#8C909F] text-sm">PRESENT ADDRESS <span className="text-red-500">*</span></span>}
          name="presentAddress"
          rules={[{ required: true, message: 'Please input your present address!' }]}
          className="md:col-span-2"
        >
          <Input placeholder="Enter your Address" />
        </Form.Item>

        <Form.Item
          label={<span className="text-[#8C909F] text-sm">PERMANENT ADDRESS <span className="text-red-500">*</span></span>}
          name="permanentAddress"
          rules={[{ required: true, message: 'Please input your permanent address!' }]}
          className="md:col-span-2"
        >
          <Input.TextArea placeholder="Enter Your Address" rows={3} />
        </Form.Item>

        <Form.Item
          label={<span className="text-[#8C909F] text-sm">PREVIOUS INTERVIEW WITH THIRDVIZION?</span>}
          name="previousInterview"
          className="md:col-span-2"
        >
          <Radio.Group className="flex gap-6">
            <Radio value="yes">YES</Radio>
            <Radio value="no">NO</Radio>
          </Radio.Group>
        </Form.Item>
      </div>
    </div>
  );
};

export default PersonalInfo;
