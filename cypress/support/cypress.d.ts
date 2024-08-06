declare namespace Cypress {
  interface Chainable {
    lauchApp(): Chainable<void>;
    checkPWAHealth(): Chainable<void>;
  }
}
