import React from "react"
import { graphql } from "gatsby"
import Layout from "../layout/layout"
import Seo from "../seo"

import "./post.scss"
import { pluralize } from "../../utils/string"

export default function Post({ data }) {
  const { post } = data

  const {
    timeToRead,
    frontmatter: { title, date },
    html,
  } = post

  return (
    <Layout>
      <Seo title={title} />
      <article className="post">
        <h1 className="post__title">{title}</h1>
        <span className="post__date">
          {date} - {timeToRead} {pluralize(timeToRead, "min")} read
        </span>
        <div className="post__content">
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </article>
    </Layout>
  )
}

export const query = graphql`
  query ($slug: String!) {
    post: markdownRemark(fields: { slug: { eq: $slug } }) {
      fields {
        slug
      }
      html
      timeToRead
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`
