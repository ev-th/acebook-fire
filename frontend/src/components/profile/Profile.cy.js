import Profile from './Profile'
const navigate = () => {}
const useParams = () => {
  return {
    username: 'fakeyfake'
  }
}

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

    cy.mount(<Profile navigate={navigate} params={useParams}/>)

    cy.wait("@getUser").then(() => {
      cy.get('[data-cy="profile"]')
      .should('contain.text', 'Fakey')
      .and('contain.text', 'Fakeson')
      .and('contain.text', 'fakeyfake')
    })
  })

  it("calls /user endpoint and displays all the posts of the user", () => {
    window.localStorage.setItem("token", "fakeToken")

    cy.intercept('GET', '/user?username=fakeyfake', (req) => {
      req.reply({
        statusCode: 200,
        body: {
          user: {
            firstName: "Fakey",
            lastName: "Fakeson",
            userName: "fakeyfake",
          },

          posts: [
            {_id: 1, newPost: "my post 1"}
          ]
        }
      })
    }).as("getPost")


    cy.mount(<Profile navigate={navigate} params={useParams}/>)

    cy.wait("@getPost").then(() => {
      cy.get('[data-cy="post"]')
      .should('contain.text', 'my post 1')
      .and(numberOfRecords).to.eq(1)
    })

  })
})