import React, { useState, useEffect, useCallback } from "react";
import { Input, Form, Space, Button, Alert, message } from "antd";
import countryList from "../../../helpers/countryList";

import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

import Select from "@material-ui/core/Select";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";

import PersonIcon from "@material-ui/icons/Person";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import PublicIcon from "@material-ui/icons/Public";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import BusinessIcon from "@material-ui/icons/Business";
import { TextareaAutosize } from "@material-ui/core";
import { IeOutlined, AppstoreAddOutlined, FacebookFilled, TwitterSquareFilled, LinkedinFilled, GithubFilled } from "@ant-design/icons";
import CountryDropdown from "../../../helpers/countryDropdown";
import { orgNameValidation, orgSMValidation, userWebsiteValidation } from "../../../helpers/validationRules";
import { useDispatch, useSelector } from "react-redux";
import { useFirebase, useFirestore } from "react-redux-firebase";
import { updateUserProfile, clearProfileEditError } from "../../../store/actions";

const EditProfileDetailsModal = ({ profileData, modelCloseCallback }) => {
  const firebase = useFirebase();
  const firestore = useFirestore();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getData = (prop) => (Boolean(prop) ? prop : "");

  const [name, setName] = useState(getData(profileData.displayName));
  const [nameValidateError, setNameValidateError] = useState(false);
  const [nameValidateErrorMessage, setNameValidateErrorMessage] = useState("");
  const [country, setCountry] = useState(getData(profileData.country));
  const [countryValidateError, setCountryValidateError] = useState(false);
  const [website, setWebsite] = useState(getData(profileData.website));
  const [websiteValidateError, setWebsiteValidateError] = useState(false);
  const [websiteValidateErrorMessage, setWebsiteValidateErrorMessage] = useState("");
  const [description, setDescription] = useState(getData(profileData.description));
  const [descriptionValidateError, setDescriptionValidateError] = useState(false);
  const [descriptionValidateErrorMessage, setDescriptionValidateErrorMessage] = useState("");
  const [facebook, setFacebook] = useState(getData(profileData.link_facebook));
  const [facebookValidateError, setFacebookValidateError] = useState(false);
  const [facebookValidateErrorMessage, setFacebookValidateErrorMessage] = useState("");
  const [twitter, setTwitter] = useState(getData(profileData.link_twitter));
  const [twitterValidateError, setTwitterValidateError] = useState(false);
  const [twitterValidateErrorMessage, setTwitterValidateErrorMessage] = useState("");
  const [linkedin, setLinkedin] = useState(getData(profileData.link_linkedin));
  const [linkedinValidateError, setLinkedinValidateError] = useState(false);
  const [linkedinValidateErrorMessage, setLinkedinValidateErrorMessage] = useState("");
  const [github, setGithub] = useState(getData(profileData.link_github));
  const [githubValidateError, setGithubValidateError] = useState(false);
  const [githubValidateErrorMessage, setGithubValidateErrorMessage] = useState("");

  const children = [];

  for (let i = 0; i < countryList.length; i++) {
    children.push(
      <MenuItem key={countryList[i].code} value={countryList[i].name}>
        {countryList[i].name}
      </MenuItem>
    );
  }

  const loadingProps = useSelector(
    ({
      profile: {
        edit: { loading },
      },
    }) => loading
  );
  const errorProps = useSelector(
    ({
      profile: {
        edit: { error },
      },
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

  useEffect(() => {
    form.setFieldsValue({
      displayName: getData(profileData.displayName),
      website: getData(profileData.website),
      link_facebook: getData(profileData.link_facebook),
      link_github: getData(profileData.link_github),
      link_linkedin: getData(profileData.link_linkedin),
      link_twitter: getData(profileData.link_twitter),
      description: getData(profileData.description),
      org_country: getData(profileData.country),
    });
  }, [form, profileData]);

  const onSubmit = (formData) => {
    const { displayName, website, link_facebook, link_github, link_linkedin, link_twitter, description, org_country: country } = formData;
    updateUserProfile({
      displayName,
      website,
      link_facebook,
      link_github,
      link_linkedin,
      link_twitter,
      description,
      country,
    })(firebase, firestore, dispatch);
  };

  const onChangeName = (name) => setName(name);
  const onChangeCountry = (country) => setCountry(country);
  const onChangeOrgWebsite = (website) => setWebsite(website);
  const onChangeDescription = (description) => setDescription(description);
  const onChangeFacebook = (facebook) => setFacebook(facebook);
  const onChangeTwitter = (twitter) => setTwitter(twitter);
  const onChangeLinkedin = (linkedin) => setLinkedin(linkedin);
  const onChangeGithub = (github) => setGithub(github);
  return (
    <>
      {error && <Alert message={""} description={error} type="error" closable className="mb-24" />}

      {/* start */}
      <Divider />
      <Box m={3}>
        <TextField
          error={nameValidateError}
          label="Name"
          variant="outlined"
          // placeholder={displayName ? displayName : ""}
          value={name}
          onChange={(event) => onChangeName(event.target.value)}
          helperText={nameValidateError ? nameValidateErrorMessage : null}
          fullWidth
          autoComplete="handle"
          required
          style={{ marginBottom: "15px" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon style={{ color: "rgba(0,0,0,.25)" }} />
              </InputAdornment>
            ),
          }}
        />
        <FormControl variant="outlined" error={countryValidateError} fullWidth>
          <InputLabel>User Country</InputLabel>
          <Select
            label="User Country"
            children={children}
            style={{ width: "100%" }}
            value={country}
            onChange={(event) => onChangeCountry(event.target.value)}
          ></Select>
        </FormControl>

        <TextField
          error={websiteValidateError}
          label="Organization Website"
          variant="outlined"
          placeholder="Organization Website"
          value={website}
          onChange={(event) => onChangeOrgWebsite(event.target.value)}
          helperText={websiteValidateError ? websiteValidateErrorMessage : null}
          fullWidth
          autoComplete="orgWebsite"
          required
          style={{ marginBottom: "15px" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PublicIcon style={{ color: "rgba(0,0,0,.25)" }} />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          error={descriptionValidateError}
          label="description"
          multiline
          variant="outlined"
          placeholder="description"
          value={description}
          onChange={(event) => onChangeDescription(event.target.value)}
          helperText={descriptionValidateError ? descriptionValidateErrorMessage : null}
          fullWidth
          autoComplete="description"
          required
          style={{ marginBottom: "15px" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PublicIcon style={{ color: "rgba(0,0,0,.25)" }} />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          error={facebookValidateError}
          label="facebook"
          variant="outlined"
          placeholder="username"
          value={facebook}
          onChange={(event) => onChangeFacebook(event.target.value)}
          helperText={facebookValidateError ? facebookValidateErrorMessage : null}
          fullWidth
          autoComplete="handle"
          required
          style={{ marginBottom: "15px" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon style={{ color: "rgba(0,0,0,.25)" }} />
                <p style={{ margin: "15px 0px 15px 8px", color: "grey" }}>facebook.com/</p>
              </InputAdornment>
            ),
          }}
        />

        <TextField
          error={twitterValidateError}
          label="twitter"
          variant="outlined"
          value={twitter}
          placeholder="username"
          onChange={(event) => onChangeTwitter(event.target.value)}
          helperText={twitterValidateError ? twitterValidateErrorMessage : null}
          fullWidth
          autoComplete="handle"
          required
          style={{ marginBottom: "15px" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon style={{ color: "rgba(0,0,0,.25)" }} />
                <p style={{ margin: "15px 0px 15px 8px", color: "grey" }}>twitter.com/</p>
              </InputAdornment>
            ),
          }}
        />

        <TextField
          error={linkedinValidateError}
          label="linkedin"
          variant="outlined"
          value={linkedin}
          placeholder="username"
          onChange={(event) => onChangeLinkedin(event.target.value)}
          helperText={linkedinValidateError ? linkedinValidateErrorMessage : null}
          fullWidth
          autoComplete="handle"
          required
          style={{ marginBottom: "15px" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon style={{ color: "rgba(0,0,0,.25)" }} />
                <p style={{ margin: "15px 0px 15px 8px", color: "grey" }}>linkedin.com/in/</p>
              </InputAdornment>
            ),
          }}
        />

        <TextField
          error={githubValidateError}
          label="github"
          variant="outlined"
          value={github}
          placeholder="username"
          onChange={(event) => onChangeGithub(event.target.value)}
          helperText={githubValidateError ? githubValidateErrorMessage : null}
          fullWidth
          autoComplete="handle"
          required
          style={{ marginBottom: "15px" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon style={{ color: "rgba(0,0,0,.25)" }} />
                <p style={{ margin: "15px 0px 15px 8px", color: "grey" }}>github.com/</p>
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <Divider></Divider>
      {/* end */}
      <Form form={form} onFinish={onSubmit}>
        <label className="form-label">Name</label>
        <Form.Item name={"displayName"} rules={orgNameValidation}>
          <Input prefix={<AppstoreAddOutlined style={{ color: "rgba(0,0,0,.25)" }} />} placeholder="Name" autoComplete="none" />
        </Form.Item>

        <label className="form-label">Country</label>
        <CountryDropdown />

        <label className="form-label">Website</label>
        <Form.Item name="website" rules={userWebsiteValidation}>
          <Input prefix={<IeOutlined style={{ color: "rgba(0,0,0,.25)" }} />} placeholder="Website" autoComplete="url" />
        </Form.Item>

        <label className="form-label">Description</label>
        <Form.Item name="description" rules={null}>
          <Input.TextArea placeholder="Provide a description about yourself" autoSize={{ minRows: 4, maxRows: 20 }} />
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
                <TwitterSquareFilled className="twitter-color mr-4" /> twitter.com/
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
                <LinkedinFilled className="linkedin-color mr-4" /> linkedin.com/in/
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
            <Button key="submit" type="primary" htmlType="submit" loading={loading}>
              {loading ? "Saving..." : "Save"}
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </>
  );
};

export default EditProfileDetailsModal;
