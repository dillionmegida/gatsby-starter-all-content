import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout/layout"
import Seo from "../components/seo"

import "./index.scss"

const DESC_LENGTH = 150

export default function Home({ data }) {
  return (
    <Layout>
      <Seo title="All posts" />
      <h1>Blog</h1>
      <ul className="posts">
        {data.posts.edges.map(({ node }) => {
          const { title, date, description } = node.frontmatter
          const { slug } = node.fields

          return (
            <li className="post" key={node.id}>
              <Link to={slug}>
                <span className="post__title">{title}</span>
                <span className="post__date">{date}</span>
                <p className="post__desc">
                  {description.length > DESC_LENGTH
                    ? description.substring(0, DESC_LENGTH) + "..."
                    : description}
                </p>
              </Link>
            </li>
          )
        })}
      </ul>
    </Layout>
  )
}

export const query = graphql`
  query {
    posts: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            description
            date(formatString: "MMMM DD, YYYY")
          }
          fields {
            slug
          }
        }
      }
    }
  }
`
