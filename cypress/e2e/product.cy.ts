import { checkPWAHealth } from "../support/PWAHealthCheck";

describe("get products", () => {
  const apiUrl = Cypress.env('API_URL');
  console.log(apiUrl); 

  before(() => {
    // Check the health of the PWA
    checkPWAHealth();
  });

  it("all products are displayed @integration", () => {
    cy.request(`${apiUrl}/api/products`).then((response) => {
      const products = response.body;
      //check that the productts are on the page
      cy.lauchApp();
      products.forEach((product) => {
        cy.get('span[cy-tag="product-name"]').contains(product.name).should("exist");

        cy.get('p[cy-tag="product-description"]')
          .contains(product.description)
          .should("exist");

        cy.get('span[cy-tag="product-price"]').contains(product.price).should("exist");
      });
    });
  });

  it("The select button works @integration", () => {
    cy.lauchApp();
    //only run this test if there is a product that is not selected. more than one products
    if (cy.get("button").eq(0).contains("Select").should("exist")) {
      cy.get("button").eq(0).contains("Select").click();
      cy.get('li[class*="_selected"]').should("have.length", 1);
    }
  });

  it("should display the correct customer types @integration", () => {
    cy.request(`${apiUrl}/api/products`).then((response) => {
      const products = response.body;

      // Launch the app
      cy.lauchApp();

      // Iterate over each product
      products.forEach((product, index) => {
        // Click the "Select" button for each product
        cy.get("button").eq(index).contains("Select").click();

        // Check that the customer types are on the page for each product
        product.customerTypes.forEach((customerType) => {
          cy.get('div[cy-tag="customer-type"]')
            .contains(customerType.name)
            .should("be.visible");
        });
      });
    });
  });
});
