import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { PlusOutlined } from "@ant-design/icons";
import NewTutorial from "../components/Tutorials/NewTutorial";
import EmptySVG from "../assets/images/empty.svg";

const EmptyTutorials = ({ org, orgHandle }) => {
  const [visibleModal, setVisibleModal] = useState(false);

  const closeModal = () => {
    setVisibleModal((prev) => !prev);
  };
  return (
    <Grid xs={24}>
      <Grid
        style={{ display: "flex", flexFlow: "column", background: "#f2f2f2" }}
        description={<span>{org} has no CodeLabz yet</span>}
      >
        <img src={EmptySVG} alt="empty" />
        <Button
          variant="contained"
          color="primary"
          style={{
            color: "white",
            borderRadius: "5px"
          }}
          onClick={() => setVisibleModal(true)}
        >
          <PlusOutlined /> Add New CodeLabz
        </Button>
      </Grid>
      <NewTutorial
        viewModal={visibleModal}
        onSidebarClick={(e) => closeModal(e)}
        viewCallback={() => setVisibleModal(false)}
        active={orgHandle}
      />
    </Grid>
  );
};

export default EmptyTutorials;
