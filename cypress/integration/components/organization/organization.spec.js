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
      
        cy.location().should((loc) => {
          expect(loc.href).to.not.eq(`${this.base_url}organization`);
        });
      });
  
    it("Login With Your Account", function () {
      cy.visit(`${this.base_url}login`);
      cy.wait(3000);
      cy.get(".email").type(this.credentials.email);
      cy.get(".password").type(this.credentials.password);
      cy.get(".loginButton").click();
      cy.wait(5000);
    });
    
    it("Check Organization Page Url", function () {
        cy.visit(`${this.base_url}organization`);
      
        cy.location().should((loc) => {
          expect(loc.href).to.eq(`${this.base_url}organization`);
        });
      });

      it("Check Organization info card avaible", function () {
        cy.visit(`${this.base_url}organization`);
        cy.wait(4000)
        cy.get("[data-testId=orgInfoCard]").should("exist")
      });
      it("Check other components exists",function(){
        cy.visit(`${this.base_url}organization`);
        cy.wait(5000)
        // org image change compoent
        cy.get(".org-image-card").should("exist")
        // org user card
        cy.get("[data-testId=orgUserCard]").should("exist")
       // change org image button
       cy.get("#changeOrgImg").should("exist")
       //edit org
       cy.get("#editOrg").should("exist")
       // add new user
       cy.get("#addNewUser").should("exist")
      })

      it("upload org img dialog open",function(){
        cy.visit(`${this.base_url}organization`)
        cy.wait(5000)
        cy.get("#changeOrgImg").click()
        cy.get("[data-testId=changeOrgImgDialog]").should("exist")
      })

      it("edit org details open",function(){
        cy.visit(`${this.base_url}organization`)
        cy.wait(5000)
        cy.get("#editOrg").should("exist")
        cy.get("#editOrg").click()
        cy.get("[data-testId=editOrgForm]").should("exist")
      })

      it("add new user modal open",function(){
        cy.visit(`${this.base_url}organization`)
        cy.wait(5000)
        cy.get("#addNewUser").click();
        cy.get("#addNewUserDialog").should("exist")
      })
  });
  