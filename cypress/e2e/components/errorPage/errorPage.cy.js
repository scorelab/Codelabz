/// <reference types="cypress" />

describe("Error Page Test | CodeLabz", () => {
    beforeEach(function () {
      cy.fixture("login").then(function (credentials) {
        this.credentials = credentials;
      });
      cy.fixture("base_url").then(function (data) {
        this.base_url = data.base_url;
        cy.visit(this.base_url);
      });
    });
    
    it("login",function(){
        cy.visit(`${this.base_url}login`)
        cy.get(".email").type(this.credentials.email);
        cy.get(".password").type(this.credentials.password);
        cy.get(".loginButton").click();
        cy.wait(5000);
    })

    it("wrong url",function(){
        cy.visit(`${this.base_url}test1`);
        cy.get("[data-testId=errorPage]").should("exist")
        cy.contains("We can't seem to find the page you are looking for")
    })

    
    

});
  