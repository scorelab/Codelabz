
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

        it( "Testing User Card",() =>
        {
            cy.get( "[data-testId=UsersCardImg]" ).should( "exist" );
            cy.get( "[data-testId= UsersCard]" ).should( "exist" );
            cy.get( "[data-testId= UsersCardTitle]" ).should( "exist" );
            cy.get( "[data-testId=UserName]" ).should( "exist" );
            cy.get( "[data-testId= UserDesg]" ).should( "exist" );
            cy.get( "[data-testId= UserAdd]" ).should( "exist" );
        } )

        it( "Testing Upcoming Event Card",() =>
        {
            cy.get( "[data-testId=upcomingEventCard]" ).should( "exist" );
            cy.get( "[data-testId= upEventImg]" ).should( "exist" );
            cy.get( "[data-testId= upEventName]" ).should( "exist" );
            cy.get( "[data-testId=upEventDate]" ).should( "exist" );
            cy.get( "[data-testId=upEventBox]" ).should( "exist" );
        } )

        it( "Testing Tags Card",() =>
        {
            cy.get( "[data-testId=TagsCard]" ).should( "exist" );
            cy.get( "[data-testId=TagsCardTitle]" ).should( "exist" );
            cy.get( "[data-testId= TagsChip]" ).should( "exist" );
        } )

    } );
   
} );