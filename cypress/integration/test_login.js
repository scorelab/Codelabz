describe("Login Test | CodeLabz", () => {
  it("Login Test - Passing", () => {
    cy.visit("http://localhost:3000");
    cy.get(".ant-btn-link > a").click();
    cy.get("#email").type("seniyaklop23@gmail.com");
    cy.get("#password").type("12345678");
    cy.get(".ant-form-item-control-input-content > .ant-btn").click();
    cy.get(".ant-avatar").click();
    cy.get("#item_0\\$Menu > .ant-menu-item").click();
  });

  it("Login Test - Failing", () => {
    cy.visit("http://localhost:3000");
    cy.get(".ant-btn-link > a").click();
    cy.get("#email").type("seniyaklop23@gmail.com");
    cy.get("#password").type("123456789");
    cy.get(".ant-form-item-control-input-content > .ant-btn").click();
    cy.get(".ant-avatar").click();
    cy.get("#item_0\\$Menu > .ant-menu-item").click();
  });
});
