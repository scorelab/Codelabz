/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import { MemoryRouter } from "react-router-dom";
import SideBar from "../../components/SideBar/index.js";
import ProviderWrapper from "../../helpers/providerWrapper";
import Grid from "@material-ui/core/Grid";


export default {
  title: "SideBar",
    component: SideBar,
    argType: {
        open: { type: "boolean" },
        toggleSlider: {
            type: function () { }},
        notification: {
            type: function () { }}
    },
};

export const sidebar = (args) => (
  <ProviderWrapper>
    <MemoryRouter>
            {window.innerWidth > 750 && <Grid
                container
                style={{
                    display: "flex",
                    alignItems: "left",
                    justifyContent: "center",
                    flexDirection: "column",
                    maxHeight: "35rem",
                    margin: "0 0 2rem 0",
                    background: "white",
                    boxShadow: ".5px 2px 5px gray",
                }}
                direction="column"
                style={{
                    width: "100%",
                    overflow: "auto",
                    maxHeight: "25rem",
                    backgroundColor: "transparent",
                    border: "none",
                    boxShadow: "none"
                }}
            >
                <Grid item
                   
                    style={{ minWidth: "100%"}}
                >
                    <SideBar {...args}/>
                </Grid>
            </Grid>}
            {window.innerWidth <= 750 && open && <SideBar {...args} />}
    </MemoryRouter>
  </ProviderWrapper> 
);

export const Default = sidebar.bind({});

Default.args = {
    open: false,
    toogleSlider: function () {open=!open},
    notification: function () { }
};
