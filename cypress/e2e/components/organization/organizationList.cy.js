/// <reference types="cypress" />

describe("Organizations | CodeLabz", () => {
  it("Check organization list", function () {
    cy.visit("http://localhost:3000/");
    cy.get("[data-testId=organizations]").should("exist");
    cy.get("[data-testId=settings]").should("exist");
    cy.get("[data-testId=leave]").should("exist");
  });
});
