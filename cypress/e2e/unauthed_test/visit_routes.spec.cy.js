/// <reference types="cypress" />

describe("Unauthenticated Routes Access Test | CodeLabz", () => {
  beforeEach(function () {
    cy.fixture("base_url").then(function (data) {
      this.base_url = data.base_url;
    });
  });

  before(function () {
    indexedDB.deleteDatabase("firebaseLocalStorageDb");
  });

  it("Visit Login Page - Passing", function () {
    cy.visit(`${this.base_url}login`);
    cy.wait(5000);

    cy.location().should(loc => {
      expect(loc.href).to.eq(`${this.base_url}login`);
    });
  });

  it("Visit Sign Up Page - Passing", function () {
    cy.visit(`${this.base_url}signup`);
    cy.wait(5000);

    cy.location().should(loc => {
      expect(loc.href).to.eq(`${this.base_url}signup`);
    });
  });

  it("Visit Forgot Password Page - Passing", function () {
    cy.visit(`${this.base_url}forgotpassword`);
    cy.wait(5000);

    cy.location().should(loc => {
      expect(loc.href).to.eq(`${this.base_url}forgotpassword`);
    });
  });

  it("Forbid Visit Manage Users Page - Passing", function () {
    cy.visit(`${this.base_url}manageusers`);
    cy.wait(5000);

    cy.location().should(loc => {
      expect(loc.href).to.eq(this.base_url);
    });
  });

  it("Forbid Visit Dashboard Page - Passing", function () {
    cy.visit(`${this.base_url}dashboard`);
    cy.wait(5000);

    cy.location().should(loc => {
      expect(loc.href).to.eq(`${this.base_url}login`);
    });
  });

  it("Forbid Visit My Feed Page - Passing", function () {
    cy.visit(`${this.base_url}dashboard/my_feed`);
    cy.wait(5000);

    cy.location().should(loc => {
      expect(loc.href).to.eq(`${this.base_url}login`);
    });
  });

  it("Forbid Visit Profile Page - Passing", function () {
    cy.visit(`${this.base_url}profile`);
    cy.wait(5000);

    cy.location().should(loc => {
      expect(loc.href).to.eq(`${this.base_url}login`);
    });
  });

  it("Forbid Visit Organization Page - Passing", function () {
    cy.visit(`${this.base_url}org/settings/codelabzorg`);
    cy.wait(5000);

    cy.location().should(loc => {
      expect(loc.href).to.eq(`${this.base_url}login`);
    });
  });

  it("Forbid Visit Tutorials Page - Passing", function () {
    cy.visit(`${this.base_url}tutorials`);
    cy.wait(5000);

    cy.location().should(loc => {
      expect(loc.href).to.eq(`${this.base_url}login`);
    });
  });
});
