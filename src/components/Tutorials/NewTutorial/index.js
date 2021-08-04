import React, { useEffect, useState } from "react";
import { AppstoreAddOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { avatarName } from "../../../helpers/avatarName";
import { createTutorial } from "../../../store/actions";
import { useFirebase, useFirestore } from "react-redux-firebase";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import Avatar from "@material-ui/core/Avatar";
import Modal from "@material-ui/core/Modal";

const NewTutorial = ({ viewModal, onSidebarClick, viewCallback, active }) => {
  const firebase = useFirebase();
  const firestore = useFirestore();
  const dispatch = useDispatch();
  const history = useHistory();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [formValue, setformValue] = useState({
    title: "",
    summary: "",
    owner: "",
  });

  const loadingProp = useSelector(
    ({
      tutorials: {
        create: { loading },
      },
    }) => loading
  );
  const errorProp = useSelector(
    ({
      tutorials: {
        create: { error },
      },
    }) => error
  );

  useEffect(() => {
    setLoading(loadingProp);
  }, [loadingProp]);

  useEffect(() => {
    setError(errorProp);
  }, [errorProp]);

  const organizations = useSelector(
    ({
      profile: {
        data: { organizations },
      },
    }) => organizations
  );

  const userHandle = useSelector(
    ({
      firebase: {
        profile: { handle },
      },
    }) => handle
  );

  const displayName = useSelector(
    ({
      firebase: {
        profile: { displayName },
      },
    }) => displayName
  );


  const allowOrgs = organizations && organizations.length > 0;

  const orgList =
    allowOrgs > 0
      ? organizations.map((org, i) => {
          if (org.permissions.includes(3) || org.permissions.includes(2)) {
            return (
              <Select.Option value={org.org_handle} key={i}>
                <Avatar
                  src={org.org_image}
                  size="small"
                  className="mr-8 ml-0"
                  style={{ size: "1rem" }}
                >
                  {avatarName(org.org_name)}
                </Avatar>
                {org.org_name}
              </Select.Option>
            );
          } else {
            return null;
          }
        })
      : null;

  const list = [];
  orgList && orgList.map((org) => list.push(org.props.value));

  useEffect(() => {
    setVisible(viewModal);
  }, [viewModal]);

  const onSubmit = (formData) => {
    formData.preventDefault();
    const tutorialData = {
      ...formValue,
      created_by: userHandle,
      is_org: userHandle !== formValue.owner,
    };
    console.log(tutorialData);
    createTutorial(tutorialData)(firebase, firestore, dispatch, history);
  };

  const onOwnerChange = (e) => {
    console.log(e.target.value);
    setformValue((prev) => ({
      ...prev,
      owner: e.target.value,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setformValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <Modal
      open={visible}
      onClose={onSidebarClick}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          height: "auto",
          width: "auto",
          background: "white",
          padding: "2rem",
          maxWidth: "80%",
        }}
      >
        {error && (
          <Alert message={""} type="error" closable="true" className="mb-24">
            description={"Tutorial Creation Failed"}/
          </Alert>
        )}
        <form>
          <TextField
            prefix={
              <AppstoreAddOutlined style={{ color: "rgba(0,0,0,.25)" }} />
            }
            placeholder="Title of the Tutorial"
            autoComplete="title"
            name="title"
            variant="outlined"
            fullWidth
            style={{ marginBottom: "2rem" }}
            onChange={(e) => handleChange(e)}
          />

          <TextField
            prefix={
              <AppstoreAddOutlined style={{ color: "rgba(0,0,0,.25)" }} />
            }
            fullWidth
            variant="outlined"
            name="summary"
            placeholder="Summary of the Tutorial"
            autoComplete="summary"
            onChange={(e) => handleChange(e)}
            style={{ marginBottom: "2rem" }}
          />
          <Select
            onChange={onOwnerChange}
            fullWidth
            style={{ marginBottom: "2rem" }}
            value={formValue.owner}
          >
            <MenuItem value={userHandle}>{displayName}</MenuItem>
            {list?.map((item) => {
              return <MenuItem value={item}>{item}</MenuItem>;
            })}
          </Select>

          <div className="mb-0">
            <div style={{ float: "right", marginTop: "-1rem" }}>
              <Button key="back" onClick={onSidebarClick}>
                Cancel
              </Button>
              <Button
                key="submit"
                type="primary"
                variant="contained"
                color="primary"
                htmlType="submit"
                loading={loading}
                onClick={(e) => onSubmit(e)}
              >
                {loading ? "Creating..." : "Create"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default NewTutorial;
