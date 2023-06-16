import CommentList from "./commentList";

describe( "CommentList", ()=> {
  it('renders a list of comments with a message', () => {
    cy.mount(
      <CommentList
        comment={"1st Comment" }
      />
    );
    cy.get('[data-cy="comment"]').should('contain.text', "1st Comment");
  })
});
