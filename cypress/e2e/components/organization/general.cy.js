/// <reference types="cypress" />

describe("Organization Page - General | CodeLabz", () => {
  beforeEach(function () {
    cy.fixture("login").then(function (credentials) {
      this.credentials = credentials;
    });
  });

  before(function () {
    indexedDB.deleteDatabase("firebaseLocalStorageDb");
  })

  it("Login With Your Account If Not Logged In", function () {
    cy.visit('/login');
    cy.wait(2000)
    cy.location().then(loc => {
      if (loc.pathname === '/login') {
        cy.get(".email").type(this.credentials.email);
        cy.get(".password").type(this.credentials.password);
        cy.get(".loginButton").click();
        cy.wait(5000);
      }
    });
  });

  it("Organization inputs should exist", function () {
    cy.visit('/');
    cy.get('[data-testid="Organizations"]').click();
    cy.get('[data-testid="orgNameInput"]').should('exist');
    cy.get('[data-testid="orgHandleInput"]').should('exist');
    cy.get('[data-testid="orgHandleInput"]>input').should('be.disabled');
    cy.get('[data-testid="orgWebsiteInput"]').should('exist');
    cy.get('[data-testid="orgFacebookInput"]').should('exist');
    cy.get('[data-testid="orgGithubInput"]').should('exist');
    cy.get('[data-testid="orgLinkedinInput"]').should('exist');
    cy.get('[data-testid="orgTwitterInput"]').should('exist');
    cy.get('[data-testid="uploadImageBtn"]').should('exist');
    cy.get('[data-testid="orgDescriptionInput"]').should('exist');
  });

  it("Organization inputs should be editable", function () {
    cy.visit('/');
    cy.get('[data-testid="Organizations"]').click();
    cy.wait(2000);
    cy.get('[data-testid="orgNameInput"]>input')
      .type('{selectall}')
      .type('CodeLabz Test')
      .should("have.value", "CodeLabz Test");
    cy.get('[data-testid="orgWebsiteInput"]>input')
      .type('{selectall}')
      .type('https://dev.codelabz.io/')
      .should("have.value", "https://dev.codelabz.io/");
    cy.get('[data-testid="orgFacebookInput"]>input')
      .type("{selectall}")
      .type("https://www.facebook.com/codelabz")
      .should("have.value", "https://www.facebook.com/codelabz");
    cy.get('[data-testid="orgGithubInput"]>input')
      .type("{selectall}")
      .type("https://github.com/codelabz")
      .should("have.value", "https://github.com/codelabz");
    cy.get('[data-testid="orgLinkedinInput"]>input')
      .type("{selectall}")
      .type("https://www.linkedin.com/company/codelabz")
      .should("have.value", "https://www.linkedin.com/company/codelabz");
    cy.get('[data-testid="orgTwitterInput"]>input')
      .type("{selectall}")
      .type("https://twitter.com/codelabz")
      .should("have.value", "https://twitter.com/codelabz");
    cy.get('[data-testid="orgDescriptionInput"]>div>textarea').eq(0)
      .type("{selectall}")
      .type("CodeLabz is a platform for developers to learn, share and grow.")
      .should("have.value", "CodeLabz is a platform for developers to learn, share and grow.");
    cy.wait(4000)
  });

  it("Check Organization details are saved", function () {
    cy.visit('/');
    cy.get('[data-testid="Organizations"]').click();
    cy.wait(2000);
    cy.get('[data-testid="orgNameInput"]>input')
      .should("have.value", "CodeLabz Test");
    cy.get('[data-testid="orgWebsiteInput"]>input')
      .should("have.value", "https://dev.codelabz.io/");
    cy.get('[data-testid="orgFacebookInput"]>input')
      .should("have.value", "https://www.facebook.com/codelabz");
    cy.get('[data-testid="orgGithubInput"]>input')
      .should("have.value", "https://github.com/codelabz");
    cy.get('[data-testid="orgLinkedinInput"]>input')
      .should("have.value", "https://www.linkedin.com/company/codelabz");
    cy.get('[data-testid="orgTwitterInput"]>input')
      .should("have.value", "https://twitter.com/codelabz");
    cy.get('[data-testid="orgDescriptionInput"]>div>textarea').eq(0)
      .should("have.value", "CodeLabz is a platform for developers to learn, share and grow.");
  });

  it("Should be able to upload organization Image", function () {
    cy.visit('/');
    cy.get('[data-testid="Organizations"]').click();
    cy.wait(2000);
    cy.get('[data-testid="uploadImageBtn"]').click();
    cy.get('[data-testid="changeOrgImgDialog"]').should("exist");
    cy.get('input[id="file-upload"]').attachFile('cl_logo.png', {
      subjectType: 'input'
    });
    cy.wait(2000);
    cy.get('[data-testid="saveImageBtn"]').click();
    cy.get('[data-testid="changeOrgImgDialog"]').should("not.exist");
    cy.wait(1000);
    cy.get("body").then($body => {
      if ($body.find("[data-testid=uploadingInfo]").length === 0) {
        cy.get('[data-testid="orgImage"]').should("exist");
        cy.get('[data-testid="noImage"]').should("not.exist");
      }
    });
  });

  it("Delete Organization Modal Check", function () {
    cy.get('[data-testid="org-delete-button"]').click();
    cy.get('[data-testid="orgDeleteDialog"]').should("exist");
    cy.get('[data-testid="orgHandle"]').should("exist").then(($orgHandle) => {
      const orgHandle = $orgHandle.text();
      cy.get('[data-testid="deleteOrgButton"]').should("exist").should("be.disabled");
      cy.get('[data-testid="deleteOrgInput"]>div>input').should("exist").type(orgHandle);
      cy.get('[data-testid="deleteOrgButton"]').should("exist").should("not.be.disabled");
    });
    cy.get('[data-testid="orgDeleteDialog"]>div[aria-hidden=true]').should("exist").click({
      force: true
    });
    cy.get('[data-testid="orgDeleteDialog"]').should("not.exist");

  });
});