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

  it("Should create new tutorial", function () {
    cy.visit(`${this.base_url}tutorials`);
    cy.get("[data-testId=NewTutorialBtn]").click();
    cy.get("[data-testId=tutorialNewModal]").should("exist");
    cy.get("#orgSelect").should("exist").click();
    cy.get("#react-select-3-listbox").eq(0).click();
    cy.get("[data-testId=newTutorial_title]")
      .should("exist")
      .type("test tutorial");
    cy.get("[data-testId=newTutorial_summary]")
      .should("exist")
      .type("test tutorial summary");
    cy.get("[data-testId=newTutorialSubmit]").should("exist").click();
    cy.wait(2000);
    cy.get("[data-testId=tutorialNewModal]").should("not.exist");
  });

  it("Check Preview and Editor mode exist", function () {
    cy.get("[data-testId=tutorial-content").should("exist");
    cy.get("[data-testId=editorMode]").click();
    cy.get("[data-testId=stepTitleInput]").should("exist");
    cy.get("[data-testId=stepTimeInput]").should("exist");
    cy.get("#quill-editor").should("exist");
    cy.get("[data-testId=previewMode]").click();
  });

  it("Check more dropdown menu", function () {
    cy.get("[data-testid=dropdown-menu-button]").should("exist").click();
    cy.get("[data-testid=editor-dropdown-menu]").should("exist");
    const menuItems = [
      "Edit Description",
      "Edit CodeLabz Theme",
      "Move to Trash"
    ];
    cy.get("[data-testid=editor-dropdown-menu]")
      .find("li")
      .each(($el, index, $list) => {
        expect($el.text().trim()).to.eq(menuItems[index]);
      });
    cy.get("[data-testid=editor-dropdown-menu]>[aria-hidden=true]").click();
  });

  it("Should publish tutorial successfully", function () {
    cy.get("[data-testid=tutorialTitle]").contains("test tutorial");
    cy.get("[data-testId=editorMode]").click();
    cy.wait(2000);
    cy.get(".ql-editor").type("{selectall}{backspace}");
    cy.get(".ql-editor").type("test{enter}line2");
    cy.get("[data-testId=stepTitleInput]").type(
      "{selectall}{backspace}Test step1"
    );
    cy.get("[data-testId=stepTimeInput]").type("{uparrow}{uparrow}");
    cy.get("[data-testId=publishTutorial]").click();
    cy.wait(2000);
    cy.get("[data-testId=stepsPanel]>div").eq(0).contains("Test step1");
  });

  it("Should add new step", function () {
    cy.get("[data-testId=addNewStep]").click();
    cy.get("[data-testId=newStepModal]").should("exist");
    cy.get("[data-testId=newStepTitleInput]").type("Test step2");
    cy.get("[data-testId=newStepTimeInput]").type("10");
    cy.get("[data-testId=newStepSubmitButton]").click();
    cy.wait(1000);
    cy.get("[data-testid=stepsPanel]>div").eq(2).contains("Test step2");
  });

  it("should switch between tutorial steps", function () {
    cy.get("[data-testId=nextStepButton]").click();
    cy.get("[data-testId=stepsPanel]>div")
      .eq(2)
      .find(".Mui-active")
      .should("exist");
    cy.get("[data-testId=previousStepButton]").click();
    cy.get("[data-testId=stepsPanel]>div")
      .eq(0)
      .find(".Mui-active")
      .should("exist");
  });

  it("add image input", function () {
    cy.get("[data-testId=tutorialImgUpload]").should("not.exist");
    cy.get("#tutorialAddImg").click();
    cy.get("[data-testId=tutorialImgUpload]").should("exist");
    cy.get("[data-testId=imageDrawer]>div[aria-hidden=true]").click();
    cy.get("[data-testId=tutorialImgUpload]").should("not.exist");
  });
});
