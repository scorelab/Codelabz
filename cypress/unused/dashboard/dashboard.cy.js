/// <reference types="cypress" />

describe("Dashboard Test | CodeLabz", () => {
  beforeEach(function () {
    cy.fixture("login").then(function (credentials) {
      this.credentials = credentials;
    });
    cy.fixture("base_url").then(function (data) {
      this.base_url = data.base_url;
      cy.visit(this.base_url);
    });
  });

  it("login", function () {
    indexedDB.deleteDatabase("firebaseLocalStorageDb");
    cy.visit(`${this.base_url}login`);
    cy.wait(5000);
    cy.get(".email").type(this.credentials.email);
    cy.get(".password").type(this.credentials.password);
    cy.get(".loginButton").click();
    cy.wait(5000);
  });

  it("Check empty user handle ", function () {
    cy.visit(`${this.base_url}dashboard`);
    cy.wait(3000);
    cy.get('[data-testid="userName"]').type("{selectall}{backspace}");
    cy.get('[data-testid="userName"]').type("testusername");

    cy.get('[data-testid="userCountry"]').type("India");
    cy.get('[data-testid="submit-button"]').click();

    cy.contains("Please enter a handle");

    cy.location().should(loc => {
      expect(loc.href).to.eq(`${this.base_url}dashboard`);
    });
  });

  it("Check that the user handle only contains lowercase alphanumeric characters ", function () {
    cy.visit(`${this.base_url}dashboard`);
    cy.wait(3000);
    cy.get('[data-testid="userName"]').type("{selectall}{backspace}");
    cy.get('[data-testid="userName"]').type("testusername");
    cy.get('[data-testid="userHandle"]').type("TESTUSER@");

    cy.get('[data-testid="userCountry"]').type("India");
    cy.get('[data-testid="submit-button"]').click();

    cy.contains(
      "User handle can only contain lowercase alphanumeric characters"
    );

    cy.location().should(loc => {
      expect(loc.href).to.eq(`${this.base_url}dashboard`);
    });
  });
  it("Check User handle cannot be less than 6 characters", function () {
    cy.visit(`${this.base_url}dashboard`);
    cy.wait(3000);
    cy.get('[data-testid="userName"]').type("{selectall}{backspace}");
    cy.get('[data-testid="userName"]').type("testusername");
    cy.get('[data-testid="userHandle"]').type("test");

    cy.get('[data-testid="userCountry"]').type("India");
    cy.get('[data-testid="submit-button"]').click();

    cy.contains("User handle cannot be less than 6 characters");

    cy.location().should(loc => {
      expect(loc.href).to.eq(`${this.base_url}dashboard`);
    });
  });

  it("Check Organization handle can only contain lowercase alphanumeric characters ", function () {
    cy.visit(`${this.base_url}dashboard`);
    cy.wait(3000);
    cy.get('[data-testid="userName"]').type("{selectall}{backspace}");
    cy.get('[data-testid="userName"]').type("testusername");
    cy.get('[data-testid="userHandle"]').type("testuserhandle");

    cy.get('[data-testid="userCountry"]').type("India");
    cy.get('[data-testid="createOrgBtn"]').click();
    cy.get('[data-testid="orgName"]').type("testorgname");
    cy.get('[data-testid="orgHandle"]').type("TESTORG");
    cy.get('[data-testid="submit-button"]').click();
    cy.contains(
      "Organization handle can only contain lowercase alphanumeric characters"
    );

    cy.location().should(loc => {
      expect(loc.href).to.eq(`${this.base_url}dashboard`);
    });
  });

  it("Check Organization handle cannot be less than 6 characters ", function () {
    cy.visit(`${this.base_url}dashboard`);
    cy.wait(3000);
    cy.get('[data-testid="userName"]').type("{selectall}{backspace}");
    cy.get('[data-testid="userName"]').type("testusername");
    cy.get('[data-testid="userHandle"]').type("testuserhandle");

    cy.get('[data-testid="userCountry"]').type("India");
    cy.get('[data-testid="createOrgBtn"]').click();
    cy.get('[data-testid="orgName"]').type("testorgname");
    cy.get('[data-testid="orgHandle"]').type("test");
    cy.get('[data-testid="submit-button"]').click();
    cy.contains("Organization handle cannot be less than 6 characters");

    cy.location().should(loc => {
      expect(loc.href).to.eq(`${this.base_url}dashboard`);
    });
  });

  it("Check Organization website cannot be empty ", function () {
    cy.visit(`${this.base_url}dashboard`);
    cy.wait(3000);
    cy.get('[data-testid="userName"]').type("{selectall}{backspace}");
    cy.get('[data-testid="userName"]').type("testusername");
    cy.get('[data-testid="userHandle"]').type("testuserhandle");

    cy.get('[data-testid="userCountry"]').type("India");
    cy.get('[data-testid="createOrgBtn"]').click();
    cy.get('[data-testid="orgName"]').type("testorgname");
    cy.get('[data-testid="orgHandle"]').type("testorghandle");
    cy.get('[data-testid="orgCountry"]').type("India");
    // cy.get('[data-testid="orgWebsite"]').type('')
    cy.get('[data-testid="submit-button"]').click();
    cy.contains("Please enter a website");

    cy.location().should(loc => {
      expect(loc.href).to.eq(`${this.base_url}dashboard`);
    });
  });

  it("Check Organization website should be a valid URL ", function () {
    cy.visit(`${this.base_url}dashboard`);
    cy.wait(3000);
    cy.get('[data-testid="userName"]').type("{selectall}{backspace}");
    cy.get('[data-testid="userName"]').type("testusername");
    cy.get('[data-testid="userHandle"]').type("testuserhandle");

    cy.get('[data-testid="userCountry"]').type("India");
    cy.get('[data-testid="createOrgBtn"]').click();
    cy.get('[data-testid="orgName"]').type("testorgname");
    cy.get('[data-testid="orgHandle"]').type("testorghandle");
    cy.get('[data-testid="orgCountry"]').type("India");
    cy.get('[data-testid="orgWebsite"]').type("testorgwebsite");
    cy.get('[data-testid="submit-button"]').click();
    cy.contains("Please provide a valid URL");

    cy.location().should(loc => {
      expect(loc.href).to.eq(`${this.base_url}dashboard`);
    });
  });
  it("Save User and Org Data", function () {
    cy.visit(`${this.base_url}dashboard`);
    cy.wait(3000);
    cy.get('[data-testid="userName"]').type("{selectall}{backspace}");
    cy.get('[data-testid="userName"]').type("testusername");
    cy.get('[data-testid="userHandle"]').type("testuserhandle");

    cy.get('[data-testid="userCountry"]').type("India");
    cy.get('[data-testid="createOrgBtn"]').click();
    cy.get('[data-testid="orgName"]').type("testorgname");
    cy.get('[data-testid="orgHandle"]').type("codelabzorg");
    cy.get('[data-testid="orgCountry"]').type("India");
    cy.get('[data-testid="orgWebsite"]').type("https://testorgwebsite.com");
    cy.get('[data-testid="submit-button"]').click();

    cy.wait(5000);
    cy.location().should(loc => {
      expect(loc.href).to.eq(`${this.base_url}dashboard/my_feed`);
    });
  });

  it("prev user dashboard access denied", function () {
    cy.visit(`${this.base_url}dashboard`);
    cy.wait(5000);
    cy.location().should(loc => {
      expect(loc.href).to.not.eq(`${this.base_url}dashboard`);
    });
  });
});
