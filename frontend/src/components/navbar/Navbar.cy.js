import React from 'react';
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter

import Navbar from './Navbar';

describe("Navbar", () => {
  it('displays the logo', () => {
    cy.mount(
      <MemoryRouter> {/* Use MemoryRouter instead of Router */}
        <Navbar />
      </MemoryRouter>
    );

    cy.get('[data-cy="navbar"]').should('contain.text', "Acebook");
  });
});