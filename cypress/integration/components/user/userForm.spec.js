/// <reference types="cypress" />

describe("User Form | CodeLabz", () => {
  it("Check user form", function () {
    cy.visit("http://localhost:3000/");
    cy.get("[data-testId=name]").should("exist");
    cy.get("[data-testId=username]").should("exist");
    cy.get("[data-testId=userEmail]").should("exist");
    cy.get("[data-testId=userAddAnotherEmail]").should("exist");
    cy.get("[data-testId=selectCountry]").should("exist").click();
    cy.get("[data-testId=selectCountryItem]").should("exist");
    cy.get("[data-testId=selectCountryItem]").first().click();
  });
});
