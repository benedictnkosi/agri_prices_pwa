describe("loading tests", () => {
  it("load 1", () => {
    cy.lauchApp();

    cy.get('span[class*="_title"]')
      .contains("test product two")
      .should("exist");
  });

  it("load 2", () => {
    cy.lauchApp();
    cy.get('span[class*="_title"]')
      .contains("test product two")
      .should("exist");
  });

  it("load 3", () => {
    cy.lauchApp();
    cy.get('span[class*="_title"]')
      .contains("test product two")
      .should("exist");
  });
});
