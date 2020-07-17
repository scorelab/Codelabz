import React, { useEffect } from "react";
import { Card, Row, Col, Empty } from "antd";
import {
  FacebookFilled,
  TwitterSquareFilled,
  GithubFilled,
  LinkOutlined,
  LinkedinFilled,
  FlagOutlined
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { clearUserProfile, getUserProfileData } from "../../../store/actions";
import { useFirebase, useFirestore } from "react-redux-firebase";

const ProfileView = () => {
  const { handle } = useParams();
  const firestore = useFirestore();
  const firebase = useFirebase();
  const dispatch = useDispatch();

  useEffect(() => {
    getUserProfileData(handle)(firebase, firestore, dispatch);
    return () => {
      clearUserProfile()(dispatch);
    };
  }, [firebase, firestore, dispatch, handle]);

  const profileData = useSelector(
    ({
      profile: {
        user: { data }
      }
    }) => data
  );
  const loading = useSelector(
    ({
      profile: {
        user: { error }
      }
    }) => error
  );

  const checkAvailable = data => {
    return !!(data && data.length > 0);
  };

  return (
    <Card
      title={"Profile Details"}
      style={{ width: "100%" }}
      className="p-0"
      loading={loading}
    >
      {profileData && (
        <Row>
          <Col xs={24} md={6} lg={6}>
            <Card
              style={{ width: "100%" }}
              bordered={false}
              cover={
                profileData.photoURL && profileData.photoURL.length > 0 ? (
                  <img
                    src={profileData.photoURL}
                    alt={profileData.displayName}
                    className="org-image"
                  />
                ) : (
                  <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description={"No image available"}
                  />
                )
              }
              className="org-image-card"
            />
          </Col>
          <Col xs={24} md={18} lg={18} className="pl-24-d pt-24-m">
            <p>
              <span style={{ fontSize: "1.3em", fontWeight: "bold" }}>
                {profileData.displayName}
              </span>
            </p>
            {checkAvailable(profileData.description) && (
              <p className="text-justified">{profileData.description}</p>
            )}
            {checkAvailable(profileData.link_facebook) && (
              <p>
                <a
                  href={"https://www.facebook.com/" + profileData.link_facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FacebookFilled className="facebook-color" />{" "}
                  {profileData.link_facebook}
                </a>
              </p>
            )}
            {checkAvailable(profileData.link_twitter) && (
              <p>
                <a
                  href={"https://twitter.com/" + profileData.link_twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <TwitterSquareFilled className="twitter-color" />{" "}
                  {profileData.link_twitter}
                </a>
              </p>
            )}
            {checkAvailable(profileData.link_github) && (
              <p>
                <a
                  href={"https://github.com/" + profileData.link_github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GithubFilled className="github-color" />{" "}
                  {profileData.link_github}
                </a>
              </p>
            )}
            {checkAvailable(profileData.link_linkedin) && (
              <p>
                <a
                  href={
                    "https://www.linkedin.com/in/" + profileData.link_linkedin
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LinkedinFilled className="linkedin-color" />{" "}
                  {profileData.link_linkedin}
                </a>
              </p>
            )}
            {checkAvailable(profileData.website) && (
              <p>
                <a
                  href={profileData.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LinkOutlined className="website-color" />{" "}
                  {profileData.website}
                </a>
              </p>
            )}
            {checkAvailable(profileData.country) && (
              <p className="mb-0">
                <a
                  href={
                    "https://www.google.com/search?q=" + profileData.country
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FlagOutlined className="website-color" />{" "}
                  {profileData.country}
                </a>
              </p>
            )}
          </Col>
        </Row>
      )}
      {profileData === false && "No profile with the provided handle"}
    </Card>
  );
};

export default ProfileView;
