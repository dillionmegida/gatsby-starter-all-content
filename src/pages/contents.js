import Layout from "../components/layout/layout"
import { graphql } from "gatsby"
import useMedia from "use-media"
import React, { useState } from "react"
import Masonry from "react-masonry-css"
import ContentBlock from "../components/content-block/content-block"

import "./contents.scss"

export default function Contents({ data }) {
  const allContents = [data.logrocket, data.stw, data.fcc]
  const allArticlesOnMyWebite = data.allArticlesOnMyWebite.edges

  const [contents, setContents] = useState(allContents)
  const [articles, setArticles] = useState(allArticlesOnMyWebite)

  const isWiderThan800 = useMedia({ minWidth: 1000 })
  const isWiderThan600 = useMedia({ minWidth: 600 })

  console.log({ articles })

  return (
    <Layout>
      <h1>Contents</h1>
      <div className="contents-container">
        <Masonry
          breakpointCols={isWiderThan800 ? 3 : isWiderThan600 ? 2 : 1}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {contents.map((c) =>
            c.edges.map(({ node }) => {
              if (node.content.length < 1) return null

              return (
                <ContentBlock
                  key={node.platform}
                  heading={{ title: node.platform, link: node.link }}
                  items={node.content.map(({ title, link }) => ({
                    title,
                    link,
                  }))}
                />
              )
            })
          )}
          {articles.length < 1 ? null : (
            <ContentBlock
              heading={{ title: "dillionmegida.com", link: "/" }}
              items={articles.map(
                ({
                  node: {
                    frontmatter: { title },
                    fields: { slug },
                  },
                }) => ({ title, link: slug })
              )}
            />
          )}
        </Masonry>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query ContentsQuery {
    logrocket: allLogrocketYaml {
      edges {
        node {
          id
          platform
          link
          content {
            title
            link
            tags
          }
        }
      }
    }
    stw: allStwYaml {
      edges {
        node {
          id
          platform
          link
          content {
            title
            link
            tags
          }
        }
      }
    }
    fcc: allFccYaml {
      edges {
        node {
          id
          platform
          link
          content {
            title
            link
            tags
          }
        }
      }
    }

    allArticlesOnMyWebite: allMarkdownRemark(
      #   filter: { fields: { slug: { regex: "/^(/p/)/" } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          timeToRead
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
