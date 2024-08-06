describe("get availability", () => {
  const apiUrl = Cypress.env('API_URL');
  console.log(apiUrl); 

  before(() => {
    // Check the health of the PWA
    cy.checkPWAHealth();
  });

  it("Should display available timeslots for a product @integration", () => {
    const expectedTimeslots = [
      { time: "16:00", price: "£25.00" },
      { time: "16:20", price: "£25.00" },
      { time: "16:40", price: "£25.00" },
      { time: "17:00", price: "£25.00" },
      { time: "17:20", price: "£25.00" },
      { time: "17:40", price: "£25.00" },
      { time: "18:00", price: "£25.00" }
    ];

    cy.request(`${apiUrl}/api/products`).then((response) => {
      const products = response.body;

      cy.lauchApp();
   
      cy.contains("span", products[0].name) // Find the span with the specific text
        .closest("li") 
        .find("button")
        .click();
  
      cy.get('div[cy-tag="time-slots"]').each(($el, index) => {
        console.log("Index : " + index);
        const expectedTime = expectedTimeslots[index].time;
        const expectedPrice = expectedTimeslots[index].price;
  
        // Verify the time, comment to check the pipeline
        cy.wrap($el).find('div[cy-tag="time-slot-time"]').should("have.text", expectedTime);
        // Verify the price
        cy.wrap($el).find('div[cy-tag="time-slot-price"]').should("have.text", expectedPrice);
      });
    });

    
  });

  it("Should display message when there are no timeslots", () => {
    cy.lauchApp();
    cy.contains("span", "No timeslots found") // Find the span with the specific text
      .closest("li") // Find the closest ancestor li element
      .find("button") // Find the button within this li
      .click();
    cy.get(".fade").should("contain", "No timeslots found. Please try again.");
  });

  it("Should display message when there is an error getting timeslots", () => {
    cy.lauchApp();
    cy.contains("span", "Error for timeslots") // Find the span with the specific text
      .closest("li") // Find the closest ancestor li element
      .find("button") // Find the button within this li
      .click();
    cy.get(".fade").should("contain", "There was an error getting timeslots information. Please try again.");
  });
});
