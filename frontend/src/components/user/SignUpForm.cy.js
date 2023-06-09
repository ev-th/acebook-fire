import SignUpForm from './SignUpForm';
import { BrowserRouter as Router } from 'react-router-dom';
const navigate = () => {}

describe("Signing up", () => {
  it("calls the /users endpoint", () => {
    cy.mount(
      <Router>
        <SignUpForm navigate={navigate} />
      </Router>
    );

    cy.intercept('POST', '/users', { message: "OK" }).as("signUpRequest")

    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#firstName").type("test");
    cy.get("#lastName").type("testson");
    cy.get("#userName").type("testy");
    cy.get("#submit").click();
    cy.wait('@signUpRequest').then( interception => {
      expect(interception.response.body.message).to.eq("OK")
    })
  })
  it("does not call the /users endpoint if a field is empty", () => {
    cy.mount(
      <Router>
        <SignUpForm navigate={navigate} />
      </Router>
    );

    cy.intercept('POST', '/users', { message: "TEST" }).as("signUpRequest")

    cy.get("#email").type("someone@example.com");
    cy.get("#firstName").type("test");
    cy.get("#lastName").type("testson");
    cy.get("#userName").type("testy");
    cy.get("#submit").click();
    cy.wait('@signUpRequest').then( interception => {
      expect(interception.response.body.message).to.eq("TEST")
    })
  })
  it("contains the error message in an alert box", () => {
    cy.mount(
      <Router>
        <SignUpForm navigate={navigate}/>
      </Router>
    );

    cy.intercept('POST', '/users', { message: "TEST" }).as("signUpRequest")

    cy.get("#email").type("someone@example.com");
    cy.get("#firstName").type("test");
    cy.get("#lastName").type("testson");
    cy.get("#userName").type("testy");
    cy.get("#submit").click();
    cy.wait('@signUpRequest')
    cy.on('window:alert', (message) => {
      expect(message).to.contain("TEST"); 
    });
  })
})
