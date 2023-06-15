import { BrowserRouter as Router } from 'react-router-dom';
import Feed from './Feed';
const navigate = () => {}

describe("Feed", () => {
  it("Calls the /posts endpoint and lists all the posts", () => {
    window.localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjQ4MzFmOTZhNDJmNDk5NjM1MzQ0MWY1IiwiaWF0IjoxNjg2NjUyNTgyLCJleHAiOjM2ODY2NTMxODJ9.N1zZmZBfU4B9o_IFVzHePtkDKTPzprY2TTcUMCSDTxk")

    cy.intercept('GET', '/posts', (req) => {
        req.reply({
          statusCode: 200,
          body: { posts: [
            {_id: 1, content: "Hello, world"},
            {_id: 2, content: "Hello again, world"}
          ] }
        })
      }
    ).as("getPosts")

    cy.mount(
        <Router>
          <Feed navigate={navigate} />
        </Router>
    );
    
    cy.wait("@getPosts").then(() =>{
      cy.get('[data-cy="post"]')
      .should('contain.text', "Hello, world")
      .and('contain.text', "Hello again, world")
    })
  })

  it("lists all the posts in reverse chronological order", () => {
    window.localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjQ4MzFmOTZhNDJmNDk5NjM1MzQ0MWY1IiwiaWF0IjoxNjg2NjUyNTgyLCJleHAiOjM2ODY2NTMxODJ9.N1zZmZBfU4B9o_IFVzHePtkDKTPzprY2TTcUMCSDTxk")
    
    cy.intercept('GET', '/posts', (req) => {
        req.reply({
          statusCode: 200,
          body: { posts: [
            {_id: 1, content: "Hello, world"},
            {_id: 2, content: "Hello again, world"}
          ] }
        })
      }
    ).as("getPosts")

    cy.mount(
      <Router>
        <Feed navigate={navigate} />
      </Router>
  );
    
    cy.wait("@getPosts").then(() =>{
      cy.get('[data-cy="post"]').then( posts => {
        expect(posts[0]).to.contain.text("Hello again, world")
        expect(posts[1]).to.contain.text("Hello, world")
      })
    })
  })

  it("Should post a new post and display on the page", () => {
    window.localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjQ4MzFmOTZhNDJmNDk5NjM1MzQ0MWY1IiwiaWF0IjoxNjg2NjUyNTgyLCJleHAiOjM2ODY2NTMxODJ9.N1zZmZBfU4B9o_IFVzHePtkDKTPzprY2TTcUMCSDTxk")
    cy.mount(
      <Router>
        <Feed navigate={navigate} />
      </Router>
  );
    
    cy.intercept('POST', '/posts', {
      statusCode: 201,
      body: {
        content: 'my new post',
      },
    }).as('postRequest')
    
    cy.get("#post").type("my new post");
    cy.get("#submit").click()
    
    cy.wait('@postRequest').then((interception) => {
      expect(interception.response.statusCode).to.eq(201)
      expect(interception.response.body.content).to.eq('my new post')
    })
  })
  
  it("empties the content of the new post input box when submitted", () => {
    window.localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjQ4MzFmOTZhNDJmNDk5NjM1MzQ0MWY1IiwiaWF0IjoxNjg2NjUyNTgyLCJleHAiOjM2ODY2NTMxODJ9.N1zZmZBfU4B9o_IFVzHePtkDKTPzprY2TTcUMCSDTxk")
    cy.mount(
      <Router>
        <Feed navigate={navigate} />
      </Router>
  );
    
    cy.intercept('POST', '/posts', {
      statusCode: 201,
      body: {
        content: 'my new post',
      },
    }).as('postRequest')
    
    cy.get("#post").type("my new post");
    cy.get("#post").should("have.value", "my new post");

    cy.get("#submit").click();
    cy.get("#post").should("have.value", "");
  })
})