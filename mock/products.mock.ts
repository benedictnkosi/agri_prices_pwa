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
        },
        {
          id: "id2",
          name: "test product two",
          description: "lorem ipsum",
          price: 32,
        },
      ];
      res.setHeader("Content-Type", "application/json");
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.end(JSON.stringify(data));
    },
  },
];
