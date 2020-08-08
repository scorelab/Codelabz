import React, { useState } from "react";
import { PageHeader, Button, Menu, Dropdown, Space, message } from "antd";
import {
  SnippetsOutlined,
  EllipsisOutlined,
  DeleteOutlined,
  MessageOutlined,
  EditOutlined,
  EyeInvisibleOutlined,
  PlusOutlined,
  FileImageOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import UserList from "../../Editor/UserList";
import { hideUnHideStep } from "../../../store/actions";
import { useFirebase, useFirestore } from "react-redux-firebase";
import { useDispatch } from "react-redux";
import RemoveStepModal from "./RemoveStepModal";

const EditControls = ({
  stepPanelVisible,
  isDesktop,
  setMode,
  noteID,
  mode,
  toggleImageDrawer,
  tutorial_id,
  toggleAddNewStep,
  visibility,
  owner,
  currentStep,
  step_length,
}) => {
  const firebase = useFirebase();
  const firestore = useFirestore();
  const dispatch = useDispatch();
  const [viewRemoveStepModal, setViewRemoveStepModal] = useState(false);

  const TutorialMenu = () => {
    return (
      <Menu>
        <Menu.Item
          key={"setting_edit_org"}
          onClick={() => null}
          style={{ color: "red" }}
        >
          <DeleteOutlined /> Move to Trash
        </Menu.Item>
      </Menu>
    );
  };

  const DropdownMenu = () => {
    return (
      <Dropdown key="more" overlay={TutorialMenu}>
        <Button
          style={{
            border: "none",
            padding: 0,
          }}
          type="link"
        >
          <EllipsisOutlined
            style={{
              fontSize: 20,
              verticalAlign: "top",
            }}
          />
        </Button>
      </Dropdown>
    );
  };

  return (
    <PageHeader
      className={
        (!stepPanelVisible && !isDesktop
          ? "ant-page-header-fix "
          : "ant-page-header-unfix ") + "tutorial-title-header low-padding"
      }
      title={
        <Space>
          <Button type="primary" onClick={() => toggleAddNewStep()}>
            <PlusOutlined /> Add New Step
          </Button>
          <Button className="ml-24" onClick={() => toggleImageDrawer()}>
            <FileImageOutlined /> Add images
          </Button>

          <Button
            onClick={() => {
              let key = Math.random();
              message.loading({
                content: "Updating step visibility...",
                key,
                duration: 10,
              });
              hideUnHideStep(
                owner,
                tutorial_id,
                noteID,
                visibility
              )(firebase, firestore, dispatch).then(() => {
                message.success({ content: "Updated!", key, duration: 2 });
              });
            }}
          >
            {!visibility ? (
              <>
                <EyeOutlined /> Show step
              </>
            ) : (
              <>
                <EyeInvisibleOutlined /> Hide step
              </>
            )}
          </Button>
          <Button
            danger
            onClick={() => {
              setViewRemoveStepModal(!viewRemoveStepModal);
            }}
            disabled={step_length === 1}
          >
            <DeleteOutlined /> Remove step
            <RemoveStepModal
              owner={owner}
              tutorial_id={tutorial_id}
              step_id={noteID}
              viewModal={viewRemoveStepModal}
              currentStep={currentStep}
              step_length={step_length}
            />
          </Button>
        </Space>
      }
      extra={
        !isDesktop && stepPanelVisible ? null : (
          <>
            {mode === "edit" && (
              <UserList tutorial_id={tutorial_id} noteID={noteID} />
            )}
            <Button
              type="text"
              shape="circle"
              icon={<MessageOutlined />}
              size="large"
              className="ml-24"
            />
            {mode === "view" && (
              <Button
                type="primary"
                className="ml-24"
                onClick={() => setMode("edit")}
              >
                <EditOutlined /> Editor mode
              </Button>
            )}
            {mode === "edit" && (
              <Button
                type="primary"
                className="ml-24"
                onClick={() => setMode("view")}
              >
                <SnippetsOutlined /> Preview mode
              </Button>
            )}
            <Button type="dashed">
              <SnippetsOutlined /> Publish
            </Button>
            <DropdownMenu key="more" />
          </>
        )
      }
    />
  );
};

export default EditControls;
