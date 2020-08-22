/// <reference types="cypress" />

describe("Login Test | CodeLabz", () => {
  beforeEach(function() {
    cy.fixture("login").then(function(credentials) {
      this.credentials = credentials;
    });
    cy.fixture("base_url").then(function(data) {
      this.base_url = data.base_url;
      cy.visit(this.base_url);
    });
  });

  it("Login Test - Passing", function() {
    cy.get(".ant-btn-link > a").click();
    cy.get("#email").type(this.credentials.email);
    cy.get("#password").type(this.credentials.password);
    cy.get(".ant-form-item-control-input-content > .ant-btn").click();
    cy.wait(5000);
    cy.get(".ant-avatar").click();
    cy.xpath('//*[(@id = "log-out")]').click();
  });

  it("Login Test - Failing", () => {
    cy.get(".ant-btn-link > a").click();
    cy.get("#email").type("seniyaklop23@gmail.com");
    cy.get("#password").type("123456789");
    cy.get(".ant-form-item-control-input-content > .ant-btn").click();
  });
});
