/// <reference types="cypress" />

describe("Unauthenticated Routes Access Test | CodeLabz", () => {
  it("Visit Login Page - Passing", function() {
    cy.visit("http://localhost:3000/login");
    cy.wait(5000);

    cy.location().should(loc => {
      expect(loc.href).to.eq("http://localhost:3000/login");
    });
  });

  it("Visit Sign Up Page - Passing", function() {
    cy.visit("http://localhost:3000/signup");
    cy.wait(5000);

    cy.location().should(loc => {
      expect(loc.href).to.eq("http://localhost:3000/signup");
    });
  });

  it("Visit Forgot Password Page - Passing", function() {
    cy.visit("http://localhost:3000/forgotpassword");
    cy.wait(5000);

    cy.location().should(loc => {
      expect(loc.href).to.eq("http://localhost:3000/forgotpassword");
    });
  });

  it("Forbid Visit Manage Users Page - Passing", function() {
    cy.visit("http://localhost:3000/manageusers");
    cy.wait(5000);

    cy.location().should(loc => {
      expect(loc.href).to.eq("http://localhost:3000/");
    });
  });

  it("Forbid Visit Dashboard Page - Passing", function() {
    cy.visit("http://localhost:3000/dashboard");
    cy.wait(5000);

    cy.location().should(loc => {
      expect(loc.href).to.eq("http://localhost:3000/login");
    });
  });

  it("Forbid Visit My Feed Page - Passing", function() {
    cy.visit("http://localhost:3000/dashboard/my_feed");
    cy.wait(5000);

    cy.location().should(loc => {
      expect(loc.href).to.eq("http://localhost:3000/login");
    });
  });

  it("Forbid Visit Profile Page - Passing", function() {
    cy.visit("http://localhost:3000/profile");
    cy.wait(5000);

    cy.location().should(loc => {
      expect(loc.href).to.eq("http://localhost:3000/login");
    });
  });

  it("Forbid Visit Organization Page - Passing", function() {
    cy.visit("http://localhost:3000/organization");
    cy.wait(5000);

    cy.location().should(loc => {
      expect(loc.href).to.eq("http://localhost:3000/login");
    });
  });

  it("Forbid Visit Tutorials Page - Passing", function() {
    cy.visit("http://localhost:3000/tutorials");
    cy.wait(5000);

    cy.location().should(loc => {
      expect(loc.href).to.eq("http://localhost:3000/login");
    });
  });
});
