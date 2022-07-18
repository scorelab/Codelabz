/// <reference types="cypress" />

describe("Organizations | CodeLabz", () => {
  it("Check buttons", function () {
    cy.visit("http://localhost:3000/");
    cy.get("[data-testId=facebookButton]").should("exist");
    cy.get("[data-testId=githubButton]").should("exist");
    cy.get("[data-testId=googleButton]").should("exist");
    cy.get("[data-testId=twitterButton]").should("exist");
  });
});
