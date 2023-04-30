/// <reference types="cypress" />

describe("Social Icons | CodeLabz", () => {

  before(function () {
    cy.fixture("login").then(function (credentials) {
      this.credentials = credentials;
    });
    cy.fixture("base_url").then(function (data) {
      this.base_url = data.base_url;
    });
  });

  it("login", function () {
    indexedDB.deleteDatabase("firebaseLocalStorageDb");
    cy.visit(`${this.base_url}login`);
    cy.wait(2000);
    cy.get(".email").type(this.credentials.email);
    cy.get(".password").type(this.credentials.password);
    cy.get(".loginButton").click();
    cy.wait(5000);
  });

  it("Check connect buttons", function () {
    cy.visit(`${this.base_url}profile`);
    cy.get("[data-testId=FacebookIcon]").should("exist");
    cy.get("[data-testId=LinkedInIcon]").should("exist");
    cy.get("[data-testId=GithubIcon]").should("exist");
    cy.get("[data-testId=TwitterIcon]").should("exist");
    cy.get("[data-testId=LinkIcon]").should("exist");
  });
});
