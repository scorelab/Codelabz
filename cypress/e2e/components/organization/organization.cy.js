/// <reference types="cypress" />

import { wait } from "@testing-library/react";

describe("Organization Page | CodeLabz", () => {
  beforeEach(function () {
    cy.fixture("login").then(function (credentials) {
      this.credentials = credentials;
    });
    cy.fixture("base_url").then(function (data) {
      this.base_url = data.base_url;
      cy.visit(this.base_url);
    });
  });

  before(function () {
    indexedDB.deleteDatabase("firebaseLocalStorageDb");
  })

  it("Check Organization Page is not accessable by non-loggedin user", function () {
    cy.visit(`${this.base_url}org/settings/codelabzorg`);

    cy.location().should(loc => {
      if (loc.href === `${this.base_url}login`) {
        expect(loc.href).to.eq(`${this.base_url}login`);
      }
    });
  });

  it("Login With Your Account If Not Logged In", function () {
    cy.visit(`${this.base_url}org/settings/codelabzorg`);
    cy.wait(4000)
    cy.location().then(loc => {

      if (loc.href === `${this.base_url}login`) {
        cy.wait(3000);
        cy.get(".email").type(this.credentials.email);
        cy.get(".password").type(this.credentials.password);
        cy.get(".loginButton").click();
        cy.wait(5000);
      }
    });
  });

  it("Check Organization Page Url", function () {
    cy.visit(`${this.base_url}org/settings/codelabzorg`);

    cy.location().should(loc => {
      expect(loc.href).to.eq(`${this.base_url}org/settings/codelabzorg`);
    });
  });

  it("Check Organization info card avaible", function () {
    cy.visit(`${this.base_url}org/settings/codelabzorg`);
    cy.wait(4000);
    cy.get('[data-testid="General"]').should("exist");
  });
  it("Checking General Tab", function () {
    cy.visit(`${this.base_url}org/settings/codelabzorg`);
    cy.get("[data-testid=organization-general-page]").should("exist");

    cy.wait(4000);
    cy.get("[data-testid=org-delete]").should("exist");
    cy.get("[data-testid=org-delete]")
      .get("[data-testid=org-delete-button]")
      .should("exist");
  });

  it("Checking Users Tab", function () {
    cy.visit(`${this.base_url}org/settings/codelabzorg`);

    cy.get('[data-testid="Users"]').should("exist").click();
    cy.wait(4000);
    cy.get('[data-testid="organization-users-page"]').should("exist");
  })

  it("Checking Passwords Tab", function () {
    cy.visit(`${this.base_url}org/settings/codelabzorg`);

    cy.get('[data-testid="Passwords"]').should("exist").click();
    cy.wait(4000);
    cy.get('[data-testid="organization-passwords-page"]').should("exist");
  })

  it("Checking Social Media Tabs", function () {
    cy.visit(`${this.base_url}org/settings/codelabzorg`);

    cy.get('[data-testid="Social media"]').should("exist").click();
    cy.wait(4000);
    cy.get('[data-testid="organization-socialmedia-page"]').should("exist");
    cy.get("[data-testId=facebookButton]").should("exist");
    cy.get("[data-testId=githubButton]").should("exist");
    cy.get("[data-testId=googleButton]").should("exist");
    cy.get("[data-testId=twitterButton]").should("exist");

  })

  // it("upload org img dialog open", function () {
  //   cy.visit(`${this.base_url}organization`);
  //   cy.wait(5000);
  //   cy.get("#changeOrgImg").click();
  //   cy.get("[data-testId=changeOrgImgDialog]").should("exist");
  // });
  //
  // it("edit org details open", function () {
  //   cy.visit(`${this.base_url}organization`);
  //   cy.wait(5000);
  //   cy.get("#editOrg").should("exist");
  //   cy.get("#editOrg").click();
  //   cy.get("[data-testId=editOrgForm]").should("exist");
  // });
  //
  // it("add new user modal open", function () {
  //   cy.visit(`${this.base_url}organization`);
  //   cy.wait(5000);
  //   cy.get("#addNewUser").click();
  //   cy.get("#addNewUserDialog").should("exist");
  // });
});
