import { Upload, message, Form } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';

const { Dragger } = Upload;

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const ResumeUpload = () => {
  const props: UploadProps = {
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
      return false; // Prevent auto upload since we will upload it manually
    },
  };

  return (
    <div className="mb-12">
      <h2 className="text-2xl mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
        AUTOFILL APPLICATION
      </h2>
      <p className="text-[#8C909F] text-sm mb-6">
        Attach resume to automatically populate fields.
      </p>

      <Form.Item
        name="resume"
        valuePropName="fileList"
        getValueFromEvent={normFile}
        rules={[{ required: true, message: 'Please upload your resume!' }]}
      >
        <Dragger {...props}>
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
  );
};

export default ResumeUpload;
