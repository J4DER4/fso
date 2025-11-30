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

const mostBlogs = (blogs) => { //return the author that has most blogs
    if (blogs.length === 0) {
        return 0
    }

    //native js version
    // const counts = blogs.reduce((acc, blog) => {
    //     acc[blog.name] = (acc[blog.name] || 0) + 1
    //     return acc
    // }, {})
    // const max = Object.entries(counts).reduce((acc, cur) => {
    //     return cur[1] > acc[1] ? cur : pref;
    //
    // }, ['', 0])
    //
    // return { author: max[0], blogs: max[1] }

    //Lodash version
    const { countBy, maxBy, toPairs, groupBy } = require('lodash')

    const authorCounts = countBy(blogs, 'name')
    const mostBlogsEntry = maxBy(toPairs(authorCounts), ([author, blogs]) => blogs)

    return { author: mostBlogsEntry[0], blogs: mostBlogsEntry[1] }


}
const mostLikes = (blogs) => {
    const { groupBy, map, maxBy, sumBy } = require('lodash')
    if (blogs.length === 0) {
        return 0
    }
    const blogsByAuthor = groupBy(blogs, 'name')

    const authorLikes = map(blogsByAuthor, (authorBlogs, name) =>
    ({
        author: name,
        likes: sumBy(authorBlogs, 'likes')
    }))
    return maxBy(authorLikes, 'likes')
}

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs,
    mostLikes
}
