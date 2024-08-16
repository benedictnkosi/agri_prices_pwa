describe("make a booking", () => {
  const apiUrl = Cypress.env('API_URL');
  console.log(apiUrl); 

  it("Should redirect on successful booking @createBooking", () => {
    cy.request(`${apiUrl}/api/products`).then((response) => {
      const products = response.body;

      cy.lauchApp();

      //select product
      cy.contains("span", products[0].name)
          .closest("li") 
          .find("button")
          .click();

      //select customer types
      cy.get('div[cy-tag="customer-type"]')
            .contains(products[0].customerTypes[0].name)
            .should("be.visible").click();

      //select timeslot
      cy.request(`${apiUrl}/api/availability/${products[0].id}`).then((availabilityResponse) => {
        const expectedTimeslots = availabilityResponse.body.dates.map((slot) => ({
          time: slot.date.substring(11, 16),
          price: `£${slot.price.toFixed(2)}`
        }));

        const expectedTime = expectedTimeslots[0].time;
        cy.get('div[cy-tag="time-slot-time"]').eq(0).should("have.text", expectedTime).click();
      });
    });
  });
});