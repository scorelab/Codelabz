/// <reference types="cypress" />

describe("Users Detail | CodeLabz", () => {
    it("Check connect buttons", function () {
        cy.visit("http://localhost:3000/");
        cy.get("[data-testId=HighlightsHeading]").should("not.have.text", "");
        cy.get("[data-testId=HighlightsCurrentJob]").should("exist");
        cy.get("[data-testId=HighlightsEducation]").should("exist");
        cy.get("[data-testId=HighlightsLanguages]").should("exist");
        cy.get("[data-testId=HighlightsJoinedDate]").should("exist");
    });
});
