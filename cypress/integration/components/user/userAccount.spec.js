/// <reference types="cypress" />

describe("User Account | CodeLabz", () => {
  it("Check user account", function () {
    cy.visit("http://localhost:3000/");
    cy.get("[data-testId=exportData]").should("exist");
    cy.get("[data-testId=startExport]").should("exist");
    cy.get("[data-testId=successorSettings]").should("exist");
    cy.get("[data-testId=addSuccessor]").should("exist");
    cy.get("[data-testId=deactivateAccount]").should("exist");
    cy.get("[data-testId=deleteAccount]").should("exist");
  });
});
