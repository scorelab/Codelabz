/// <reference types="cypress" />

describe("Tutorial Page Test | CodeLabz", () => {
  let id, org;
  beforeEach(function () {
    cy.fixture("login").then(function (credentials) {
      this.credentials = credentials;
    });
    cy.fixture("base_url").then(function (data) {
      this.base_url = data.base_url;
    });
  });

  before(function () {
    indexedDB.deleteDatabase("firebaseLocalStorageDb");
  });
  it("login", function () {
    cy.visit(`${this.base_url}login`);
    cy.get(".email").type(this.credentials.email);
    cy.get(".password").type(this.credentials.password);
    cy.get(".loginButton").click();
    cy.wait(5000);
  });

  it("Create new tutorial", function () {
    cy.visit(`${this.base_url}tutorials`);
    cy.wait(1000);
    cy.get("[data-testId=NewTutorialBtn]").click();
    cy.get("[data-testId=newTutorial_title]").should("exist").type("test");
    cy.get("[data-testId=newTutorial_summary]").should("exist").type("test");
    cy.get("#orgSelect").should("exist").click();
    cy.get("#react-select-3-listbox").click();
    cy.get("[data-testId=newTutorialSubmit]").should("exist").click();
    cy.wait(5000);
    cy.url().then(url => {
      const urlArray = url.split("/");
      id = urlArray.pop();
      org = urlArray.pop();
    });
  });

  it("Check tutorial can't be visited if not published", function () {
    cy.visit(`${this.base_url}tutorial/${id}`);
    cy.wait(5000);
    cy.location().should(loc => {
      expect(loc.href).to.eq(`${this.base_url}not-found`);
    });
  });

  it("Check tutorial can be visited if published", function () {
    cy.visit(`${this.base_url}tutorials/${org}/${id}`);
    cy.get("[data-testId=publishTutorial]").should("exist").click();
    cy.wait(5000);
    cy.visit(`${this.base_url}tutorial/${id}`);
    cy.wait(5000);
    cy.location().should(loc => {
      expect(loc.href).to.eq(`${this.base_url}tutorial/${id}`);
    });
    cy.get("[data-testId=tutorialpageSideBar]").should("exist");
    cy.get("[data-testId=tutorialpageMainBody]");
    cy.get("[data-testId=tutorialpageStepsBar]").should("exist");

    cy.get("[data-testId=tutorialpageComments]").should("exist");
    cy.get("[data-testId=tutorialpageAuthorName]").should("exist");
    cy.get("[data-testId=tutorialpageSteps]").should("exist");
  });
});
