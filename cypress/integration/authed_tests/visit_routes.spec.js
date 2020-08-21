/// <reference types="cypress" />

describe("Authenticated Route Access Test | CodeLabz", () => {
  beforeEach(function() {
    cy.fixture("login").then(function(credentials) {
      this.credentials = credentials;
    });
  });

  it("Login Test - Passing", function() {
    cy.visit("http://localhost:3000");
    cy.get(".ant-btn-link > a").click();
    cy.get("#email").type(this.credentials.email);
    cy.get("#password").type(this.credentials.password);
    cy.get(".ant-form-item-control-input-content > .ant-btn").click();
    cy.wait(5000);
  });

  it("Forbid Visit Login Page - Passing", function() {
    cy.visit("http://localhost:3000/login");
    cy.wait(5000);

    cy.location().should(loc => {
      expect(loc.href).to.eq("http://localhost:3000/dashboard/my_feed");
    });
  });

  it("Forbid Visit Login Page - Passing", function() {
    cy.visit("http://localhost:3000/login");
    cy.wait(5000);

    cy.location().should(loc => {
      expect(loc.href).to.eq("http://localhost:3000/dashboard/my_feed");
    });
  });

  it("Forbid Visit Sign Up Page - Passing", function() {
    cy.visit("http://localhost:3000/signup");
    cy.wait(5000);

    cy.location().should(loc => {
      expect(loc.href).to.eq("http://localhost:3000/dashboard/my_feed");
    });
  });

  it("Forbid Visit Forgot Password Page - Passing", function() {
    cy.visit("http://localhost:3000/forgotpassword");
    cy.wait(5000);

    cy.location().should(loc => {
      expect(loc.href).to.eq("http://localhost:3000/dashboard/my_feed");
    });
  });

  it("Forbid Visit Manage Users Page - Passing", function() {
    cy.visit("http://localhost:3000/manageusers");
    cy.wait(5000);

    cy.location().should(loc => {
      expect(loc.href).to.eq("http://localhost:3000/");
    });
  });

  it("Visit Dashboard Page - Passing", function() {
    cy.visit("http://localhost:3000/dashboard");
    cy.wait(5000);

    cy.location().should(loc => {
      expect(loc.href).to.eq("http://localhost:3000/dashboard/my_feed");
    });
  });

  it("Visit My Feed Page - Passing", function() {
    cy.visit("http://localhost:3000/dashboard/my_feed");
    cy.wait(5000);

    cy.location().should(loc => {
      expect(loc.href).to.eq("http://localhost:3000/dashboard/my_feed");
    });
  });

  it("Visit Profile Page - Passing", function() {
    cy.visit("http://localhost:3000/profile");
    cy.wait(5000);

    cy.location().should(loc => {
      expect(loc.href).to.eq("http://localhost:3000/profile");
    });
  });

  it("Visit Organization Page - Passing", function() {
    cy.visit("http://localhost:3000/organization");
    cy.wait(5000);

    cy.location().should(loc => {
      expect(loc.href).to.eq("http://localhost:3000/");
    });
  });

  it("Visit Tutorials Page - Passing", function() {
    cy.visit("http://localhost:3000/tutorials");
    cy.wait(5000);

    cy.location().should(loc => {
      expect(loc.href).to.eq("http://localhost:3000/tutorials");
    });
  });
});
