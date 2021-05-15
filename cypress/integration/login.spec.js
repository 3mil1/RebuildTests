describe("Login Test", () => {
  it("can find login form", () => {
    cy.visit("/login");
    cy.get(".Login_form__2mvFD");
    cy.get("#email").click().type("emilvarn@gmail.com");
    cy.get("#password").click().type("1234");
    cy.contains("Sign In").click().click();
    cy.url().should("include", "/profile");
  });
});
