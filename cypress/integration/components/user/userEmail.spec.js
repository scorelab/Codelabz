/// <reference types="cypress" />

describe("User Email | CodeLabz", () => {
  it("Check user emails", function () {
    cy.visit("http://localhost:3000/");
    cy.get("[data-testId=emailInput]").should("exist");
    cy.get("[data-testId=addEmail]").should("exist");

    cy.get("[data-testId=primaryEmail]").should("exist").click();
    cy.get("[data-testId=primaryEmailItem]").should("exist");
    cy.get("[data-testId=primaryEmailItem]").last().click();

    cy.get("[data-testId=backupEmail]").should("exist").click();
    cy.get("[data-testId=backupEmailItem]").should("exist");
    cy.get("[data-testId=backupEmailItem]").last().click();
  });
});
