import React, { useState, useEffect, useCallback } from "react";
import { Input, Form, Space, Button, Alert, message } from "antd";
import {
  IeOutlined,
  AppstoreAddOutlined,
  FacebookFilled,
  TwitterSquareFilled,
  LinkedinFilled,
  GithubFilled
} from "@ant-design/icons";
import CountryDropdown from "../../../helpers/countryDropdown";
import {
  orgNameValidation,
  orgSMValidation,
  userWebsiteValidation
} from "../../../helpers/validationRules";
import { useDispatch, useSelector } from "react-redux";
import { useFirebase, useFirestore } from "react-redux-firebase";
import {
  updateUserProfile,
  clearProfileEditError
} from "../../../store/actions";

const EditProfileDetailsModal = ({ profileData, modelCloseCallback }) => {
  const firebase = useFirebase();
  const firestore = useFirestore();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadingProps = useSelector(
    ({
      profile: {
        edit: { loading }
      }
    }) => loading
  );
  const errorProps = useSelector(
    ({
      profile: {
        edit: { error }
      }
    }) => error
  );

  useEffect(() => {
    setLoading(loadingProps);
  }, [loadingProps]);

  useEffect(() => {
    setError(errorProps);
  }, [errorProps]);

  const closeModal = useCallback(() => {
    modelCloseCallback(false);
    clearProfileEditError()(dispatch);
  }, [modelCloseCallback, dispatch]);

  useEffect(() => {
    if (loading === false && error === false) {
      message.success("Changes saved!");
      closeModal();
    }
  }, [closeModal, loading, error]);

  const getData = prop => (Boolean(prop) ? prop : "");

  useEffect(() => {
    form.setFieldsValue({
      displayName: getData(profileData.displayName),
      website: getData(profileData.website),
      link_facebook: getData(profileData.link_facebook),
      link_github: getData(profileData.link_github),
      link_linkedin: getData(profileData.link_linkedin),
      link_twitter: getData(profileData.link_twitter),
      description: getData(profileData.description),
      org_country: getData(profileData.country)
    });
  }, [form, profileData]);

  const onSubmit = formData => {
    const {
      displayName,
      website,
      link_facebook,
      link_github,
      link_linkedin,
      link_twitter,
      description,
      org_country: country
    } = formData;
    updateUserProfile({
      displayName,
      website,
      link_facebook,
      link_github,
      link_linkedin,
      link_twitter,
      description,
      country
    })(firebase, firestore, dispatch);
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
        <label className="form-label">Name</label>
        <Form.Item name={"displayName"} rules={orgNameValidation}>
          <Input
            prefix={
              <AppstoreAddOutlined style={{ color: "rgba(0,0,0,.25)" }} />
            }
            placeholder="Name"
            autoComplete="none"
          />
        </Form.Item>

        <label className="form-label">Country</label>
        <CountryDropdown />

        <label className="form-label">Website</label>
        <Form.Item name="website" rules={userWebsiteValidation}>
          <Input
            prefix={<IeOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="Website"
            autoComplete="url"
          />
        </Form.Item>

        <label className="form-label">Description</label>
        <Form.Item name="description" rules={null}>
          <Input.TextArea
            placeholder="Provide a description about yourself"
            autoSize={{ minRows: 4, maxRows: 20 }}
          />
        </Form.Item>

        <label className="form-label">Facebook page</label>
        <Form.Item name="link_facebook" rules={orgSMValidation}>
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

        <label className="form-label">Twitter account</label>
        <Form.Item name="link_twitter" rules={orgSMValidation}>
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

        <label className="form-label">LinkedIn profile</label>
        <Form.Item name="link_linkedin" rules={orgSMValidation}>
          <Input
            prefix={
              <>
                <LinkedinFilled className="linkedin-color mr-4" />{" "}
                linkedin.com/in/
              </>
            }
            placeholder="Linkedin handle"
            autoComplete="none"
          />
        </Form.Item>

        <label className="form-label">GitHub profile</label>
        <Form.Item name="link_github" rules={orgSMValidation}>
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

export default EditProfileDetailsModal;
