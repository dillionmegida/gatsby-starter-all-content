import Layout from "../components/layout/layout"
import { graphql } from "gatsby"
import useMedia from "use-media"
import React, { useCallback, useEffect, useState } from "react"
import Masonry from "react-masonry-css"
import ContentBlock from "../components/content-block/content-block"
import queryString from "query-string"
import { changeWithoutReloading } from "../utils/url"
import SearchInput from "../components/search-input/search-input"

import "./contents.scss"

const COMMON_TAGS = ["all", "gatsby", "node", "javascript", "react", "writing"]

export default function Contents({ data, location: { search } }) {
  const isWiderThan800 = useMedia({ minWidth: 1000 })
  const isWiderThan600 = useMedia({ minWidth: 600 })

  const { logrocket, stw, fcc } = data
  const allContents = [logrocket, stw, fcc]
  const allArticlesOnMyWebite = data.allArticlesOnMyWebite.edges

  const [contents, setContents] = useState(allContents)
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

  const onQuery = useCallback(
    (val, tag = activeTag) => {
      if (val === activeQuery && tag === activeTag) return

      const valReg = new RegExp(val, "ig")
      const tagReg = new RegExp(tag, "ig")

      const isActiveTagAll = tag === "all" || !COMMON_TAGS.includes(tag)

      const matchedContents = []

      allContents.forEach((c, i) => {
        matchedContents[i] = { edges: [] }
        c.edges.forEach(({ node }, j) => {
          matchedContents[i].edges[j] = { node: { ...node, content: [] } }

          node.content.forEach((item) => {
            const tagStr = item.tags?.join("")

            if (
              (valReg.test(item.title) || (item.tags && valReg.test(tagStr))) &&
              (isActiveTagAll
                ? true
                : tagReg.test(item.title) || tagReg.test(tagStr))
            ) {
              matchedContents[i].edges[j].node.content.push(item)
            }
          })
        })
      })

      setContents(matchedContents)

      const matchedArticles = allArticlesOnMyWebite.filter(({ node }) => {
        const {
          frontmatter: { title, tags },
        } = node
        const tagsStr = tags?.join("")

        return (
          (valReg.test(title) || valReg.test(tagsStr)) &&
          (isActiveTagAll ? true : tagReg.test(title) || tagReg.test(tagsStr))
        )
      })

      setArticles(matchedArticles)
    },
    [activeQuery, activeTag]
  )

  return (
    <Layout>
      <h1>Contents</h1>
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
