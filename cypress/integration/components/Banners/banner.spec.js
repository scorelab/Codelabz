describe("Banner-Profile | Codelabz", () => {
  context("Testing Profile banners", () => {
    beforeEach(() => {
      cy.viewport(1280, 751);
    });

    it("Testing Organization Banner", () => {
      cy.visit(
        `http://localhost:6006/?path=/story/profilebanner-banner--profile-banner`
      );
      cy.wait(8000);
      cy.get("[data-testId=orgprofilebanner]").should("exist");
      cy.get("[data-testId= orgbannerimg]").should("exist");
      cy.get("[data-testId= orgbanneravatar]").should("exist");
      cy.get("[data-testId=orgbannername]").should("exist");
      cy.get("[data-testId= orgbannerstory]").should("exist");
      cy.get("[data-testId= orgbannercontributorCount]").should("exist");
      cy.get("[data-testId= orgbannerfollowerCount]").should("exist");
      cy.get("[data-testId= orgbannerfeedCount]").should("exist");
      cy.get("[data-testId= orgbannersubscribeButton]").should("exist");
    });

    it("Testing User Profile Card One", () => {
      cy.visit(
        `http://localhost:6006/?path=/story/profilebanner-profilecardone--profile-card`
      );
      cy.wait(3000);
      cy.get("[data-testId=userprofilecardone]").should("exist");
      cy.get("[data-testId= userprofilecardoneavatar]").should("exist");
      cy.get("[data-testId= userprofilecardonename]").should("exist");
      cy.get("[data-testId=userprofilecardonestory]").should("exist");
      cy.get("[data-testId=userprofilecardonefollwerCount]").should(
        "exist"
      );
      cy.get("[data-testId=userprofilecardonefollowingCount]").should(
        "exist"
      );
      cy.get("[data-testId=userprofilecardonebuttonGroup]").should("exist");
      cy.get(
        "[data-testId=userprofilecardonebuttonGroupfollowButton]"
      ).should("exist");
    });

    it("Testing User Profile Card Two", () => {
      cy.visit(
        `http://localhost:6006/?path=/story/profilebanner-profilecardtwo--profile-card`
      );
      cy.wait(3000);
      cy.get("[data-testId=userprofilecardtwo]").should("exist");
      cy.get("[data-testId=userprofilecardtwoavatar]").should("exist");
      cy.get("[data-testId= userprofilecardtwoname]").should("exist");
      cy.get("[data-testId= userprofilecardtwocontributorCount]").should(
        "exist"
      );
      cy.get("[data-testId= userprofilecardtwofollowerCount]").should(
        "exist"
      );
    });

    it("Testing User Profile Card Three", () => {
      cy.visit(
        `http://localhost:6006/?path=/story/profilebanner-profilecardthree--profile-card`
      );
      cy.wait(3000);
      cy.get("[data-testId=userprofilecardthree]").should("exist");
      cy.get("[data-testId=userprofilecardthreeavatar]").should("exist");
      cy.get("[data-testId= userprofilecardthreename]").should("exist");
      cy.get("[data-testId= userprofilecardthreestory]").should("exist");
      cy.get("[data-testId= userprofilecardthreeworkInfo]").should("exist");
      cy.get("[data-testId= userprofilecardthreelocationInfo]").should(
        "exist"
      );
      cy.get("[data-testId= userprofilecardthreejoiningDateInfo]").should(
        "exist"
      );
    });
  });
});
