
describe( "Card-Tabs | CodeLabz",() =>
{
    context( "Testing all Card Tabs",() =>
    {
        beforeEach( () =>
        {
            cy.viewport( 1280,751 );
            cy.visit( "http://localhost:3000" );
        } );

        it( "displays all card-tabs",() =>
        {
            cy.get( "[data-testId=homepageTagSidebar]" ).should( "exist" );
            cy.get( "[data-testId=homepageUpcomingEvents]" ).should( "exist" );
            cy.get( "[data-testId=homepageUsersToFollow]" ).should( "exist" );
            cy.get( "[data-testId=homepageContributors]" ).should( "exist" );
        } );

    } );
   
} );