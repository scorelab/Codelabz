/// <reference types="cypress" />


describe("Sidebar | CodeLabz", () => {
    beforeEach(function () {
        cy.fixture("base_url").then(function (data) {
            this.base_url = data.base_url;
        });
    });
    context("<750p resolution", () => {
        beforeEach(() => {
            cy.viewport(720, 751);
            cy.visit(`${this.base_url}`);
        });

        it("displays toggle sidebar", () => {
            cy.get("[data-testId=homepageSidebar]").should("not.exist");
            cy.get("[data-testId=homepageSidebarSmall]").should("exist");
            cy.get("[data-testId=drawerMenu]").should("exist");
        });

        it("displays all menu items", () => {
            cy.get("[data-testId=Home]").should("exist");
            cy.get("[data-testId=Notifications]").should("exist");
            cy.get("[data-testId=Settings]").should("exist");
            cy.get("[data-testId=Organizations]").should("exist");
            cy.get("[data-testId=Profile]").should("exist");
            cy.get("[data-testId=Bookmarks]").should("exist");
        });

        it("Visit settings", () => {
            cy.get("[data-testId=Settings]").click();
            cy.url().should('include', '/settings')
        });

        it("Visit organization", () => {
            cy.get("[data-testId=Organizations]").click();
            cy.url().should('include', '/organizations')
        });

        it("Visit bookmarks", () => {
            cy.get("[data-testId=Bookmarks]").click();
            cy.url().should('include', '/bookmarks')
        });

    });
    context(">750p resolution", () => {
        beforeEach(() => {
            cy.viewport(1280, 751);
            cy.visit(`${this.base_url}`);
        });

        it("displays desktop sidebar  and menu items", () => {
            cy.visit("http://localhost:3000");
            cy.get("[data-testId=homepageSidebar]").should("exist");
            cy.get("[data-testId=homepageSidebarSmall]").should("not.exist");
            cy.get("[data-testId=normalMenu]").should("exist");
        });
        it("displays all menu items", () => {
            cy.get("[data-testId=Home]").should("exist");
            cy.get("[data-testId=Notifications]").should("exist");
            cy.get("[data-testId=Settings]").should("exist");
            cy.get("[data-testId=Organizations]").should("exist");
            cy.get("[data-testId=Profile]").should("exist");
            cy.get("[data-testId=Bookmarks]").should("exist");
        });

        it("Visit organization", () => {
            cy.get("[data-testId=Organizations]").click();
            cy.url().should('include', '/organizations')
        });

        it("Visit settings", () => {
            cy.get("[data-testId=Settings]").click();
            cy.url().should('include', '/settings')
        });

        it("Visit bookmarks", () => {
            cy.get("[data-testId=Bookmarks]").click();
            cy.url().should('include', '/bookmarks')
        });
    });
});