/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import { MemoryRouter } from "react-router-dom";
import TagCard from "../../components/CardTabs/Tags/index.js";
import EventsCard from "../../components/CardTabs/Events/index.js";
import UserCard from "../../components/CardTabs/Users/index.js";
import ProviderWrapper from "../../helpers/providerWrapper";
import Grid from "@mui/material/Grid";
import OrgUser from "../../assets/images/org-user.svg";

export default {
  title: "Card/Card-Tabs",
  component: { TagCard, EventsCard, UserCard },
  argType: {
    tags: { type: "array" },
    users: { type: "array" },
    events: { type: "array" },
    title: { type: "string" },
  },
};

export const Default = (args) => (
  <ProviderWrapper>
    <MemoryRouter>
      <Grid
        container
        style={{
          display: "flex",
          alignItems: "left",
          justifyContent: "center",
          flexDirection: "column",
          maxHeight: "35rem",
          margin: "0 0 2rem 0",
          width: "300px",
          overflow: "auto",
          backgroundColor: "transparent",
          border: "none",
          boxShadow: "none",
        }}
        direction="column"
      >
        <Grid item style={{ minWidth: "100%" }}>
          <TagCard
            tags={[
              "HTML",
              "JavaScript",
              "Css",
              "Python",
              "React",
              "Java",
              "HTML",
              "JavaScript",
              "Css",
              "Python",
              "React",
              "HTML",
              "JavaScript",
              "Css",
              "Python",
              "React",
              "Java",
              "HTML",
              "JavaScript",
              "Css",
              "Python",
              "React",
            ]}
          />
        </Grid>
      </Grid>
      <Grid
        container
        style={{
          display: "flex",
          alignItems: "left",
          justifyContent: "center",
          flexDirection: "column",
          maxHeight: "35rem",
          margin: "0 0 2rem 0",
          width: "300px",
          overflow: "auto",
          backgroundColor: "transparent",
          border: "none",
          boxShadow: "none",
        }}
        direction="column"
      >
        <Grid item style={{ minWidth: "100%" }}>
          <UserCard
            title={"Who to Follow"}
            users={[
              {
                name: "Janvi Thakkar",
                img: [OrgUser],
                desg: "Software Engineer",
                onClick: {},
              },
              {
                name: "Janvi Thakkar",
                img: [OrgUser],
                desg: "Software Engineer",
                onClick: {},
              },
              {
                name: "Janvi Thakkar",
                img: [OrgUser],
                desg: "Software Engineer",
                onClick: {},
              },
              {
                name: "Janvi Thakkar",
                img: [OrgUser],
                desg: "Software Engineer",
                onClick: {},
              },
            ]}
          />
        </Grid>
      </Grid>

      <Grid
        container
        style={{
          display: "flex",
          alignItems: "left",
          justifyContent: "center",
          flexDirection: "column",
          maxHeight: "35rem",
          margin: "0 0 2rem 0",
          width: "300px",
          overflow: "auto",
          backgroundColor: "transparent",
          border: "none",
          boxShadow: "none",
        }}
        direction="column"
      >
        <Grid item style={{ minWidth: "100%" }}>
          <UserCard
            title={"Contributors"}
            users={[
              {
                name: "Janvi Thakkar",
                img: [OrgUser],
                desg: "Software Engineer",
                onClick: {},
              },
              {
                name: "Janvi Thakkar",
                img: [OrgUser],
                desg: "Software Engineer",
                onClick: {},
              },
              {
                name: "Janvi Thakkar",
                img: [OrgUser],
                desg: "Software Engineer",
                onClick: {},
              },
              {
                name: "Janvi Thakkar",
                img: [OrgUser],
                desg: "Software Engineer",
                onClick: {},
              },
            ]}
          />
        </Grid>
      </Grid>

      <Grid
        container
        style={{
          display: "flex",
          alignItems: "left",
          justifyContent: "center",
          flexDirection: "column",
          maxHeight: "35rem",
          margin: "0 0 2rem 0",
          width: "300px",
          overflow: "auto",
          backgroundColor: "transparent",
          border: "none",
          boxShadow: "none",
        }}
        direction="column"
      >
        <Grid item style={{ minWidth: "100%" }}>
          <EventsCard
            title={"Upcoming Events"}
            events={[
              {
                name: "Google Summer of Code",
                img: [OrgUser],
                date: "25 March, 2022",
              },
              {
                name: "Google Summer of Code",
                img: [OrgUser],
                date: "25 March, 2022",
              },
              {
                name: "Google Summer of Code",
                img: [OrgUser],
                date: "25 March, 2022",
              },
              {
                name: "Google Summer of Code",
                img: [OrgUser],
                date: "25 March, 2022",
              },
            ]}
          />
        </Grid>
      </Grid>
    </MemoryRouter>
  </ProviderWrapper>
);
