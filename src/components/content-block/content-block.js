import { Link } from "gatsby"
import React from "react"
import { NewTabLink } from "../../components/Link"

import "./content-block.scss"

function LinkComp({ link, title }) {
  const isExternalLink = link && link.startsWith("http")

  if (isExternalLink) return <NewTabLink link={link}>{title}</NewTabLink>

  return <Link to={link}>{title}</Link>
}

export default function ContentBlock({ heading: { title, link }, items }) {
  return (
    <article className="block">
      <h2>{link ? <LinkComp title={title} link={link} /> : title}</h2>
      <ul className="content-block__items">
        {items.map((i) => (
          <li key={i.title} className="content-block__item">
            <LinkComp link={i.link} title={i.title} />
          </li>
        ))}
      </ul>
    </article>
  )
}
