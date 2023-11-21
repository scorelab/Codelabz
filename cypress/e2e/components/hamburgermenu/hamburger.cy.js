/// <reference types="cypress" />

describe("Hamburger Menu Test | CodeLabz", () => {
  beforeEach(function () {
    cy.fixture("login").then(function (credentials) {
      this.credentials = credentials;
    });
    cy.fixture("base_url").then(function (data) {
      this.base_url = data.base_url;
      cy.visit(this.base_url);
    });
  });

  it("Check hamburger menu appears on smaller screens", function () {
    indexedDB.deleteDatabase("firebaseLocalStorageDb");
    cy.visit(`${this.base_url}dashboard`);

    cy.viewport(850, 640).get("[data-testid=MenuIcon]").should("exist");
    cy.get("[data-testid=MenuIcon]").click();
  });
});
