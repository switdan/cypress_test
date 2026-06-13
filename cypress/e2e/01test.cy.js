/// <reference types="cypress" />
Cypress.config().waitForAnimations = true;

import 'cypress-mochawesome-reporter/register';
import { parametersAccountManager, URLs } from "../fixtures/parameters.js";

describe("Web form verification", () => {
  it("should open web app", () => {
    cy.visit(parametersAccountManager.formURL);
  });

  it("should check UI of main page of form", () => {
    cy.verifyFormUI(
      parametersAccountManager.role,
      parametersAccountManager.subtitleMainPage,
      parametersAccountManager.buttonText,
      parametersAccountManager.linkText,
    );
  });

  it("should register to app", () => {
    cy.registerToApp(
      parametersAccountManager.linkText,
      parametersAccountManager.testedLogin,
      parametersAccountManager.testedPassword,
      parametersAccountManager.setUpAccountButton,
      URLs.registerURL
    );
  });

  it("should login to app", () => {
    cy.loginToApp(
      parametersAccountManager.testedLogin,
      parametersAccountManager.testedPassword,
      parametersAccountManager.buttonText,
      URLs.loginURL
    );
    cy.verifyLoggedUser(
      parametersAccountManager.testedLogin,
      parametersAccountManager.logOutButton,
      URLs.loggedURL
    );
  });

  it("should log out", () => {
     cy.logoutFromApp(
      parametersAccountManager.logOutButton,
      URLs.loginURL
     );
  });
});