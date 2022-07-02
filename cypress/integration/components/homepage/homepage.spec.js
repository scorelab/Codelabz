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

  it("check not logged in user can access homepage", function () {
    cy.visit(this.base_url);
    cy.get("[data-testId=homepage");
  });

  it("check if it can switch between week,month,year", function () {
    cy.visit(this.base_url);
    cy.get("[data-testId=sortByTime");
  });
  it("check main body has atleast one child", function () {
    cy.get("[data-testId=homepageMainBody");
    cy.get("[data-testId=homepageMainBody").should("have.length.at.least", 1);
  });
  it("check tags,popular events,upcoming events and discussion sidebar avaible", function () {
    cy.get("[data-testId=homepageTagSidebar");
    cy.get("[data-testId=homepageDiscussionSidebar");
    cy.get("[data-testId=homepagePopularEventSidebar");
    cy.get( "[data-testId=homepageUpcomingEventSidebar" );
      
  } );
} );

describe( "Sidebar | CodeLabz",() =>
{

    context( '<750p resolution',() =>
    {
        beforeEach( () =>
        {
            cy.viewport( 720,751 )
        } )

        it( 'displays toggle sidebar',() =>
        {
            cy.visit( "http://localhost:3000" );
            cy.wait( 2000 );
            cy.get( '[data-testId=homepageSidebar]' ).should( 'not.exist' )
            cy.get( '[data-testId=homepageSidebarSmall]' ).should( 'exist' )
        } )
    } )
    context( '>750p resolution',() =>
    {
        beforeEach( () =>
        {
            cy.viewport( 1280,751 )
        } )

        it( 'displays desktop sidebar',() =>
        {
            cy.visit( "http://localhost:3000" );
            cy.wait( 2000 );
            cy.get( '[data-testId=homepageSidebar]' ).should( 'exist' )
            cy.get( '[data-testId=homepageSidebarSmall]' ).should( 'not.exist' )
        } )

    } )

} );
