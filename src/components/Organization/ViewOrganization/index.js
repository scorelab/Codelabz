import React, { useEffect, useState } from "react";
import noImageAvailable from "../../../assets/images/no-image-available.svg";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import LinearProgress from "@material-ui/core/LinearProgress";
import Box from "@material-ui/core/Box";
import ThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import LinkIcon from "@material-ui/icons/Link";
import FlagIcon from "@material-ui/icons/Flag";
import { useDispatch, useSelector } from "react-redux";
import { useFirebase, useFirestore } from "react-redux-firebase";
import { useParams } from "react-router-dom";
import { clearOrgData, getOrgData } from "../../../store/actions";

const theme = createMuiTheme({
  shadows: ["none"],
  palette: {
    primary: {
      main: "#455a64",
    },
  },
});
const ViewOrganization = () => {
  const { handle } = useParams();
  const firebase = useFirebase();
  const dispatch = useDispatch();
  const firestore = useFirestore();

  const [imageLoading, setImageLoading] = useState(true);

  const loading = useSelector(
    ({
      org: {
        data: { loading },
      },
    }) => loading
  );

  const currentOrgData = useSelector(
    ({
      org: {
        data: { data },
      },
    }) => data
  );

  const organizations = useSelector(
    ({
      firebase: {
        profile: { organizations },
      },
    }) => organizations
  );

  useEffect(() => {
    getOrgData(handle, organizations)(firebase, firestore, dispatch);
    setImageLoading(true);
    return () => {
      clearOrgData()(dispatch);
    };
  }, [handle, firebase, firestore, dispatch, organizations]);

  const checkAvailable = (data) => {
    return !!(data && data.length > 0);
  };

  return (
    <ThemeProvider theme={theme}>
      {loading || !currentOrgData ? (
        <LinearProgress theme={theme} />
      ) : (
        <Card className="p-0">
          {currentOrgData && (
            <div>
              <Box mt={2} mb={2} m={3}>
                <Grid container>
                  <span style={{ fontSize: "1.3em", fontWeight: "480" }}>
                    Organization Details
                  </span>
                </Grid>
              </Box>
              <Divider></Divider>
              <Box mt={2} mb={2} m={3}>
                <Grid container>
                  <Grid xs={12} md={3} lg={3} item={true}>
                    {currentOrgData.org_image ? (
                      <>
                        <img
                          style={{
                            width: "100%",
                            height: "auto",
                            borderRadius: "8px",
                          }}
                          src={currentOrgData.org_image}
                          alt={currentOrgData.org_name}
                          className="org-image"
                          onLoad={() => {
                            setImageLoading(false);
                          }}
                          style={{ display: imageLoading ? "none" : "block" }}
                        />
                      </>
                    ) : (
                      <img
                        style={{
                          width: "100%",
                          height: "auto",
                          borderRadius: "8px",
                        }}
                        src={noImageAvailable}
                        alt={"Not Available"}
                        className="org-image"
                      />
                    )}
                  </Grid>

                  <Grid
                    xs={12}
                    md={9}
                    lg={9}
                    className="pl-24-d pt-24-m"
                    item={true}
                  >
                    <p>
                      <span style={{ fontSize: "1.3em", fontWeight: "bold" }}>
                        {currentOrgData.org_name}
                      </span>
                    </p>
                    {checkAvailable(currentOrgData.org_description) && (
                      <p className="text-justified">
                        {currentOrgData.org_description}
                      </p>
                    )}
                    {checkAvailable(currentOrgData.org_link_facebook) && (
                      <p>
                        <a
                          href={
                            "https://www.facebook.com/" +
                            currentOrgData.org_link_facebook
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <div
                            style={{
                              display: "flex",
                              gap: "10px",
                            }}
                          >
                            <FacebookIcon
                              fontSize="small"
                              className="facebook-color"
                            />{" "}
                            {currentOrgData.org_link_facebook}
                          </div>
                        </a>
                      </p>
                    )}
                    {checkAvailable(currentOrgData.org_link_twitter) && (
                      <p>
                        <a
                          href={
                            "https://twitter.com/" +
                            currentOrgData.org_link_twitter
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <div
                            style={{
                              display: "flex",
                              gap: "10px",
                            }}
                          >
                            <TwitterIcon
                              fontSize="small"
                              className="twitter-color"
                            />{" "}
                            {currentOrgData.org_link_twitter}
                          </div>
                        </a>
                      </p>
                    )}
                    {checkAvailable(currentOrgData.org_link_github) && (
                      <p>
                        <a
                          href={
                            "https://github.com/" +
                            currentOrgData.org_link_github
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <div
                            style={{
                              display: "flex",
                              gap: "10px",
                            }}
                          >
                            <GitHubIcon
                              fontSize="small"
                              className="github-color"
                            />{" "}
                            {currentOrgData.org_link_github}
                          </div>
                        </a>
                      </p>
                    )}
                    {checkAvailable(currentOrgData.org_link_linkedin) && (
                      <p>
                        <a
                          href={
                            "https://www.linkedin.com/in/" +
                            currentOrgData.org_link_linkedin
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <div
                            style={{
                              display: "flex",
                              gap: "10px",
                            }}
                          >
                            <LinkedInIcon
                              fontSize="small"
                              className="linkedin-color"
                            />{" "}
                            {currentOrgData.org_link_linkedin}
                          </div>
                        </a>
                      </p>
                    )}
                    {checkAvailable(currentOrgData.org_website) && (
                      <p>
                        <a
                          href={currentOrgData.org_website}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <div
                            style={{
                              display: "flex",
                              gap: "10px",
                            }}
                          >
                            <LinkIcon
                              fontSize="small"
                              className="website-color"
                            />{" "}
                            {currentOrgData.org_website}
                          </div>
                        </a>
                      </p>
                    )}
                    {checkAvailable(currentOrgData.org_country) && (
                      <p className="mb-0">
                        <a
                          href={
                            "https://www.google.com/search?q=" +
                            currentOrgData.org_country
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <div
                            style={{
                              display: "flex",
                              gap: "10px",
                            }}
                          >
                            <FlagIcon
                              fontSize="small"
                              className="website-color"
                            />{" "}
                            {currentOrgData.org_country}
                          </div>
                        </a>
                      </p>
                    )}
                  </Grid>
                </Grid>
              </Box>
            </div>
          )}
          {currentOrgData === false &&
            "No organization with the provided handle"}
        </Card>
      )}
    </ThemeProvider>
  );
};

export default ViewOrganization;
