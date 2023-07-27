describe("Site interaction Tests", () => {
  beforeEach(() => {
    cy.log(" *Setting 'beforeEach to reload the index page after each test invalidates auth* ")
    cy.log("All tests are run nested within a single test")
    // Reseed database
    cy.request("http://localhost:3000/api/seeder/");
  });

  it("Login, open recipe, add-recipe, submit, Delete", () => {

    cy.log("Logging into via github auth")
    cy.visit("http://localhost:3000/");
    cy.getByData("login-button").click();

    // Wait for github login page to load
    cy.wait(700);
    cy.get("button").click();
    cy.wait(1000);

    // Log into GitHub (using test account)
    cy.origin("https://github.com", () => {
      cy.get("input[id='login_field']").type("com619devops@yahoo.com");
      cy.get("input[id='password']").type("Com619Devops");
      cy.get("input[name='commit']").click();
      cy.wait(3000);
    });

    cy.getByData("recipe-item").contains("Pancakes");
    cy.getByData("open-recipe").eq(0).click();
    cy.wait(2000);

    // Test add-recipe
    cy.log("Adding recipe")
    cy.getByData("add-recipe-button").click();
    // Check errors arent present
    cy.log("Check no errors are present")
    cy.getByData("title-error").should("not.exist");
    cy.getByData("author_id-error").should("not.exist");
    cy.getByData("course-error").should("not.exist");
    cy.getByData("ingredient-error").should("not.exist");
    cy.getByData("amount-error").should("not.exist");
    cy.getByData("unit-error").should("not.exist");
    cy.getByData("steps-error").should("not.exist");

    // Check errors are present with empty fields
    cy.log("Check errors appear as expected")
    cy.getByData("submit-button").click();
    cy.getByData("title-error").should("exist");
    cy.getByData("course-error").should("exist");
    cy.getByData("ingredient-error").should("exist");
    cy.getByData("amount-error").should("exist");
    cy.getByData("unit-error").should("exist");
    cy.getByData("steps-error").should("exist");

    // populate fields
    cy.log("Populate fields")
    cy.getByData("visibility-input").type("public {enter}");
    cy.getByData("title-input").type("testing title input");
    cy.getByData("title-error").should("not.exist");
    cy.getByData("author_id-input").type("Jeff");
    cy.getByData("author_id-error").should("not.exist");

    cy.getByData("course-input").click().type("starter{enter}");
    // cy.getByData("course-error").should("not.exist")

    cy.getByData("country-input").click().type("United Kingdom {enter}");
    cy.getByData("diet-input").click().type("General {enter}");

    // Add ingredients
    cy.log("Adding ingredients")
    cy.getByData("ingredient-input0").type("test");
    // cy.getByData("ingredient-error").should("not.exist")
    cy.getByData("amount-input0").type("1");
    // cy.getByData("amount-error").should("not.exist")
    cy.getByData("unit-input0").click().type("kg {enter}");
    // cy.getByData("unit-error").should("not.exist")

    // Test add ingredient button
    cy.log("Test add ingredient button")
    cy.getByData("add-ingredient-button").click();

    // Populate new ingredient fields
    cy.log("Populate new ingredient fields")
    cy.getByData("ingredient-input1").type("test 2");
    // cy.getByData("ingredient-error").should("not.exist")
    cy.getByData("amount-input1").type("2");
    // cy.getByData("amount-error").should("not.exist")
    cy.getByData("unit-input1").click().type("kg {enter}");
    // cy.getByData("unit-error").should("not.exist")

    // Test ingredient remove button
    cy.log("Test ingredient remove button")
    cy.getByData("remove-ingredient-button1").click();

    cy.getByData("steps-input").type("Test the tests");
    // cy.getByData("steps-error").should("not.exist")

    // Submit form
    cy.log("Submit form")
    cy.getByData("submit-button").click();

    cy.log("Go home")
    cy.visit("http://localhost:3000/");

    // Edit a recipe
    cy.log("Editing a recipe")
    cy.getByData("edit-button").eq(0).click()
    cy.getByData("course-input").click().type("starter{enter}");
    cy.getByData("submit-button").click();
    cy.log("Ensure recipe was updated")
    cy.getByData("edit-success").should("exist")

    cy.log("Go home")
    cy.visit("http://localhost:3000/");

    // Test Delete button
    cy.log("Delete a recipe")
    cy.getByData("delete-button").eq(-1).click();
    cy.getByData("successful-delete").should("exist");

    // Log out
    cy.log("Logging out")
    cy.getByData("logout-button").click();

    // Validate logout was successful
    cy.log("Validate logout was successful")
    cy.getByData("login-button").should("exist");
  });
});

export { };
