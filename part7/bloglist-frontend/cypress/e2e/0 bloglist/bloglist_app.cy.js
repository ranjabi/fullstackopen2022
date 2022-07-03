describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    // ...
  })
})

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

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('input:first').type('root')
      cy.get('input:last').type('sekret')
      cy.contains('login').click()
      cy.contains('logged-in')
    })

    it('fails with wrong credentials', function() {
      cy.get('input:first').type('test')
      cy.get('input:last').type('test')
      cy.contains('login').click()
      cy.contains('Wrong credentials')
    })
  })

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
  })

  describe('When a blog is created', function () {
    beforeEach(function () {
      cy.get('input:first').type('root')
      cy.get('input:last').type('sekret')
      cy.contains('login').click()
      cy.contains('new blogs').click()
      cy.get('#title').type('the title with the second most likes')
      cy.get('#author').type('author')
      cy.get('#url').type('url')
      cy.get('#create-blog').click()
      cy.contains('the title with the second most likes')
    })

    it('user can like a blog', function () {
      cy.contains('view').click()
      cy.contains('like').click()
    })

    it('user can delete its own blog', function () {
      cy.contains('view').click()
      cy.contains('remove').click()
    })

    it('new blog is on the first order after given 2 likes', function() {
      cy.get('#title').type('the title with the most likes')
      cy.get('#author').type('author')
      cy.get('#url').type('url')
      cy.get('#create-blog').click()
      cy.contains('the title with the most likes by author').parent().find('button').eq(0).click()
      cy.contains('the title with the most likes by author').parent().find('.like-btn').click()
      cy.wait(1000)
      cy.contains('the title with the most likes by author').parent().find('.like-btn').click()
      cy.wait(1000)
      cy.get('.blog').eq(0).should('contain', 'the title with the most likes by author')
      cy.get('.blog').eq(1).should('contain', 'the title with the second most likes by author')
    })

  })
})
