const { createFilePath } = require(`gatsby-source-filesystem`)
const path = require(`path`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages/blog` })

    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const getPosts = `
    query {
      posts: allMarkdownRemark(
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              title
              date
              description
            }
          }
        }
      }
    }
  `

  const result = await graphql(getPosts)

  if (result.errors)
    return reporter.panicOnBuild(`Error while running GraphQL query.`)

  result.data.posts.edges.forEach(({ node }) => {
    console.log(node.fields.slug)
    createPage({
      path: node.fields.slug,
      component: path.resolve(__dirname, `./src/components/post/post.js`),
      context: {
        slug: node.fields.slug,
      },
    })
  })
}
