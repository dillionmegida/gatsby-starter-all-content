import { Link } from "gatsby"
import React from "react"
import { AnchorLink, NewTabLink } from "../../components/Link"

import "./content-block.scss"

export default function ContentBlock({ heading: { title, link }, items }) {
  const isExternalLink = link && link.startsWith("http")

  return (
    <article className="block">
      <h2>
        {link ? (
          <>
            {isExternalLink ? (
              <NewTabLink link={link}>{title}</NewTabLink>
            ) : (
              <Link to={link}>{title}</Link>
            )}
          </>
        ) : (
          title
        )}
      </h2>
      <ul className="content-block__items">
        {items.map((i) => (
          <li key={i.title} className="content-block__item">
            <AnchorLink link={i.link}>{i.title}</AnchorLink>
          </li>
        ))}
      </ul>
    </article>
  )
}

