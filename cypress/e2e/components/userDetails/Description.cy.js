/// <reference types="cypress" />

describe("Users Detail | CodeLabz", () => {
    it("Check connect buttons", function () {
        cy.visit("http://localhost:3000/");
        cy.get("[data-testId=DescriptionHeading]").should("not.have.text", "");
        cy.get("[data-testId=DescriptionContent]").should("exist");
    });
});
