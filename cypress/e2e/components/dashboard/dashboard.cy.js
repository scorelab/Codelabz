/// <reference types="cypress" />

describe("Dashboard Test | CodeLabz", () => {
  beforeEach(function () {
    cy.fixture("login").then(function (credentials) {
      this.credentials = credentials;
    });
    cy.fixture("base_url").then(function (data) {
      this.base_url = data.base_url;
      cy.visit(this.base_url);
    });
  });

  it("login", function () {
    indexedDB.deleteDatabase("firebaseLocalStorageDb");
    cy.visit(`${this.base_url}login`)
    cy.get(".email").type(this.credentials.email);
    cy.get(".password").type(this.credentials.password);
    cy.get(".loginButton").click();
    cy.wait(5000);
  })

  it("prev user dashboard access denied", function () {
    cy.visit(`${this.base_url}dashboard`);
    cy.location().should((loc) => {
      expect(loc.href).to.not.eq(`${this.base_url}dashboard/my_feed`);
    });
  })




});
