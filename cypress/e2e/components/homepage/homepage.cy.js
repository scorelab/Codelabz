/// <reference types="cypress" />

describe("Error Page Test | CodeLabz", () => {
  beforeEach(function () {
    cy.fixture("login").then(function (credentials) {
      this.credentials = credentials;
    });
    cy.fixture("base_url").then(function (data) {
      this.base_url = data.base_url;
      cy.visit(this.base_url);
    });
  });

  before(function () {
    indexedDB.deleteDatabase("firebaseLocalStorageDb");
  })

  it("check not logged in user can access homepage", function () {
    cy.visit(this.base_url);
    cy.get("[data-testId=homepage");
  });

  it("check main body has atleast one child", function () {
    cy.get("[data-testId=homepageMainBody");
    cy.get("[data-testId=homepageMainBody").should("have.length.at.least", 1);
  });

});
