/// <reference types="cypress" />

describe("Forgot Password Page | CodeLabz", () => {
  beforeEach(function () {
    cy.fixture("login").then(function (credentials) {
      this.credentials = credentials;
    });
    cy.fixture("base_url").then(function (data) {
      this.base_url = data.base_url;
      cy.visit(this.base_url);
    });
  });

  it("check forgotpassword card exist", function () {
    cy.visit(`${this.base_url}forgotpassword`);
    cy.get("[data-testid=forgotPassword]").should("exist");
  });

  it("empty email ", function () {
    cy.visit(`${this.base_url}forgotpassword`);
    cy.get("[data-testId=forgotPasswordButton]").click();
    cy.contains("The email address is badly formatted.");
  });
  it("successfull ", function () {
    cy.visit(`${this.base_url}forgotpassword`);
    cy.get("[data-testId=forgotPasswordEmail]").type(this.credentials.email);
    cy.get("[data-testId=forgotPasswordButton]").click();
    cy.contains(
      "We have sent you an email containing the link to reset your password. Please check your inbox including spams."
    );
  });
});
