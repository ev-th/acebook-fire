import { BrowserRouter as Router } from 'react-router-dom';
import Profile from './Profile';
const navigate = () => {}
const useParams = () => {
  return {
    username: "fakeyfake",
  };
};

describe("Profile", () => {
  it("Calls the /user endpoint and shows the name and username", () => {
    window.localStorage.setItem("token", "fakeToken")

    cy.intercept('GET', '/user?username=fakeyfake', (req) => {
        req.reply({
          statusCode: 200,
          body: {
            user: {
              firstName: "Fakey",
              lastName: "Fakeson",
              userName: "fakeyfake",
            }
          }
        })
      }
    ).as("getUser")

    cy.mount(
    <Router>
    <Profile navigate={navigate} params={useParams} />
    </Router>
  );


    cy.wait("@getUser").then(() => {
      cy.get('[data-cy="profile"]')
        .should("contain.text", "Fakey")
        .and("contain.text", "Fakeson")
        .and("contain.text", "fakeyfake");
    });
  });

  it("calls /user endpoint and displays all the posts of the user", () => {
    window.localStorage.setItem("token", "fakeToken");

    cy.intercept("GET", "/user?username=fakeyfake", (req) => {
      req.reply({
        statusCode: 200,
        body: {
          user: {
            userId: 123,
            firstName: "Fakey",
            lastName: "Fakeson",
            userName: "fakeyfake",
          },
        },
      });
    }).as("getUser");

    cy.intercept("GET", "/posts", (req) => {
      req.reply({
        statusCode: 200,
        body: {
          posts: [
            { _id: 1, content: "my post 1", userId: 123 },
            { _id: 2, content: "Test post shouldnt show", userId: 456 },
          ],
        },
      });
    }).as("getPost");

    cy.mount(
      <Router>
        <Profile navigate={navigate} params={useParams} />
      </Router>
    );

    cy.wait("@getUser").then(() => {
      cy.wait("@getPost").then((response) => {
        cy.get('[data-cy="post"]')
          .should("contain.text", "my post 1")
          .should("not.contain.text", "Test post shouldnt show");
      });
    });
  });
});
