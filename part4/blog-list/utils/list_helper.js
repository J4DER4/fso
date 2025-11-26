const dummy = (blogs) => {
    return 1
}
const totalLikes = (blogs) => {
    if (blogs.length === 0) {
        return 0
    }

    const reducer = (sum, blog) => {
        return sum + blog.likes
    }
    return blogs.reduce(reducer, 0)
}
const favouriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return 0
    }

    var best = blogs[0]
    for (var blog of blogs) {
        if (blog.likes > best.likes) {
            best = blog
        }
    }
    return best
}

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog
}
