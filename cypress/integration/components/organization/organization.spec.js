/// <reference types="cypress" />

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

  it("Check Organization Page is not accessable by non-loggedin user", function () {
    cy.visit(`${this.base_url}organization`);

    cy.location().should(loc => {
      if (loc.href === `${this.base_url}login`) {
        expect(loc.href).to.eq(`${this.base_url}login`);
      }
    });
  });

  it("Login With Your Account If Not Logged In", function () {
    cy.visit(`${this.base_url}organization`);
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
    cy.visit(`${this.base_url}organization`);

    cy.location().should(loc => {
      expect(loc.href).to.eq(`${this.base_url}organization`);
    });
  });

  it("Check Organization info card avaible", function () {
    cy.visit(`${this.base_url}organization`);
    cy.wait(4000);
    cy.get("[data-test-id=switch-account-card]").should("exist");
  });
  it("Check other components exists", function () {
    cy.visit(`${this.base_url}organization`);
    cy.wait(3000);
    cy.get("[data-testid=general-menu-item]").should("exist").click();
    cy.get("[data-testid=organization-general-page]").should("exist");
    cy.wait(3000);
    cy.get("[data-testid=users-menu-item]").should("exist").click();
    cy.get("[data-testid=organization-users-page]").should("exist");
    cy.get("[data-testid=org-admin-list]").should("exist");
    cy.get("[data-testid=org-contributor-list]").should("exist");
    cy.wait(3000);
    cy.get("[data-testid=passwords-menu-item]").should("exist").click();
    cy.get("[data-testid=organization-passwords-page]").should("exist");
    cy.wait(3000);
    cy.get("[data-testid=socialmedia-menu-item]").should("exist").click();
    cy.get("[data-testid=organization-socialmedia-page]").should("exist");
  });

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
