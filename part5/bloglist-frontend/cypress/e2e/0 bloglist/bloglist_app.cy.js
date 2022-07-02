// describe('Blog app', function() {
//   beforeEach(function() {
//     cy.request('POST', 'http://localhost:3003/api/testing/reset')
//     cy.visit('http://localhost:3000')
//   })

//   it('Login form is shown', function() {
//     // ...
//   })
// })

describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      username: 'root',
      password: 'sekret',
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('log in to application')
  })

  // describe('Login',function() {
  //   it('succeeds with correct credentials', function() {
  //     cy.get('input:first').type('root')
  //     cy.get('input:last').type('sekret')
  //     cy.contains('login').click()
  //     cy.contains('logged in')
  //   })

  //   it('fails with wrong credentials', function() {
  //     cy.get('input:first').type('test')
  //     cy.get('input:last').type('test')
  //     cy.contains('login').click()
  //     cy.contains('Wrong credentials')
  //   })
  // })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.get('input:first').type('root')
      cy.get('input:last').type('sekret')
      cy.contains('login').click()
    })

    it('A blog can be created', function () {
      cy.contains('new blogs').click()
      cy.get('#title').type('title')
      cy.get('#author').type('author')
      cy.get('#url').type('url')
      cy.get('#create-blog').click()
      cy.contains('title by author')
    })

    it('user can like a blog', function () {
      cy.contains('new blogs').click()
      cy.get('#title').type('title')
      cy.get('#author').type('author')
      cy.get('#url').type('url')
      cy.get('#create-blog').click()
      cy.contains('title by author')
      cy.contains('view').click()
      cy.contains('like').click()
    })
  })
})
