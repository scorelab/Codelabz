/// <reference types="cypress" />

describe("User Form | CodeLabz", () => {
  it("Check user form", function () {
    cy.visit("http://localhost:3000/");
    cy.get("[data-testId=name]").type("name");
    cy.get("[data-testId=username]").type("username");
    cy.get("[data-testId=userEmail]").type("xyz@gmail.com");
    cy.get("[data-testId=userAddAnotherEmail]").should("exist");
    cy.get("[data-testId=selectCountry]").should("exist").click();
    cy.get("[data-testId=selectCountryItem]").should("exist");
    cy.get("[data-testId=selectCountryItem]").first().click();
  });
});
