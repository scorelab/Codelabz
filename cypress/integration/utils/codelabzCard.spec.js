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

  it("check card exist", function () {
    cy.wait(3000);
    cy.get("[data-testId=codelabzCard]").should("exist");
  });
  it("check other components exist", function () {
    cy.wait(3000);
    cy.get("[data-testId=codelabzCardHeader]").should("exist");
    cy.get("[data-testId=codelabzCardContent]").should("exist");
    cy.get("[data-testId=codelabzCardButtonGroup]").should("exist");
  });
});
