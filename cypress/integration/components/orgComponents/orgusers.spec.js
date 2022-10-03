/// <reference types="cypress" />;

describe("Organization Users | CodeLabz", () => {
  beforeEach(function () {
    cy.fixture("base_url").then(function (data) {
      this.base_url = data.base_url;
      cy.visit(this.base_url);
    });
  });

  it("Check OrganizationUsers", function () {
    cy.get("[data-testid=org-users]").should("exist");
    cy.get("[data-testid=org-users]")
      .get("[data-testid=org-title]")
      .should("not.have.text", "");

    cy.get("[data-testid=org-users]")
      .get("[data-testid=org-description]")
      .should("not.have.text", "");

    cy.get("[data-testid=org-users]")
      .get("[data-testid=org-userlist]")
      .should("exist");

    cy.get("[data-testid=org-users]")
      .get("[data-testid=org-userlist]")
      .get("[data-testid=org-user-card]")
      .should("exist");
  });
});
