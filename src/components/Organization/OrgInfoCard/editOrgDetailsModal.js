import React, { useState, useEffect, useCallback } from "react";
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
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";
import AppsIcon from "@material-ui/icons/Apps";
import LanguageIcon from "@material-ui/icons/Language";
import FacebookIcon from "@material-ui/icons/Facebook";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import TwitterIcon from "@material-ui/icons/Twitter";
import GitHubIcon from "@material-ui/icons/GitHub";

const EditOrgDetailsModal = ({ currentOrgData, modelCloseCallback }) => {
  const firebase = useFirebase();
  const firestore = useFirestore();
  const dispatch = useDispatch();
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
      closeModal();
    }
  }, [closeModal, loading, error]);

  const [formValue, setformValue] = useState({
    org_name: currentOrgData.org_name,
    org_website: currentOrgData.org_website,
    org_link_facebook: currentOrgData.org_link_facebook,
    org_link_github: currentOrgData.org_link_github,
    org_link_linkedin: currentOrgData.org_link_linkedin,
    org_link_twitter: currentOrgData.org_link_twitter,
    org_description: currentOrgData.org_description,
    org_country: currentOrgData.org_country,
  });

  const onSubmit = (formData) => {
    formData.preventDefault();
    editGeneralData(
      {
        org_handle: currentOrgData.org_handle,
        org_image: currentOrgData.org_image,
        ...formValue,
      },
      profileOrganizations
    )(firebase, firestore, dispatch);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setformValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <>
      {error && <Alert severity="error">Error!</Alert>}
      <form onSubmit={onSubmit}>
        <label className="form-label">Organization Name</label>
        <TextField
          variant="outlined"
          placeholder="Organization Name"
          autoComplete="none"
          fullWidth
          style={{ marginBottom: "1.5rem" }}
          name="org_name"
          defaultValue={formValue.org_name}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AppsIcon style={{ color: "rgba(0,0,0,.25)" }} />
              </InputAdornment>
            ),
          }}
          onChange={(e) => handleChange(e)}
        ></TextField>

        <label className="form-label">Organization country</label>
        <CountryDropdown />

        <label className="form-label">Organization website</label>
        <TextField
          variant="outlined"
          placeholder="Website"
          autoComplete="url"
          fullWidth
          name="org_website"
          defaultValue={formValue.org_website}
          style={{ marginBottom: "1.5rem" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LanguageIcon style={{ color: "rgba(0,0,0,.25)" }} />
              </InputAdornment>
            ),
          }}
          onChange={(e) => handleChange(e)}
        ></TextField>

        <label className="form-label">Organization description</label>

        <TextField
          variant="outlined"
          placeholder="Provide a description about the organization and/or the tutorials published"
          fullWidth
          name="org_description"
          defaultValue={formValue.org_description}
          multiline
          rows={4}
          style={{ marginBottom: "1.5rem" }}
          onChange={(e) => handleChange(e)}
        ></TextField>

        <label className="form-label">Organization Facebook page</label>
        <TextField
          variant="outlined"
          placeholder="Facebook page handle"
          autoComplete="none"
          fullWidth
          defaultValue={formValue.org_link_facebook}
          style={{ marginBottom: "1.5rem" }}
          name="org_link_facebook"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <>
                  <FacebookIcon className="facebook-color mr-4" /> facebook.com/
                </>
              </InputAdornment>
            ),
          }}
          onChange={(e) => handleChange(e)}
        ></TextField>
        <label className="form-label">Organization Twitter account</label>
        <TextField
          variant="outlined"
          placeholder="Twitter handle (without @)"
          autoComplete="none"
          fullWidth
          style={{ marginBottom: "1.5rem" }}
          name="org_link_twitter"
          defaultValue={formValue.org_link_twitter}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <>
                  <TwitterIcon className="twitter-color mr-4" /> twitter.com/
                </>
              </InputAdornment>
            ),
          }}
          onChange={(e) => handleChange(e)}
        ></TextField>

        <label className="form-label">Organization LinkedIn profile</label>
        <TextField
          variant="outlined"
          placeholder="Linkedin handle"
          autoComplete="none"
          fullWidth
          style={{ marginBottom: "1.5rem" }}
          name="org_link_linkedin"
          defaultValue={formValue.org_link_linkedin}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <>
                  <LinkedInIcon className="linkedin-color mr-4" />{" "}
                  linkedin.com/company/
                </>
              </InputAdornment>
            ),
          }}
          onChange={(e) => handleChange(e)}
        ></TextField>

        <label className="form-label">Organization GitHub profile</label>
        <TextField
          variant="outlined"
          placeholder="GitHub handle"
          autoComplete="none"
          fullWidth
          style={{ marginBottom: "2.5rem" }}
          name="org_link_github"
          defaultValue={formValue.org_link_github}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <>
                  <GitHubIcon className="github-color mr-4" /> github.com/
                </>
              </InputAdornment>
            ),
          }}
          onChange={(e) => handleChange(e)}
        ></TextField>

        <div className="mb-0">
          <div style={{ float: "right", marginTop: "-1rem" }}>
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
          </div>
        </div>
      </form>
    </>
  );
};

export default EditOrgDetailsModal;
