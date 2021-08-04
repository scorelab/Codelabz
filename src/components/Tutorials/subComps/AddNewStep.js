import React, { useEffect, useState } from "react";
import Modal from '@material-ui/core/Modal';
import Input from '@material-ui/core/Input';
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField";
import { useFirebase, useFirestore } from "react-redux-firebase";
import { useDispatch, useSelector } from "react-redux";
import { AppstoreAddOutlined } from "@ant-design/icons";
import {
  addNewTutorialStep,
  clearCreateTutorials,
} from "../../../store/actions";

const AddNewStepModal = ({
  viewModal,
  viewCallback,
  tutorial_id,
  steps_length,
  owner,
}) => {
  const firebase = useFirebase();
  const firestore = useFirestore();
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [title,setTitle]=useState("");
  const [time,setTime]=useState(0);

  useEffect(() => {
    clearCreateTutorials()(dispatch);
    return () => {
      clearCreateTutorials()(dispatch);
    };
  }, [dispatch]);

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

  useEffect(() => {
    setVisible(viewModal);
  }, [viewModal]);

  useEffect(() => {
    if (loading === false && error === false) {
      setVisible(false);
      clearCreateTutorials()(dispatch);
    }
  }, [loading, error, dispatch]);


  const onSubmit = () => {
    const formData={
     title,
     time
   }
    const set_data = {
      ...formData,
      id: `${tutorial_id}_${new Date().getTime()}`,
      tutorial_id,
      owner,
    };
    addNewTutorialStep(set_data)(firebase, firestore, dispatch);
  };

  const handleCancel = () => {
    
    setVisible(false);
  };

  return (
    <Modal
      title={`Add New Step`}
      open={visible}
      onClose={() => viewCallback()}
      onOk={() => viewCallback()}
      footer={false}
      destroyOnClose={true}
      maskClosable={false}
       style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Grid style={{background:"white",padding:"2rem"}}>
      {error && (
        <Alert
          message={""}
          description={"Tutorial Creation Failed"}
          type="error"
          closable
          className="mb-24"
        />
      )}
      <form onSubmit={onSubmit} >
          <Input
            prefix={
              <AppstoreAddOutlined style={{ color: "rgba(0,0,0,.25)" }} />
            }
            onChange={e=>setTitle(e.target.value)}
            placeholder="Title of the Step"
            autoComplete="title"
            style={{marginBottom:"2rem"}}
          />
        <TextField type="number" onChange={e=>setTime(e.target.value)} placeholder="Time (minutes)" style={{ width: "100%" }} />
            <Button  style={{marginTop:"2rem"}} variant="contained" color="secondary" key="back" onClick={handleCancel}>
              Cancel
            </Button>
            <Button
            style={{marginTop:"2rem"}}
              key="submit"
              type="primary"
              htmlType="submit"
              variant="contained"
              color="primary"
              loading={loading}
            >
              {loading ? "Creating..." : "Create"}
            </Button>
      </form>
      </Grid>
    </Modal>
  );
};

export default AddNewStepModal;
