/// <reference types="cypress" />

describe("Login Page | CodeLabz", () => {
  beforeEach(function () {
    indexedDB.deleteDatabase("firebaseLocalStorageDb");
    cy.fixture("login").then(function (credentials) {
      this.credentials = credentials;
    });

    cy.fixture("base_url").then(function (data) {
      this.base_url = data.base_url;
      cy.visit(this.base_url);
    });
  });

  it("check login card exist", function () {
    cy.visit(`${this.base_url}login`);
    cy.wait(5000);
    cy.get("[data-testid=login]").should("exist");
    cy.get("[data-testId=smButtons").should("exist");
  });

  it("forgot password", function () {
    cy.wait(2000);

    cy.visit(`${this.base_url}login`);
    cy.wait(2000);

    cy.get("[data-testId=forgotPassoword").click();
    cy.location().should(loc => {
      expect(loc.href).to.eq(`${this.base_url}forgotpassword`);
    });
  });

  it("empty email and password", function () {
    cy.visit(`${this.base_url}login`);
    cy.wait(2000);

    cy.get(".loginButton").click();
    cy.contains("Please Enter your Email!");
  });

  it("wrong Credentials", function () {
    cy.wait(3000);

    cy.get("[data-test-id=login]").click();

    cy.get(".email").type(this.credentials.email);
    // for passing the test case giving wrong password
    cy.get(".password").type(this.credentials.password + "123");
    cy.get("[data-testId=loginButton]").click();
    cy.wait(5000);

    cy.location().should(loc => {
      expect(loc.href).to.eq(`${this.base_url}login`);
    });
    cy.contains("The email and/or the password seems to be incorrect.");
  });

  it("successfull login", function () {
    cy.wait(3000);

    cy.get("[data-test-id=login]").click();

    cy.get(".email").type(this.credentials.email);
    cy.get(".password").type(this.credentials.password);
    cy.get("[data-testId=loginButton]").click();
    cy.wait(5000);

    cy.location().should(loc => {
      expect(loc.href).to.eq(`${this.base_url}dashboard/my_feed`);
    });
  });
});
