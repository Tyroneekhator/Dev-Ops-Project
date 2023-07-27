import React from "react";
import AddRecipe from "../../src/pages/add-recipe";
import { QueryClientProvider, QueryClient } from "react-query";
import { SessionProvider } from "next-auth/react";
const queryClient = new QueryClient();

describe("<AddRecipe />", () => {
  beforeEach("renders", () => {
    cy.mount(
      <SessionProvider>
        <QueryClientProvider client={queryClient}>
          <AddRecipe />
        </QueryClientProvider>
      </SessionProvider>
    );
  });
  it("tests render", () => {
    cy.mount(
      <SessionProvider>
        <QueryClientProvider client={queryClient}>
          <AddRecipe />
        </QueryClientProvider>
      </SessionProvider>
    );
  });
  it("checks no errors are present", () => {
    cy.getByData("title-error").should("not.exist");
    cy.getByData("author_id-error").should("not.exist");
    cy.getByData("course-error").should("not.exist");
    cy.getByData("ingredient-error").should("not.exist");
    cy.getByData("amount-error").should("not.exist");
    cy.getByData("unit-error").should("not.exist");
    cy.getByData("steps-error").should("not.exist");
  });
  it("ensures errors do show when invalid form is submitted", () => {
    cy.getByData("submit-button").click();
    cy.getByData("title-error").should("exist");
    cy.getByData("author_id-error").should("exist");
    cy.getByData("course-error").should("exist");
    cy.getByData("ingredient-error").should("exist");
    cy.getByData("amount-error").should("exist");
    cy.getByData("unit-error").should("exist");
    cy.getByData("steps-error").should("exist");
  });
  it("Populates form and tests buttons", () => {
    cy.getByData("title-input").type("testing title input");
    cy.getByData("title-error").should("not.exist");

    cy.getByData("author_id-input").type("Jeff");
    cy.getByData("author_id-error").should("not.exist");

    cy.getByData("course-input").click().type("starter{enter}");
    cy.getByData("course-error").should("not.exist");

    cy.getByData("country-input").click().type("United Kingdom {enter}");
    cy.getByData("diet-input").click().type("General {enter}");

    // Add ingredients
    cy.getByData("ingredient-input0").type("test");
    cy.getByData("ingredient-error").should("not.exist");
    cy.getByData("amount-input0").type("1");
    cy.getByData("amount-error").should("not.exist");
    cy.getByData("unit-input0").click().type("kg {enter}");
    cy.getByData("unit-error").should("not.exist");

    // Test add ingredient button
    cy.getByData("add-ingredient-button").click();

    // Populate new ingredient fields
    cy.getByData("ingredient-input1").type("test 2");
    cy.getByData("ingredient-error").should("not.exist");
    cy.getByData("amount-input1").type("2");
    cy.getByData("amount-error").should("not.exist");
    cy.getByData("unit-input1").click().type("kg {enter}");
    cy.getByData("unit-error").should("not.exist");

    // Test ingredient remove button
    cy.getByData("remove-ingredient-button1").click();

    cy.getByData("steps-input").type("Test the tests");
    cy.getByData("steps-error").should("not.exist");

    // Submit form
    cy.getByData("submit-button").click();
  });
});
