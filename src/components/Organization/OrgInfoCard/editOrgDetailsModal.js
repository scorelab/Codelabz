import React, { useState, useEffect, useCallback } from "react";
import { Input, Form, Space, Button, Alert, message } from "antd";
// import Input from "@material-ui/core/Input";
import TextField from "@material-ui/core/TextField";

import {
  IeOutlined,
  AppstoreAddOutlined,
  FacebookFilled,
  TwitterSquareFilled,
  LinkedinFilled,
  GithubFilled,
} from "@ant-design/icons";
import CountryDropdown from "../../../helpers/countryDropdown";
import {
  orgNameValidation,
  orgWebsiteValidation,
  orgSMValidation,
} from "../../../helpers/validationRules";
import { useDispatch, useSelector } from "react-redux";
import { useFirebase, useFirestore } from "react-redux-firebase";
import { editGeneralData, clearEditGeneral } from "../../../store/actions";
import InputAdornment from "@material-ui/core/InputAdornment";
const EditOrgDetailsModal = ({ currentOrgData, modelCloseCallback }) => {
  const firebase = useFirebase();
  const firestore = useFirestore();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadingProps = useSelector(
    ({
      org: {
        general: { loading },
      },
    }) => loading
  );
  const errorProps = useSelector(
    ({
      org: {
        general: { error },
      },
    }) => error
  );
  const profileOrganizations = useSelector(
    ({
      profile: {
        data: { organizations },
      },
    }) => organizations
  );

  useEffect(() => {
    setLoading(loadingProps);
  }, [loadingProps]);

  useEffect(() => {
    setError(errorProps);
  }, [errorProps]);

  const closeModal = useCallback(() => {
    modelCloseCallback(false);
    clearEditGeneral()(dispatch);
  }, [modelCloseCallback, dispatch]);

  useEffect(() => {
    if (loading === false && error === false) {
      message.success("Changes saved!");
      closeModal();
    }
  }, [closeModal, loading, error]);

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

  const onSubmit = (formData) => {
    editGeneralData(
      {
        org_handle: currentOrgData.org_handle,
        org_image: currentOrgData.org_image,
        ...formData,
      },
      profileOrganizations
    )(firebase, firestore, dispatch);
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
          <TextField
            variant="outlined"
            placeholder="Organization Name"
            autoComplete="none"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AppstoreAddOutlined style={{ color: "rgba(0,0,0,.25)" }} />
                </InputAdornment>
              ),
            }}
          ></TextField>
        </Form.Item>

        <label className="form-label">Organization country</label>
        <CountryDropdown />

        <label className="form-label">Organization website</label>
        <Form.Item name="org_website" rules={orgWebsiteValidation}>
          <TextField
            variant="outlined"
            placeholder="Website"
            autoComplete="url"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IeOutlined style={{ color: "rgba(0,0,0,.25)" }} />
                </InputAdornment>
              ),
            }}
          ></TextField>
        </Form.Item>

        <label className="form-label">Organization description</label>
        <Form.Item name="org_description" rules={null}>
          <TextField
            variant="outlined"
            placeholder="Provide a description about the organization and/or the tutorials published"
            fullWidth
          ></TextField>
        </Form.Item>

        <label className="form-label">Organization Facebook page</label>
        <Form.Item name="org_link_facebook" rules={orgSMValidation}>
          <TextField
            variant="outlined"
            placeholder="Facebook page handle"
            autoComplete="none"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <>
                    <FacebookFilled className="facebook-color mr-4" />{" "}
                    facebook.com/
                  </>
                </InputAdornment>
              ),
            }}
          ></TextField>
        </Form.Item>

        <label className="form-label">Organization Twitter account</label>
        <Form.Item name="org_link_twitter" rules={orgSMValidation}>
          <TextField
            variant="outlined"
            placeholder="Twitter handle (without @)"
            autoComplete="none"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <>
                    <TwitterSquareFilled className="twitter-color mr-4" />{" "}
                    twitter.com/
                  </>
                </InputAdornment>
              ),
            }}
          ></TextField>
        </Form.Item>

        <label className="form-label">Organization LinkedIn profile</label>
        <Form.Item name="org_link_linkedin" rules={orgSMValidation}>
          <TextField
            variant="outlined"
            placeholder="Linkedin handle"
            autoComplete="none"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <>
                    <LinkedinFilled className="linkedin-color mr-4" />{" "}
                    linkedin.com/company/
                  </>
                </InputAdornment>
              ),
            }}
          ></TextField>
        </Form.Item>

        <label className="form-label">Organization GitHub profile</label>
        <Form.Item name="org_link_github" rules={orgSMValidation}>
          <TextField
            variant="outlined"
            placeholder="GitHub handle"
            autoComplete="none"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <>
                    <GithubFilled className="github-color mr-4" /> github.com/
                  </>
                </InputAdornment>
              ),
            }}
          ></TextField>
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
