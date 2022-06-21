const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const initialValue = 0

  return blogs.reduce((prev, current) => prev + current.likes, initialValue)
}

module.exports = {
  dummy, totalLikes
}