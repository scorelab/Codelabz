/* eslint-disable no-undef */
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
  it("check only mini navbar is showing to non loggedin user", function () {
    cy.visit(this.base_url);
    cy.wait(1000);
    cy.get("[data-testid=navbarNonloggedIn]").should("exist");
    cy.get("[data-testid=navbarloggedIn]").should("not.exist");
  });
  it("Login With Your Account", function () {
    cy.visit(`${this.base_url}login`);
    cy.wait(3000);
    cy.get(".email").type(this.credentials.email);
    cy.get(".password").type(this.credentials.password);
    cy.get(".loginButton").click();
    cy.wait(3000);
  });
  it("check loggedin user have access to main navbar", function () {
    cy.visit(this.base_url);
    cy.wait(1000);
    cy.get("[data-testid=navbarNonloggedIn]").should("not.exist");
    cy.get("[data-testid=navbarloggedIn]").should("exist");
  });

  it("check components are avaible", function () {
    cy.visit(this.base_url);
    cy.get("[data-testid=navbarBrand]").should("exist");
    cy.get("[data-testid=navbarSearch]").should("exist");
    cy.get("[data-testid=navbarAppMenu").should("exist");
  });
});
