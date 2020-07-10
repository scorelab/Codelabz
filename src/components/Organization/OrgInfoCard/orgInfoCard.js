import React, { useEffect, useState } from "react";
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
  Empty,
} from "antd";
import {
  EditOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  CameraOutlined,
  LoadingOutlined,
  FacebookFilled,
  TwitterSquareFilled,
  GithubFilled,
  LinkOutlined,
  LinkedinFilled,
  SettingOutlined,
  FlagOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import ImgCrop from "antd-img-crop";
import EditOrgDetailsModal from "./editOrgDetailsModal";
import {
  clearEditGeneral,
  unPublishOrganization,
  uploadOrgProfileImage,
} from "../../../store/actions";
import { useFirebase, useFirestore } from "react-redux-firebase";

const { Dragger } = Upload;

const OrgInfoCard = () => {
  const firebase = useFirebase();
  const dispatch = useDispatch();
  const firestore = useFirestore();
  const [currentOrgData, setCurrentOrgData] = useState({});
  const [imageUploading, setImageUploading] = useState(false);
  const [orgEditModalVisible, setOrgEditModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const OrgMenu = () => {
    return (
      <Menu>
        <Menu.Item
          key={"setting_edit_org"}
          onClick={() => setOrgEditModalVisible(true)}
        >
          <EditOutlined /> Edit Details
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item
          style={
            currentOrgData.org_published ? { color: "red" } : { color: "green" }
          }
          key={"setting_unpublish_org"}
          onClick={unpublishOrganization}
        >
          {currentOrgData.org_published ? (
            <>
              <EyeInvisibleOutlined /> Unpublish Organization
            </>
          ) : (
            <>
              <EyeOutlined /> Publish Organization
            </>
          )}
        </Menu.Item>
      </Menu>
    );
  };

  const DropdownMenu = () => {
    return (
      <Dropdown key="more" overlay={OrgMenu}>
        <Button
          style={{
            border: "none",
            padding: 0,
          }}
          type="link"
        >
          <SettingOutlined /> Options
        </Button>
      </Dropdown>
    );
  };

  const loadingProps = useSelector(
    ({
      org: {
        general: { loading },
      },
    }) => loading
  );

  const current = useSelector(
    ({
      org: {
        general: { current },
      },
    }) => current
  );

  useEffect(() => {
    setLoading(loadingProps);
  }, [loadingProps]);

  const orgs = useSelector(
    ({
      profile: {
        data: { organizations },
      },
    }) => organizations
  );

  useEffect(() => {
    let orgDetails = orgs.find((element) => {
      return element.org_handle === current;
    });
    setCurrentOrgData(orgDetails);
  }, [current, orgs]);

  const uploadImage = (file) => {
    setImageUploading(true);
    uploadOrgProfileImage(
      file,
      current,
      orgs
    )(firebase, dispatch).then(() => {
      setImageUploading(false);
      clearEditGeneral()(dispatch);
    });
    return false;
  };

  const checkAvailable = (data) => {
    return !!(data && data.length > 0);
  };

  const unpublishOrganization = () => {
    unPublishOrganization(current, currentOrgData.org_published, orgs)(
      firebase,
      firestore,
      dispatch
    );
  };

  if (currentOrgData) {
    return (
      <>
        <Card
          loading={loading}
          title={"Organization Details"}
          extra={
            currentOrgData.permissions &&
            [2, 3].some((p) => currentOrgData.permissions.includes(p)) ? (
              <DropdownMenu key="more" />
            ) : null
          }
          style={{ width: "100%" }}
          className="p-0"
        >
          <Row>
            <Col xs={24} md={8} lg={8}>
              <Card
                style={{ width: "100%" }}
                bordered={false}
                cover={
                  currentOrgData.org_image &&
                  currentOrgData.org_image.length > 0 ? (
                    <img
                      src={currentOrgData.org_image}
                      alt={currentOrgData.org_name}
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
                {currentOrgData.permissions &&
                  currentOrgData.permissions[0] >= 2 && (
                    <ImgCrop rotate>
                      <Dragger beforeUpload={uploadImage} className="mt-16">
                        {imageUploading ? (
                          <>
                            <LoadingOutlined /> Please wait...
                            <p className="ant-upload-hint mt-8">
                              Uploading image...
                            </p>
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
                  )}
              </Card>
            </Col>
            <Col xs={24} md={16} lg={16} className="pl-24-d pt-24-m">
              <p>
                <span style={{ fontSize: "1.3em", fontWeight: "bold" }}>
                  {currentOrgData.org_name}
                </span>
                {currentOrgData.org_published ? (
                  <Tag color="green" className="ml-16">
                    Published
                  </Tag>
                ) : (
                  <Tag color="red" className="ml-16">
                    Unpublished
                  </Tag>
                )}
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
                    <FacebookFilled className="facebook-color" />{" "}
                    {currentOrgData.org_link_facebook}
                  </a>
                </p>
              )}
              {checkAvailable(currentOrgData.org_link_twitter) && (
                <p>
                  <a
                    href={
                      "https://twitter.com/" + currentOrgData.org_link_twitter
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <TwitterSquareFilled className="twitter-color" />{" "}
                    {currentOrgData.org_link_twitter}
                  </a>
                </p>
              )}
              {checkAvailable(currentOrgData.org_link_github) && (
                <p>
                  <a
                    href={
                      "https://github.com/" + currentOrgData.org_link_github
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <GithubFilled className="github-color" />{" "}
                    {currentOrgData.org_link_github}
                  </a>
                </p>
              )}
              {checkAvailable(currentOrgData.org_link_linkedin) && (
                <p>
                  <a
                    href={
                      "https://www.linkedin.com/company/" +
                      currentOrgData.org_link_linkedin
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <LinkedinFilled className="linkedin-color" />{" "}
                    {currentOrgData.org_link_linkedin}
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
                    <LinkOutlined className="website-color" />{" "}
                    {currentOrgData.org_website}
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
                    <FlagOutlined className="website-color" />{" "}
                    {currentOrgData.org_country}
                  </a>
                </p>
              )}
            </Col>
          </Row>
        </Card>
        <Modal
          visible={orgEditModalVisible}
          title={`Edit details of [${currentOrgData.org_handle}]`}
          onCancel={() => setOrgEditModalVisible(false)}
          maskClosable={false}
          footer={null}
          centered
          destroyOnClose={true}
          className="pt-24"
        >
          <EditOrgDetailsModal
            currentOrgData={currentOrgData}
            modelCloseCallback={(e) => setOrgEditModalVisible(e)}
          />
        </Modal>
      </>
    );
  } else {
    return (
      <Card
        loading={loading}
        title={"Organization Details"}
        style={{ width: "100%" }}
        className="p-0"
      />
    );
  }
};

export default OrgInfoCard;
