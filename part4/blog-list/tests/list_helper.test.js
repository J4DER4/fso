const { test, describe } = require('node:test')
const assert = require('node:assert')



const listHelper = require('../utils/list_helper.js')

test('dummy returns one', () => {
    const blogs = []
    const result = listHelper.dummy(blogs)
    assert.strictEqual(result, 1)
})

describe('total likes', () => {
    const totalLikes = listHelper.totalLikes

    test('of empty list is zero', () => {
        assert.strictEqual(totalLikes([]), 0)
    })

    test('when list has only one blog equalst he likes of that', () => {
        const blog1 = [
            {
                name: 'test1',
                likes: 3
            }
        ]
        assert.strictEqual(totalLikes(blog1), 3)
    })

    test('of a bigger list is calculated right', () => {
        const blogs = [
            {
                name: 'test1',
                likes: 3
            },
            {
                name: 'test2',
                likes: 5
            },
            {
                name: 'test3',
                likes: 7
            }
        ]
        assert.strictEqual(totalLikes(blogs), 15)
    })

    test('of a list containing a blog with 0 likes', () => {
        const blogs = [
            {
                name: 'test1',
                likes: 3
            },
            {
                name: 'test2',
                likes: 0
            }
        ]
        assert.strictEqual(totalLikes(blogs), 3)
    })

    test('of a list with all blogs having 0 likes', () => {
        const blogs = [
            {
                name: 'test1',
                likes: 0
            },
            {
                name: 'test2',
                likes: 0
            }
        ]
        assert.strictEqual(totalLikes(blogs), 0)
    })

})

describe('favouriteBlog', () => {
    const favouriteBlog = listHelper.favouriteBlog

    test('of empty list return is zero', () => {
        assert.strictEqual(favouriteBlog([]), 0)
    })

    test('when list has only one blog equals the blog', () => {
        const blog1 = [
            {
                name: 'test1',
                likes: 3
            }
        ]
        assert.deepStrictEqual(favouriteBlog(blog1), blog1[0])
    })

    test('of a bigger list is right', () => {
        const blogs = [
            {
                name: 'test1',
                likes: 3
            },
            {
                name: 'test2',
                likes: 5
            },
            {
                name: 'test3',
                likes: 7
            }
        ]
        assert.deepStrictEqual(favouriteBlog(blogs), blogs[2])
    })

})

describe('Author with most blogs (mostBlogs)', () => {
    const mostBlogs = listHelper.mostBlogs

    test('of empty list return is zero', () => {
        assert.deepStrictEqual(mostBlogs([]), 0)
    })

    test('when list has only one blog equals the blog', () => {
        const blog1 = [
            {
                name: 'test1',
                likes: 3
            }
        ]
        const answ = {
            author: 'test1',
            blogs: 1
        }
        assert.deepStrictEqual(mostBlogs(blog1), answ)
    })

    test('many blogs', () => {
        const blogs = [
            {
                name: 'test2',
                likes: 3
            },
            {
                name: 'test1',
                likes: 4
            },
            {
                name: 'test1',
                likes: 3
            },

        ]
        const answ = {
            author: 'test1',
            blogs: 2
        }
        assert.deepStrictEqual(mostBlogs(blogs), answ)
    })
})

describe('Author with most likes (mostLikes)', () => {
    const mostLikes = listHelper.mostLikes

    test('of empty list return is zero', () => {
        assert.deepStrictEqual(mostLikes([]), 0)
    })

    test('when list has only one blog equals the blog', () => {
        const blog1 = [
            {
                name: 'test1',
                likes: 3
            }
        ]
        const answ = {
            author: 'test1',
            likes: 3
        }
        assert.deepStrictEqual(mostLikes(blog1), answ)
    })

    test('many blogs', () => {
        const blogs = [
            {
                name: 'test2',
                likes: 5
            },
            {
                name: 'test1',
                likes: 4
            },
            {
                name: 'test1',
                likes: 3
            },

        ]
        const answ = {
            author: 'test1',
            likes: 7
        }
        assert.deepStrictEqual(mostLikes(blogs), answ)
    })

})
