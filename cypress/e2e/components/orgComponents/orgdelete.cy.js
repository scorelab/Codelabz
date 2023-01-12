/// <reference types="cypress" />;

describe("Organization Users | CodeLabz", () => {
  beforeEach(function () {
    cy.fixture("base_url").then(function (data) {
      this.base_url = data.base_url;
      cy.visit(this.base_url);
    });
  });

  it("Check OrganisationDelete", function () {
    cy.get("[data-testid=org-delete]").should("exist");
    cy.get("[data-testid=org-delete]")
      .get("[data-testid=org-delete-button]")
      .click();
  });
});
