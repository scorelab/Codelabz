import React from "react";
import { MemoryRouter } from "react-router";
import Orgusers from "../../../components/Organization/OrgUsers/OrgUsers";
import OrgUsersCard from "../../../components/Organization/OrgUsersCard/orgUsersCard";
import ProviderWrapper from "../../../helpers/providerWrapper";

export default {
  title: "Organization/Organization Users",
  component: OrgUsersCard,
};

const Template = (args) => (
  <ProviderWrapper>
    <MemoryRouter>
      <Orgusers {...args} />
    </MemoryRouter>
  </ProviderWrapper>
);

const AdminUsers = [
  {
    name: "Shahaab Manzar",
    designation: "GSoC 22'",
    avatar: {
      type: "char",
      value: "A",
    },
  },
  {
    name: "Sarfraz Alam",
    designation: "GSoC 22'",
    avatar: {
      type: "image",
      value: "https://i.pravatar.cc/300",
    },
  },
];

export const Admin = Template.bind({});

Admin.args = {
  Users: AdminUsers,
  title: "Admin",
  description: "Admins can manage submissions, content, and settings",
  AddUser: false,
};

const ContributersUsers = [
  {
    name: "Sarfraz Alam",
    designation: "GSoC 22'",
    avatar: {
      type: "image",
      value: "https://i.pravatar.cc/300",
    },
  },
  {
    name: "Jhanvi Thakkar",
    designation: "GSoC 22'",
    avatar: {
      type: "image",
      value: "https://i.pravatar.cc/300",
    },
  },
  {
    name: "Saksham Sharma",
    designation: "GSoC 22'",
    avatar: {
      type: "image",
      value: "https://i.pravatar.cc/300",
    },
  },
];

export const Contributers = Template.bind({});

Contributers.args = {
  Users: ContributersUsers,
  title: "Contributers",
  description: "Contributers can contribute to the project",
  AddUser: true,
};

const SubscribeUsers = [
  {
    name: "Sarfraz Alam",
    designation: "GSoC 22'",
    avatar: {
      type: "image",
      value: "https://i.pravatar.cc/300",
    },
  },
  {
    name: "Jhanvi Thakkar",
    designation: "GSoC 22'",
    avatar: {
      type: "image",
      value: "https://i.pravatar.cc/300",
    },
  },
  {
    name: "Saksham Sharma",
    designation: "GSoC 22'",
    avatar: {
      type: "image",
      value: "https://i.pravatar.cc/300",
    },
  },
  {
    name: "Ayush Bansal",
    designation: "GSoC 22'",
    avatar: {
      type: "image",
      value: "https://i.pravatar.cc/300",
    },
  },
];

export const Subscribers = Template.bind({});

Subscribers.args = {
  Users: SubscribeUsers,
  title: "Subscribers",
  description: "Subscribers can view the project",
  AddUser: true,
  isViewMore: true,
};
