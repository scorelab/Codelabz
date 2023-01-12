/// <reference types="cypress" />

describe("Tutorial Test | CodeLabz", () => {
  beforeEach(function () {
    cy.fixture("login").then(function (credentials) {
      this.credentials = credentials;
    });
    cy.fixture("base_url").then(function (data) {
      this.base_url = data.base_url;
    });
  });

  it("tutorial page is not accessable from outside", function () {
    cy.visit(`${this.base_url}tutorials`);
    cy.location().should((loc) => {
      expect(loc.href).to.not.eq(`${this.base_url}tutorials`);
    });
  });
  it("login", function () {
    cy.visit(`${this.base_url}login`);
    cy.get(".email").type(this.credentials.email);
    cy.get(".password").type(this.credentials.password);
    cy.get(".loginButton").click();
    cy.wait(5000);
  });

  it("logged in user can access tutorial page", function () {
    cy.visit(`${this.base_url}tutorials`);
    cy.location().should((loc) => {
      expect(loc.href).to.eq(`${this.base_url}tutorials`);
    });
  });

  it("tutorial components present", function () {
    cy.visit(`${this.base_url}tutorials`);
    // tutorial main body
    cy.get("[data-testId=tutorialMainBody]");
    // tutorial search components
    cy.get("[data-testId=tutorialSearch]");
    // new tutorial add button
    cy.get("[data-testId=tutorialAddNewButton]");
    // org tutorial component
    cy.get("[data-testId=tutorialCard]");
  });
  it("new tutorial modal open", function () {
    cy.visit(`${this.base_url}tutorials`);
    cy.wait(1000);
    cy.get("[data-testId=tutorialAddNewButton]").click();
    cy.get("[data-testId=tutorialNewModal]");
  });
  it("new tutorial form has atleast 3 children", function () {
    cy.get("#newTutorialTitle").should("exist");
    cy.get("#newTutorialSummary").should("exist");
    cy.get("#newTutorialSelect").should("exist");
  });
  it("new tutorial function", function () {
    cy.get("#cancelAddTutorial").click();
    cy.get("[data-testId=tutorialNewModal]").should("not.exist");
  });
});
