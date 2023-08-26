/// <reference types="cypress" />

describe("Home Page Test | CodeLabz", () => {
  beforeEach(function () {
    cy.fixture("login").then(function (credentials) {
      this.credentials = credentials;
    });
    cy.fixture("base_url").then(function (data) {
      this.base_url = data.base_url;
      cy.visit(this.base_url);
    });
  });
  let id;
  before(function () {
    indexedDB.deleteDatabase("firebaseLocalStorageDb");
  });

  it("check not logged in user can access homepage", function () {
    cy.visit(this.base_url);
    cy.get("[data-testId=homepage");
  });

  it("login", function () {
    cy.visit(`${this.base_url}login`);
    cy.get(".email").type(this.credentials.email);
    cy.get(".password").type(this.credentials.password);
    cy.get(".loginButton").click();
    cy.wait(5000);
  });

  it("check main body child exist", function () {
    cy.get("[data-testId=homepageMainBody");
    cy.get("[data-testId=homepageMainBody").should("have.length.at.least", 1);
    cy.get("[data-testId=sidebar_desktop]").should("exist");
    cy.get("[data-testId=homepageNewCodelabz]").should("exist");
    cy.get("[data-testId=activityCard]").should("exist");
  });

  it("check New Codelabz Button is working", function () {
    cy.wait(5000);
    cy.get("[data-testId=NewCodelabzBtn]").should("exist").click();
    cy.get("[data-testId=newTutorial_title]").should("exist").type("test");
    cy.get("[data-testId=newTutorial_summary]").should("exist").type("test");
    cy.get("#orgSelect").should("exist").click();
    cy.get("#react-select-3-listbox").click();
    cy.get("[data-testId=newTutorialSubmit]").should("exist").click();
    cy.wait(5000);
    cy.get("[data-testId=publishTutorial]").should("exist").click();
    cy.url().then(url => {
      const urlArray = url.split("/");
      id = urlArray.pop();
    });
  });

  it("Check New Codelabz is visible on homepage", function () {
    cy.visit(this.base_url);
    cy.get("[data-testId=codelabz]").should("exist");
    cy.get("[data-testId=codelabzDetails]").spread((first, second) => {
      first.click();
      cy.wait(5000);
      cy.url().should("include", "/tutorial");
    });
  });
});
