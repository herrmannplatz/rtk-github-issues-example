/// <reference types="cypress" />

context('List', () => {
  it('should render issues list', () => {
    cy.server()
    cy.route('**/issues**', 'fx:issues-response.json').as('getIssues')

    cy.visit('/')

    cy.wait('@getIssues').then((xhr) => {
      const issues = xhr.response.body

      cy.findAllByTestId('list-item').each(($listItem, index) => {
        const issue = issues[index]

        cy.wrap($listItem).within(() => {
          cy.findByRole('link', { name: issue.user.login })
            .should('have.attr', 'href', issue.user.html_url)
            .within(() => {
              cy.findByRole('img').should('have.attr', 'src', issue.user.avatar_url)
              cy.findByText(issue.user.login).should('exist')
            })
        })
      })
    })
  })
})
