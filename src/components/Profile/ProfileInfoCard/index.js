import React, { useState } from "react";
import {
  Button,
  Card,
  Dropdown,
  Menu,
  Tag,
  Row,
  Col,
  Upload,
  Modal,
  Empty
} from "antd";
import {
  EditOutlined,
  CameraOutlined,
  LoadingOutlined,
  FacebookFilled,
  TwitterSquareFilled,
  GithubFilled,
  LinkOutlined,
  LinkedinFilled,
  SettingOutlined
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import ImgCrop from "antd-img-crop";
import EditProfileDetailsModal from "./editProfileDetailsModal";
import { uploadProfileImage } from "../../../store/actions";
import { useFirebase } from "react-redux-firebase";

const { Dragger } = Upload;

const ProfileInfoCard = () => {
  const firebase = useFirebase();
  const dispatch = useDispatch();

  const [imageUploading, setImageUploading] = useState(false);
  const [profileEditModalVisible, setProfileEditModalVisible] = useState(false);

  const profileData = useSelector(({ firebase: { profile } }) => profile);
  const verified = useSelector(
    ({
      firebase: {
        auth: { emailVerified }
      }
    }) => emailVerified
  );

  const ProfileMenu = () => {
    return (
      <Menu>
        <Menu.Item
          key={"setting_edit_profile"}
          onClick={() => setProfileEditModalVisible(true)}
        >
          <EditOutlined /> Edit Details
        </Menu.Item>
      </Menu>
    );
  };

  const DropdownMenu = () => {
    return (
      <Dropdown key="more" overlay={ProfileMenu}>
        <Button
          style={{
            border: "none",
            padding: 0
          }}
          type="link"
        >
          <SettingOutlined /> Options
        </Button>
      </Dropdown>
    );
  };

  const uploadImage = file => {
    setImageUploading(true);
    uploadProfileImage(file, profileData.handle)(firebase, dispatch).then(
      () => {
        setImageUploading(false);
      }
    );
    return false;
  };

  const checkAvailable = data => {
    return !!(data && data.length > 0);
  };

  return (
    <>
      <Card
        title={"Profile Details"}
        extra={<DropdownMenu key="more" />}
        style={{ width: "100%" }}
        className="p-0"
      >
        <Row>
          <Col xs={24} md={8} lg={8}>
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
            >
              <ImgCrop rotate>
                <Dragger beforeUpload={uploadImage} className="mt-16">
                  {imageUploading ? (
                    <>
                      <LoadingOutlined /> Please wait...
                      <p className="ant-upload-hint mt-8">Uploading image...</p>
                    </>
                  ) : (
                    <>
                      <CameraOutlined /> Change image
                      <p className="ant-upload-hint mt-8">
                        Click or drag your image here
                      </p>
                    </>
                  )}
                </Dragger>
              </ImgCrop>
            </Card>
          </Col>
          <Col xs={24} md={16} lg={16} className="pl-24-d pt-24-m">
            <p>
              <span style={{ fontSize: "1.3em", fontWeight: "bold" }}>
                {profileData.displayName}
              </span>
              {verified ? (
                <Tag color="green" className="ml-16">
                  Verified
                </Tag>
              ) : (
                <Tag color="red" className="ml-16">
                  Unverified
                </Tag>
              )}
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
                    "https://www.linkedin.com/company/" +
                    profileData.link_linkedin
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
              <p className="mb-0">
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
          </Col>
        </Row>
      </Card>
      <Modal
        visible={profileEditModalVisible}
        title={`Edit Profile`}
        onCancel={() => setProfileEditModalVisible(false)}
        maskClosable={false}
        footer={null}
        centered
        destroyOnClose={true}
        className="pt-24"
      >
        <EditProfileDetailsModal
          profileData={profileData}
          modelCloseCallback={e => setProfileEditModalVisible(e)}
        />
      </Modal>
    </>
  );
};

export default ProfileInfoCard;
