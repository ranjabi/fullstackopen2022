import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../components/Blog'
import BlogForm from '../components/BlogForm'

test('renders content', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    url: 'url',
    likes: 0,
    author: 'doraemon',
  }

  render(<Blog blog={blog} />)

  // screen.debug()

  const title = screen.getByText(
    'Component testing is done with react-testing-library'
  )
  const author = screen.getByText('doraemon')

  expect(title).toBeDefined()
  expect(author).toBeDefined()
})

describe('detail content', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    url: 'url',
    likes: 0,
    author: 'doraemon',
  }
  let container

  beforeEach(() => {
    container = render(<Blog blog={blog} />).container
  })

  test('at start the children are not displayed', () => {
    const div = container.querySelector('.detailContent')
    expect(div).toHaveStyle('display: none')
  })

  test('after clicking the button, children are displayed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const div = container.querySelector('.detailContent')
    expect(div).not.toHaveStyle('display: none')
  })
})

test('clicking the likes button calls event handler twice', async () => {
  const blog = {
    title: 'title1',
    url: 'url1',
    author: 'author1',
    id: '62b6e9974d87fcf2a1180b24',
    user: {
      id: '62b6e5bbb7f575ba968aa8ab',
    },
  }

  const mockHandler = jest.fn()

  render(<Blog blog={blog} handleLike={mockHandler} />)

  const user = userEvent.setup()
  const view = screen.getByText('view')
  await user.click(view)
  const button = screen.getByText('like')
  await user.click(button)
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
})

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const createBlog = jest.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog} />)

  screen.debug()

  const titleInput = screen.getByPlaceholderText('the title')
  const authorInput = screen.getByPlaceholderText('the author')
  const urlInput = screen.getByPlaceholderText('the url')
  const sendButton = screen.getByText('create')

  await user.type(titleInput, 'testing a form titleInput...')
  await user.type(authorInput, 'testing a form authorInput...')
  await user.type(urlInput, 'the url')
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe(
    'testing a form titleInput...'
  )
  expect(createBlog.mock.calls[0][0].author).toBe(
    'testing a form authorInput...'
  )
  expect(createBlog.mock.calls[0][0].url).toBe(
    'the url'
  )
})
