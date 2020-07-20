/// <reference types="cypress" />

describe("Login Test | CodeLabz", () => {
  beforeEach(function() {
    cy.fixture("login").then(function(credentials) {
      this.credentials = credentials;
    });
    cy.visit("http://localhost:3000");
  });

  it("Login Test - Passing", function() {
    cy.get(".ant-btn-link > a").click();
    cy.get("#email").type(this.credentials.email);
    cy.get("#password").type(this.credentials.password);
    cy.get(".ant-form-item-control-input-content > .ant-btn").click();
    cy.get(".ant-avatar").click();
    cy.xpath('//*[(@id = "log-out")]').click();
  });

  xit("Login Test - Failing", () => {
    cy.get(".ant-btn-link > a").click();
    cy.get("#email").type("seniyaklop23@gmail.com");
    cy.get("#password").type("123456789");
    cy.get(".ant-form-item-control-input-content > .ant-btn").click();
    cy.get(".ant-avatar").click();
    cy.get("#item_0\\$Menu > .ant-menu-item").click();
  });
});
