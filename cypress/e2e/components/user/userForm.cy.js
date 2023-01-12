/// <reference types="cypress" />

describe("User Form | CodeLabz", () => {
  it("Check user form", function () {
    cy.visit("http://localhost:3000/user-dashboard/profile");
    cy.get("[data-testId=name]").children().clear().type("testname");
    cy.get("[data-testId=selectCountry]").click();
    cy.get("[data-testId=selectCountryItem]").first().click();
    cy.get("[data-testId=website]").children().clear().type("https://test.web");
    cy.get("[data-testId=description]").children().clear().type("description");
  });

  it("Check social media handles", function () {
    cy.get("[data-testId=editProfileFacebook]")
      .find("div > input")
      .clear()
      .type("facebook");
    cy.get("[data-testId=editProfileTwitter]")
      .find("div > input")
      .clear()
      .type("twitter");
    cy.get("[data-testId=editProfileLinkedin]")
      .find("div > input")
      .clear()
      .type("linkedin");
    cy.get("[data-testId=editProfileGithub]")
      .find("div > input")
      .clear()
      .type("github");
    cy.get("[data-testId=editProfileSave]").click();
  });
});
