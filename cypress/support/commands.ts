/// <reference types="cypress" />

import { checkHealth, runHealthCheckAfterShutdown } from "./PWAHealthCheck";

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

Cypress.Commands.add("lauchApp", () => {
  cy.visit("/", {
    onBeforeLoad: (win) => {
      cy.stub(win, "WebSocket").callsFake((url) => {
        return new WebSocket(url); // mock socket
      });
    },
  });
});

Cypress.Commands.add("checkPWAHealth", () => {
  const host = `${process.env.HOST}/`;
  if (host.includes("sit")) {
    runHealthCheckAfterShutdown().catch((error) => {
      console.error("An unexpected error occurred during shutdown:", error);
      process.exit(1);
    });
  } else {
    checkHealth(host, 120, 5000).catch((error) => {
      console.error("An unexpected error occurred:", error);
      process.exit(1);
    });
  }
});
