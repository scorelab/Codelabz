import React, { useState, useEffect } from "react";
import { Input, Form, Space, Button, Alert, message } from "antd";
import {
  IeOutlined,
  AppstoreAddOutlined,
  FacebookFilled,
  TwitterSquareFilled,
  LinkedinFilled,
  GithubFilled,
} from "@ant-design/icons";
import CountryDropdown from "../../helpers/countryDropdown";
import {
  orgNameValidation,
  orgWebsiteValidation,
  orgSMValidation,
} from "../../helpers/validationRules";

const EditOrgDetailsModal = ({ currentOrgData, modelCloseCallback }) => {
  const [form] = Form.useForm();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    form.setFieldsValue({
      org_name: currentOrgData.org_name,
      org_website: currentOrgData.org_website,
      org_link_facebook: currentOrgData.org_link_facebook,
      org_link_github: currentOrgData.org_link_github,
      org_link_linkedin: currentOrgData.org_link_linkedin,
      org_link_twitter: currentOrgData.org_link_twitter,
      org_description: currentOrgData.org_description,
      org_country: currentOrgData.org_country,
    });
  }, [form, currentOrgData]);

  const closeModal = () => {
    modelCloseCallback(false);
  };

  const onSubmit = (formData) => {
    console.log(formData);
    setError("error? what error?");
    setLoading(true);
    // edit org
    setTimeout(() => {
      message.success("Changes saved!");
      closeModal();
    }, 3000);
  };

  return (
    <>
      {error && (
        <Alert
          message={""}
          description={error}
          type="error"
          closable
          className="mb-24"
        />
      )}
      <Form form={form} onFinish={onSubmit}>
        <label className="form-label">Organization Name</label>
        <Form.Item name={"org_name"} rules={orgNameValidation}>
          <Input
            prefix={
              <AppstoreAddOutlined style={{ color: "rgba(0,0,0,.25)" }} />
            }
            placeholder="Organization Name"
            autoComplete="organization"
          />
        </Form.Item>

        <label className="form-label">Organization country</label>
        <CountryDropdown />

        <label className="form-label">Organization website</label>
        <Form.Item name="org_website" rules={orgWebsiteValidation}>
          <Input
            prefix={<IeOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="Website"
            autoComplete="url"
          />
        </Form.Item>

        <label className="form-label">Organization description</label>
        <Form.Item name="org_description" rules={null}>
          <Input.TextArea
            placeholder="Provide a description about the organization and/or the tutorials published"
            autoSize={{ minRows: 4, maxRows: 20 }}
          />
        </Form.Item>

        <label className="form-label">Organization Facebook page</label>
        <Form.Item name="org_link_facebook" rules={orgSMValidation}>
          <Input
            prefix={
              <>
                <FacebookFilled className="facebook-color mr-4" /> facebook.com/
              </>
            }
            placeholder="Facebook page handle"
            autoComplete="none"
          />
        </Form.Item>

        <label className="form-label">Organization Twitter account</label>
        <Form.Item name="org_link_twitter" rules={orgSMValidation}>
          <Input
            prefix={
              <>
                <TwitterSquareFilled className="twitter-color mr-4" />{" "}
                twitter.com/
              </>
            }
            placeholder="Twitter handle (without @)"
            autoComplete="none"
          />
        </Form.Item>

        <label className="form-label">Organization LinkedIn profile</label>
        <Form.Item name="org_link_linkedin" rules={orgSMValidation}>
          <Input
            prefix={
              <>
                <LinkedinFilled className="linkedin-color mr-4" />{" "}
                linkedin.com/company/
              </>
            }
            placeholder="Linkedin handle"
            autoComplete="none"
          />
        </Form.Item>

        <label className="form-label">Organization GitHub profile</label>
        <Form.Item name="org_link_github" rules={orgSMValidation}>
          <Input
            prefix={
              <>
                <GithubFilled className="github-color mr-4" /> github.com/
              </>
            }
            placeholder="GitHub handle"
            autoComplete="none"
          />
        </Form.Item>

        <Form.Item className="mb-0">
          <Space style={{ float: "right" }}>
            <Button key="back" onClick={closeModal}>
              Cancel
            </Button>
            <Button
              key="submit"
              type="primary"
              htmlType="submit"
              loading={loading}
            >
              {loading ? "Saving..." : "Save"}
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </>
  );
};

export default EditOrgDetailsModal;
