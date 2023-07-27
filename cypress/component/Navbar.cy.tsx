import { SessionProvider } from "next-auth/react";
import React from "react";
import Navbar from "../../src/components/Navbar";

describe("Test <Navbar />", () => {
  beforeEach("Render Navbar", () => {
    cy.mount(
      <SessionProvider>
        <Navbar />
      </SessionProvider>
    );
  });
  it("Tests navbar buttons/links", () => {
    cy.contains("Home");
    cy.contains("Browse Recipes");
    cy.contains("Search");
    cy.contains("Settings");
    cy.contains("Log in");
  });
});
