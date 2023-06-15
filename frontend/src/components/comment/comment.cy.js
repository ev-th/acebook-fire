import Comment from "./comment";
import { BrowserRouter as Router } from 'react-router-dom';


describe( "Comment", ()=> {
  it('renders a comment with content', () => {
    const comment = {_id: "123", userId: "12345", content: "some test content"}
    
    cy.mount(
      <Router>
        <Comment comment={comment}/>
      </Router>
    );
    
    cy.get('[data-cy="comment"]').should('contain.text', "some test content");
  })

  xit('renders a comment with a name', () => {}
}