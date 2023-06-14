import Post from './Post'

describe("Post", () => {
  it('renders a post with a message', () => {
    cy.mount(<Post post={{_id: 1, firstName: "Ted", lastName: "Lasso", newPost: "Hello, world"}} />);
    cy.get('[data-cy="post"]').should('contain.text', "Hello, world")
    cy.get('[data-cy="post"]').should('contain.text', "Ted Lasso")
  })
})
