import Post from './Post'
const navigate = () => {}
describe("Post", () => {
  it('renders a post with a message', () => {
    cy.mount(<Post navigate={navigate} post={{_id: 1, firstName: "Ted", lastName: "Lasso", content: "Hello, world", likes: []}} />);
    cy.get('[data-cy="post"]').should('contain.text', "Hello, world")
    cy.get('[data-cy="post"]').should('contain.text', "Ted Lasso")
  })
})
