import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout/layout"
import Seo from "../components/seo"
import { pluralize } from "../utils/string"

import "./index.scss"

const DESC_LENGTH = 150

export default function Home({ data }) {
  return (
    <Layout>
      <Seo title="All posts" />
      <h1>Blog</h1>
      <div className="posts">
        {data.posts.edges.map(({ node }) => {
          const {
            frontmatter: { title, date, description },
            fields: { slug },
            id,
            timeToRead,
          } = node

          return (
            <article className="post-card" key={id}>
              <Link to={slug}>
                <span className="post-card__title">{title}</span>
                <span className="post-card__date">
                  {date} - {timeToRead} {pluralize(timeToRead.length, "min")}{" "}
                  read
                </span>
                <p className="post-card__desc">
                  {description.length > DESC_LENGTH
                    ? description.substring(0, DESC_LENGTH) + "..."
                    : description}
                </p>
              </Link>
            </article>
          )
        })}
      </div>
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
          timeToRead
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
