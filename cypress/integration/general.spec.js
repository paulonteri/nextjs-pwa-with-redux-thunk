// GUIDES:
// https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests.html
// https://www.cypress.io/blog/2018/11/14/testing-redux-store/

const API_URL = Cypress.env("API_URL");

describe("Smoke Test", () => {
    it("Smoke Test", () => {
        cy.visit("/");
    });
});
