/// <reference types="cypress" />

//Osobny test dla nauki testów API w Cypress ze wszystkimi parametrami w jednym pliku

const URLs = {
  apiURL1: "https://api.chucknorris.io/jokes/random",
  apiURL2: "https://pokeapi.co/api/v2/pokemon/",
};

const searchedElements = {
  searchedElement1asString: "Chuck",
  searchedElement2: "pikachu",
};

describe("REST API tests using Cypress", () => {
  it("should check status code", () => {
    cy.request(URLs.apiURL1).as("result1");
    cy.request(URLs.apiURL2).as("result2");
    cy.request(URLs.apiURL2 + 25).as("result3"); // zapytanie request aby sprawdzic zmodyfikowany endpoint dla bazowego adresu api

    cy.get("@result1").its("status").should("equal", 200);
    cy.get("@result2").its("status").should("equal", 200);
    cy.get("@result3").its("status").should("equal", 200);
  });

  it("should find searched element", () => {
    cy.request(URLs.apiURL1).as("result1");

    cy.get("@result1")
      .its("body.value")
      .should("contain", searchedElements.searchedElement1asString);
  });

  it("should find searched pokemon", () => {
    cy.request(URLs.apiURL2+"?limit=1350")
      .its("body.results")
      .then((results) => {
        const pokemonNames = results.map((pokemon) => pokemon.name);

        expect(pokemonNames).to.include(searchedElements.searchedElement2);
      });
  });
});
