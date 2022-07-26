/// <reference types="cypress" />

describe("Card | CodeLabz", () => {
    it("Check connect buttons", function () {
        cy.visit("http://localhost:3000/");
        cy.get("[data-testId=Image]").should("exist");
        cy.get("[data-testId=UserAvatar]").should("exist");
        cy.get("[data-testId=UserName]").should("exist");
        cy.get("[data-testId=UserOrgName]").should("exist");
        cy.get("[data-testId=Title]").should("exist");
        cy.get("[data-testId=Description]").should("exist");
        cy.get("[data-testId=Time]").should("exist");
        cy.get("[data-testId=CommentIcon]").should("exist");
        cy.get("[data-testId=ShareIcon]").should("exist");
        cy.get("[data-testId=NotifIcon]").should("exist");
        cy.get("[data-testId=MoreIcon]").should("exist");
    });
});
