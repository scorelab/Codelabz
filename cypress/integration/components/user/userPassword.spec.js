/// <reference types="cypress" />

describe("User Password | CodeLabz", () => {
  it("Check user passwords", function () {
    cy.visit("http://localhost:3000/");
    cy.get("[data-testId=oldPassword]").should("exist");
    cy.get("[data-testId=newPassword]").should("exist");
    cy.get("[data-testId=confirmPassword]").should("exist");
    cy.get("[data-testId=updatePassword]").should("exist");
    cy.get("[data-testId=logout]").should("exist");
    cy.get("[data-testId=logoutOfOtherBrowsers]").should("exist");
    cy.get("[data-testId=loginSecurity]").should("exist");
    cy.get("[data-testId=emailVerification]").should("exist");
  });
});
