/// <reference types="cypress" />
/**
 * getting rid of this error: index.ts' cannot be compiled under '--isolatedModules' because it is considered a global script file. Add an import, export, or an empty 'export {}' statement to make it a module.
 */
/** notice how I've disabled es-lint using the comment below */
/* eslint-disable */
declare global {
  namespace Cypress {
    interface Chainable {
      getByData(dataTestAttribute: string): Chainable<JQuery<HTMLElement>>;
    }
  }
}

export {};
