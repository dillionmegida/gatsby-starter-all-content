import Layout from "../components/layout/layout"
import { graphql } from "gatsby"
import useMedia from "use-media"
import React, { useCallback, useEffect, useState } from "react"
import Masonry from "react-masonry-css"
import ContentBlock from "../components/content-block/content-block"
import queryString from "query-string"
import { changeWithoutReloading } from "../utils/url"
import SearchInput from "../components/search-input/search-input"

import "./content.scss"
import Seo from "../components/seo"

const COMMON_TAGS = ["all", "gatsby", "node", "javascript", "react", "writing"]

export default function Content({ data, location: { search } }) {
  const isWiderThan800 = useMedia({ minWidth: 1000 })
  const isWiderThan600 = useMedia({ minWidth: 600 })

  const { logrocket, stw, fcc } = data
  const allContent = [logrocket, stw, fcc]
  const allArticlesOnMyWebite = data.allArticlesOnMyWebite.edges

  const [content, setContent] = useState(allContent)
  const [articles, setArticles] = useState(allArticlesOnMyWebite)

  const [activeQuery, setActiveQuery] = useState("")
  const [activeTag, setActiveTag] = useState("all")

  // get the query and tag from the url
  const { tag = null, query = null } = queryString.parse(search)

  const updateParamsUrl = ({ tag = activeTag, query = activeQuery }) => {
    changeWithoutReloading(
      null,
      "",
      "?tag=" + tag + (query.length > 0 ? "&query=" + query : "")
    )
  }

  // on mount, set the active tag and query based on url params
  useEffect(() => {
    if (tag || query) {
      if (tag) setActiveTag(tag)
      if (query) setActiveQuery(query)

      onQuery(query || activeQuery, tag || activeTag)
    }
  }, [])

  // useCallback to avoid re-rendering the function if there isn't a need to
  const onQuery = useCallback(
    (val, tag = activeTag) => {
      if (val === activeQuery && tag === activeTag) return

      const valReg = new RegExp(val, "ig")
      const tagReg = new RegExp(tag, "ig")

      const isActiveTagAll = tag === "all" || !COMMON_TAGS.includes(tag)

      // initialize array for matched content
      const matchedContent = []

      allContent.forEach((c, i) => {
        matchedContent[i] = { edges: [] }
        c.edges.forEach(({ node }, j) => {
          matchedContent[i].edges[j] = { node: { ...node, content: [] } }

          // map through the content array of the platform to match the filter terms
          node.content.forEach((item) => {
            const tagStr = item.tags?.join("")

            if (
              // if the title or tags match the query
              (valReg.test(item.title) || (item.tags && valReg.test(tagStr))) &&
              // and if the title or tags match the tag
              (isActiveTagAll
                ? true
                : tagReg.test(item.title) || tagReg.test(tagStr))
            ) {
              matchedContent[i].edges[j].node.content.push(item)
            }
          })
        })
      })

      setContent(matchedContent)

      // initialize array for matched articles created on this website
      const matchedArticles = allArticlesOnMyWebite.filter(({ node }) => {
        const {
          frontmatter: { title, tags },
        } = node
        const tagsStr = tags?.join("")

        return (
          // if the title or tags match the query
          (valReg.test(title) || valReg.test(tagsStr)) &&
          // and if the title or tags match the tag
          (isActiveTagAll ? true : tagReg.test(title) || tagReg.test(tagsStr))
        )
      })

      setArticles(matchedArticles)
    },
    [activeQuery, activeTag]
  )

  return (
    <Layout>
      <Seo title="All my content" />
      <h1>Content</h1>
      <SearchInput
        commonTags={COMMON_TAGS}
        activeTag={activeTag}
        onClickTag={(tag) => {
          setActiveTag(tag)
          updateParamsUrl({ tag })
          onQuery(activeQuery, tag)
        }}
        onQuery={(val) => {
          setActiveQuery(val)
          updateParamsUrl({ query: val })
          onQuery(val)
        }}
        defaultValue={activeQuery}
      />
      <div className="content-container">
        <Masonry
          breakpointCols={isWiderThan800 ? 3 : isWiderThan600 ? 2 : 1}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {content.map((c) =>
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
  query ContentQuery {
    # queries for all content in /data/content and this website's articles
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
