import Post from './Post'
import { BrowserRouter as Router } from 'react-router-dom';


describe("Post", () => {
  it('renders a post with a message', () => {
    cy.mount(<Router><Post post={{_id: 1, firstName: "Ted", lastName: "Lasso", newPost: "Hello, world"}} /></Router>);
    cy.get('[data-cy="post"]').should('contain.text', "Hello, world")
    cy.get('[data-cy="post"]').should('contain.text', "Ted Lasso")
  })
})
