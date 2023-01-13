/// <reference types="cypress" />
describe("Authenticated Route Access Test | CodeLabz", () => {
  beforeEach(function () {
    cy.fixture("login").then(function (credentials) {
      this.credentials = credentials;
    });
    cy.fixture("base_url").then(function (data) {
      this.base_url = data.base_url;
    });
  });

  it("Login Test - Passing", function () {
    cy.visit(this.base_url);
    cy.get("[data-test-id=login]").should("exist");
    cy.get("[data-test-id=login]").contains("Login");
    cy.get("[data-test-id=login]").click();
    cy.get(".email").type(this.credentials.email);
    cy.get(".password").type(this.credentials.password);
    cy.get(".loginButton").click();
    cy.wait(5000);
  });

  it("Forbid Visit Login Page - Passing", function () {
    cy.visit(`${this.base_url}login`);
    cy.wait(5000);

    cy.location().should((loc) => {
      expect(loc.href).to.eq(`${this.base_url}dashboard/my_feed`);
    });
  });

  it("Forbid Visit Sign Up Page - Passing", function () {
    cy.visit(`${this.base_url}signup`);
    cy.wait(5000);

    cy.location().should((loc) => {
      expect(loc.href).to.eq(`${this.base_url}dashboard/my_feed`);
    });
  });

  it("Forbid Visit Forgot Password Page - Passing", function () {
    cy.visit(`${this.base_url}forgotpassword`);
    cy.wait(5000);

    cy.location().should((loc) => {
      expect(loc.href).to.eq(`${this.base_url}dashboard/my_feed`);
    });
  });

  it("Forbid Visit Manage Users Page - Passing", function () {
    cy.visit(`${this.base_url}manageusers`);
    cy.wait(5000);

    cy.location().should((loc) => {
      expect(loc.href).to.eq(`${this.base_url}`);
    });
  });

  it("Visit Dashboard Page - Passing", function () {
    cy.visit(`${this.base_url}dashboard`);
    cy.wait(5000);

    cy.location().should((loc) => {
      expect(loc.href).to.eq(`${this.base_url}dashboard/my_feed`);
    });
  });

  it("Visit My Feed Page - Passing", function () {
    cy.visit(`${this.base_url}dashboard/my_feed`);
    cy.wait(5000);

    cy.location().should((loc) => {
      expect(loc.href).to.eq(`${this.base_url}dashboard/my_feed`);
    });
  });

  it("Visit Profile Page - Passing", function () {
    cy.visit(`${this.base_url}profile`);
    cy.wait(5000);

    cy.location().should((loc) => {
      expect(loc.href).to.eq(`${this.base_url}profile`);
    });
  });

  it("Visit Organization Page - Passing", function () {
    cy.visit(`${this.base_url}/org/sougataijuorg`);
    cy.wait(5000);

    cy.location().should((loc) => {
      expect(loc.href).to.eq(`${this.base_url}/org/sougataijuorg`);
    });
  });

  it("Visit Tutorials Page - Passing", function () {
    cy.visit(`${this.base_url}tutorials`);
    cy.wait(5000);

    cy.location().should((loc) => {
      expect(loc.href).to.eq(`${this.base_url}tutorials`);
    });
  });

  it("Visit Home Page - Passing", function () {
    cy.visit(`${this.base_url}/`);
    cy.wait(5000);
    cy.location().should((loc) => {
      expect(loc.href).to.eq(`${this.base_url}/`);
    });
  });
});
