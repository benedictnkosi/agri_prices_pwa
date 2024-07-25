import { Server } from 'mock-socket';

describe("get products", () => {
  it("all products are displayed", () => {
    cy.request("/api/products").then((response) => {
      const products = response.body;
      expect(products.length).to.eq(4);

      //check that the productts are on the page
      cy.lauchApp();
      products.forEach((product) => {
        cy.get('span[class*="_title"]').contains(product.name).should("exist");

        cy.get('div[class*="_details"] p')
          .contains(product.description)
          .should("exist");

        cy.get('span[class*="_value"]').contains(product.price).should("exist");
      });
    });
  });

  it("The select button works", () => {
    cy.lauchApp();
    cy.get("button").eq(0).contains("Select").click();
    cy.get('li[class*="_selected"]').should("have.length", 1);

    cy.get('li[class*="_container"]').eq(0).invoke('attr', 'class').then((className) => {
      expect(className).to.contain("_selected");
    });

    cy.get("button").eq(1).contains("Select").click();
    cy.get('li[class*="_selected"]').should("have.length", 1);
    cy.get('li[class*="_container"]').eq(1).invoke('attr', 'class').then((className) => {
      expect(className).to.contain("_selected");
    });
  });

  it("should display the correct customer types", () => {
    cy.request("/api/products").then((response) => {
      const products = response.body;

      //check that the customer types are on the page
      cy.lauchApp();
      cy.get("button").eq(0).contains("Select").click();
      cy.get('div[class*="col-md-8"]')
        .contains(products[0].customerTypes[0].name)
        .should("be.visible");
      cy.get('div[class*="col-md-8"]')
        .contains(products[0].customerTypes[1].name)
        .should("be.visible");
      cy.get('div[class*="col-md-8"]')
        .contains(products[0].customerTypes[2].name)
        .should("be.visible");
      cy.get('div[class*="col-md-8"]')
        .contains(products[0].customerTypes[3].name)
        .should("be.visible");

      //select the second product and check that the customer types are on the page
      cy.get("button").eq(0).contains("Select").click();
      cy.get("button").eq(0).contains("Select").click();
      cy.get('div[class*="col-md-8"]')
        .contains(products[0].customerTypes[0].name)
        .should("be.visible");
      cy.get('div[class*="col-md-8"]')
        .contains(products[0].customerTypes[1].name)
        .should("be.visible");
    });
  });
});
