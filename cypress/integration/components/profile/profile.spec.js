/// <reference types="cypress" />

describe("Profile Page | CodeLabz", () => {
  beforeEach(function () {
    cy.fixture("login").then(function (credentials) {
      this.credentials = credentials;
    });
    cy.fixture("base_url").then(function (data) {
      this.base_url = data.base_url;
      cy.visit(this.base_url);
    });
  });

  it("Login With Your Account", function () {
    cy.visit(this.base_url);
    cy.get(".MuiButton-outlined > .MuiButton-label > a").click({
      multiple: true,
    });
    cy.get(".email").type(this.credentials.email);
    cy.get(".password").type(this.credentials.password);
    cy.get(".loginButton").click();
    cy.wait(5000);
  });

  it("Check Profile Page Url", function () {
    cy.visit(`${this.base_url}profile`);
    cy.wait(5000);
    cy.location().should((loc) => {
      expect(loc.href).to.eq(`${this.base_url}profile`);
    });
  });

  it("Check for Other Component", function () {
    cy.visit(`${this.base_url}profile`);
    cy.get("#changeProfile").contains("Change Proifle Picture");
    cy.get(".MuiChip-labelSmall").contains("Email Verified");
    cy.get("#edit").contains("Edit Profile");
  });

  it("Change Profile Picture", function () {
    cy.visit(`${this.base_url}profile`);
    cy.get("#changeProfile").click();
    cy.get("#alert-dialog-title");
  });

  it("Check Profile Details Component", function () {
    cy.visit(`${this.base_url}profile`);
    cy.wait(5000);
    cy.get("#profileData");
  });
});
