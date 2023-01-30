/// <reference types="cypress" />

describe("Editor Test | CodeLabz", () => {
  beforeEach(function () {
    cy.fixture("login").then(function (credentials) {
      this.credentials = credentials;
    });
    cy.fixture("base_url").then(function (data) {
      this.base_url = data.base_url;
    });
  });
  it("login", function () {
    indexedDB.deleteDatabase("firebaseLocalStorageDb");
    cy.visit(`${this.base_url}login`);
    cy.wait(2000);
    cy.get(".email").type(this.credentials.email);
    cy.get(".password").type(this.credentials.password);
    cy.get(".loginButton").click();
    cy.wait(5000);
  });

  it("create new tutorial", function () {
    cy.visit(`${this.base_url}tutorials`);
    cy.get("[data-testId=addNewTutorial]").click()
  })

  it("check editor view exist", function () {
    cy.visit(`${this.base_url}tutorials/codelabzorg/OKfLHvn0F8OklPTHFnS0`)
    cy.get('[data-testId=tutorial-content').should("exist")
  })

  it("check firepad exist", function () {
    cy.visit(`${this.base_url}tutorials/codelabzorg/OKfLHvn0F8OklPTHFnS0`);
    cy.wait(6000);
    cy.get("[data-testId=editorMode]").click();
    cy.wait(2000);

    // cy.get("[data-testId=editorFirepad]").should("exist");
  });

  it("add image input", function () {
    cy.visit(`${this.base_url}tutorials/codelabzorg/OKfLHvn0F8OklPTHFnS0`);
    cy.wait(2000);
    cy.get("[data-testId=tutorialImgUpload]").should("not.exist");
    cy.get("#tutorialAddImg").click();
    cy.get("[data-testId=tutorialImgUpload]").should("exist");
  });
});
