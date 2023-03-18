/// <reference types="cypress" />

describe("Profile Page | CodeLabz", () => {
  beforeEach(function () {
    cy.fixture("login").then(function (credentials) {
      this.credentials = credentials;
    });
    cy.fixture("base_url").then(function (data) {
      this.base_url = data.base_url;
    });
  });

  before(function () {
    indexedDB.deleteDatabase("firebaseLocalStorageDb");
  })

  it("Login With Your Account", function () {
    cy.visit(`${this.base_url}login`);
    cy.wait(3000);
    cy.get(".email").type(this.credentials.email);
    cy.get(".password").type(this.credentials.password);
    cy.get(".loginButton").click();
    cy.wait(5000);
  });

  it("Check Profile Page Url", function () {
    cy.visit(`${this.base_url}profile`);
    // cy.get("[data-testId=AboutUsersHeading]").should("not.have.text", "");
    // cy.get("[data-testId=AboutUsersContent]").should("exist");
    // cy.get("[data-testId=DescriptionHeading]").should("not.have.text", "");
    // cy.get("[data-testId=DescriptionContent]").should("exist");
    cy.get("[data-testId=HighlightsHeading]").should("not.have.text", "");
    cy.get("[data-testId=HighlightsCurrentJob]").should("exist");
    cy.get("[data-testId=HighlightsEducation]").should("exist");
    cy.get("[data-testId=HighlightsLanguages]").should("exist");
    cy.get("[data-testId=HighlightsJoinedDate]").should("exist");

    cy.location().should((loc) => {
      expect(loc.href).to.eq(`${this.base_url}profile`);
    });
  });

  // it("Change Profile Picture", function () {
  //   cy.visit(`${this.base_url}user-dashboard/profile`);
  //   cy.get("#changeProfile").click();
  //   cy.get("#alert-dialog-title");
  // });

  // it("Check Profile Details Component", function () {
  //   cy.visit(`${this.base_url}user-dashboard/profile`);
  //   cy.wait(5000);
  //   cy.get("#profileData");
  // });

  // it("Check Edit Profile Modal", function () {
  //   cy.visit(`${this.base_url}user-dashboard/profile`);
  //   cy.wait(3000);
  //   cy.get("#edit").click({ force: true });
  //   cy.wait(3000);
  //   cy.get("#editProfileModal");
  //   // cy.get("#editModalBox").should("have.length");
  //   expect("#editModalBox").to.have.length.at.least(4);
  // });

});
