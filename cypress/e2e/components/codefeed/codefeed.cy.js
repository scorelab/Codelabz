/// <reference types="cypress" />

describe("Codefeed Page | CodeLabz", () => {
  beforeEach(function () {
    cy.fixture("login").then(function (credentials) {
      this.credentials = credentials;
    });
    cy.fixture("base_url").then(function (data) {
      this.base_url = data.base_url;
      cy.visit(this.base_url);
    });
  });

  it("Check Codefeed Page is not accessable by non-loggedin user", function () {
    cy.visit(`${this.base_url}dashboard`);

    cy.location().should((loc) => {
      expect(loc.href).to.not.eq(`${this.base_url}dashboard/my_feed`);
    });
  });

  it("Login With Your Account", function () {
    cy.visit(`${this.base_url}login`);
    cy.wait(3000);
    cy.get(".email").type(this.credentials.email);
    cy.get(".password").type(this.credentials.password);
    cy.get(".loginButton").click();
    cy.wait(5000);
  });

  it("Check Codefeed Page Url accessable by logged in user", function () {
    cy.visit(`${this.base_url}dashboard/my_feed`);

    cy.location().should((loc) => {
      expect(loc.href).to.eq(`${this.base_url}dashboard/my_feed`);
    });
  });

  it("check header component is present", function () {
    cy.visit(`${this.base_url}dashboard/my_feed`);
    cy.wait(3000);
    cy.get("[data-testId=codefeedTitle]").should("exist");
  });
  it("check carousel card present in codefeed", function () {
    cy.visit(`${this.base_url}dashboard/my_feed`);
    cy.wait(3000);
    cy.get("[data-testId=codefeedCarouselCard]").should("exist");
  });
  it("check left and right arrow exist", function () {
    cy.visit(`${this.base_url}dashboard/my_feed`);
    cy.wait(3000);
    cy.get("[data-testId=codefeedLeftarrow]").should("exist");
    cy.get("[data-testId=codefeedRightarrow]").should("exist");
  });
  it("check card redirect to organization", function () {
    cy.visit(`${this.base_url}dashboard/my_feed`);
    cy.wait(3000);
    cy.get("[data-testId=codefeedCarouselCard]").click({ force: true });
    cy.location().should((loc) => {
      loc.href.includes("org");
    });
  });
});
