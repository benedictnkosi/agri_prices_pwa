import { MockHandler } from "vite-plugin-mock-server";

export default (): MockHandler[] => [
  {
    pattern: "/api/products",
    handle: (req, res) => {
      const data = [
        {
          id: "id1",
          name: "Standard ticket",
          description:
            "Entry to Sea life Brighton aquarium with entrance at a chosen 10 minutes time slot",
          price: 25,
          currencySymbol: "£",
          customerTypes: [
            {
              id: 1162,
              name: "Adult (15+ Years)",
              price: 25,
            },
            {
              id: 1163,
              name: "Child (3-14 Years)",
              price: 22,
            },
            {
              id: 232,
              name: "Under 3",
              price: 0,
            },
            {
              id: 247,
              name: "Carer",
              price: 0,
            },
          ],
        },
        {
          id: "id2",
          name: "test product two",
          description: "lorem ipsum",
          price: 32,
          currencySymbol: "£",
          customerTypes: [
            {
              id: 1162,
              name: "Adult (17+ Years)",
              price: 25,
            },
            {
              id: 1163,
              name: "Child (2-17 Years)",
              price: 22,
            },
          ],
        },
      ];
      res.setHeader("Content-Type", "application/json");
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.end(JSON.stringify(data));
    },
  },
  {
    pattern: "/api/availability/*",
    handle: (req, res) => {
      const data = {
        productId: 600000676,
        dates: [
          { date: "2024-07-19T16:00", price: 25 },
          { date: "2024-07-19T16:20", price: 25 },
          { date: "2024-07-19T16:40", price: 25 },
          { date: "2024-07-19T17:00", price: 25 },
          { date: "2024-07-19T17:20", price: 25 },
          { date: "2024-07-19T17:40", price: 25 },
          { date: "2024-07-19T18:00", price: 25 },
        ],
      };
      res.setHeader("Content-Type", "application/json");
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.end(JSON.stringify(data));
    },
  },
];
