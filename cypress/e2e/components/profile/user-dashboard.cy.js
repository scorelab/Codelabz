/// <reference types="cypress" />

describe("User Dashboard Test | CodeLabz", () => {
    beforeEach(function () {
        cy.fixture("login").then(function (credentials) {
            this.credentials = credentials;
        });
        cy.fixture("base_url").then(function (data) {
            this.base_url = data.base_url;
        });
    })

    it("login", function () {
        indexedDB.deleteDatabase("firebaseLocalStorageDb");
        cy.visit(`${this.base_url}login`);
        cy.wait(10000);
        cy.get(".email").type(this.credentials.email);
        cy.get(".password").type(this.credentials.password);
        cy.get(".loginButton").click();
        cy.wait(5000);
    })

    it("check user dashboard", function () {
        cy.visit(`${this.base_url}user-dashboard/profile`);
    })

    it("Check Switch Account", function () {
        cy.visit(`${this.base_url}user-dashboard/profile`);

        cy.get("[data-testId=switchAccount]").should("exist");
        cy.get("[data-testId=switchAccount_switch]").should("exist")
    })

    it("Check Profile", function () {
        cy.visit(`${this.base_url}user-dashboard/profile`);
        cy.get('[data-testid="profile"] > .makeStyles-navLink-81 > .MuiButtonBase-root').should("exist").click();
        cy.wait(2000);
        cy.get("[data-testId=profilePage]").should("exist");
        cy.get("[data-testid=name]").children().clear().type("testname");
        cy.get("[data-testId=selectCountry]").click();
        cy.get("[data-testId=selectCountryItem]").first().click();
        cy.get("[data-testId=website]").children().clear().type("https://test.web");
        cy.get("[data-testId=description]").children().clear().type("description");
        cy.get("[data-testId=editProfileFacebook]")
            .find("div > input")
            .clear()
            .type("facebook");
        cy.get("[data-testId=editProfileTwitter]")
            .find("div > input")
            .clear()
            .type("twitter");
        cy.get("[data-testId=editProfileLinkedin]")
            .find("div > input")
            .clear()
            .type("linkedin");
        cy.get("[data-testId=editProfileGithub]")
            .find("div > input")
            .clear()
            .type("github");
        cy.get("[data-testId=editProfileSave]").click();

    })

    it("Check User Settings", function () {
        cy.visit(`${this.base_url}user-dashboard/profile`);

        cy.get('[data-testid="userSettings"] > .makeStyles-navLink-81 > .MuiButtonBase-root').should("exist").click();
        cy.get("[data-testId=userSettingsPage]").should("exist");
        cy.get("[data-testId=exportData]").should("exist");
        cy.get("[data-testId=startExport]").should("exist");
        cy.get("[data-testId=successorSettings]").should("exist");
        cy.get("[data-testId=addSuccessor]").should("exist");
        cy.get("[data-testId=deactivateAccount]").should("exist");
        cy.get("[data-testId=deleteAccount]").should("exist");

    })

    it("Check Social Media", function () {
        cy.visit(`${this.base_url}user-dashboard/profile`);
        cy.wait(2000);
        cy.get("[data-testId=socialMedia]").should("exist").click();
        cy.get("[data-testId=socialMediaPage]").should("exist");
        // cy.wait(2000);
    })
    it("Check Password", function () {
        cy.visit(`${this.base_url}user-dashboard/profile`);
        cy.wait(2000);
        cy.get("[data-testId=password]").should("exist").click();
        cy.get("[data-testId=passwordPage]").should("exist");
        cy.get("[data-testId=oldPassword]").type("oldPassword");
        cy.get("[data-testId=newPassword]").type("newPassword");
        cy.get("[data-testId=confirmPassword]").type("newPassword");
        cy.get("[data-testId=updatePassword]").should("exist");
        cy.get("[data-testId=logout]").should("exist");
        cy.get("[data-testId=logoutOfOtherBrowsers]").should("exist");
        cy.get("[data-testId=loginSecurity]").should("exist");
        cy.get("[data-testId=emailVerification]").should("exist");

        // cy.wait(2000);
    })
    it("Check Organizations", function () {
        cy.visit(`${this.base_url}user-dashboard/profile`);
        cy.wait(2000)

        cy.get("[data-testId=organizations]").should("exist").click();
        cy.get("[data-testId=organizationsPage]").should("exist");
        // cy.wait(2000);
    })
})