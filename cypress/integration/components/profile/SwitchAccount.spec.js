/// <reference types="cypress" />

describe("Profile | CodeLabz", () => {
    it("Check connect buttons", function () {
        cy.visit("http://localhost:3000/");
        cy.get("[data-testId=AccountUserName]").should("not.have.text", "");
        cy.get("[data-testId=AccountType]").should("exist");
        cy.get("[data-testId=AccountSwapIcon]").should("exist");
        cy.get("[data-testId=AccountSwap]").should("exist");
        cy.get("[data-testId=PersonalProfileButton]").should("exist");
    });
});
