import React, { useState } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { PlusOutlined } from "@ant-design/icons";
import NewTutorial from "../components/Tutorials/NewTutorial";
import EmptySVG from "../assets/images/empty.svg";

const EmptyTutorials = ({ org, orgHandle }) => {
  const [visibleModal, setVisibleModal] = useState(false);

  const closeModal = () => {
    setVisibleModal(prev => !prev);
  };
  return (
    <Grid xs={24}>
      <Grid
        style={{ display: "flex", flexFlow: "column", background: "#f2f2f2" }}
        description={<span>{org} has no CodeLabz yet</span>}
      >
        <img src={EmptySVG} alt="empty" />
        <Button onClick={() => setVisibleModal(true)} type="primary">
          <PlusOutlined /> Add New CodeLabz
        </Button>
      </Grid>
      <NewTutorial
        viewModal={visibleModal}
        onSidebarClick={e => closeModal(e)}
        viewCallback={() => setVisibleModal(false)}
        active={orgHandle}
      />
    </Grid>
  );
};

export default EmptyTutorials;
