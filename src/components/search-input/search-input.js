import React from "react"

import "./search-input.scss"

export default function SearchInput({
  onQuery,
  commonTags,
  activeTag,
  onClickTag,
  defaultValue,
}) {
  return (
    <div className="search-container">
      <div className="tags-container">
        {commonTags.map((tag, i) => (
          <button
            onClick={() => onClickTag(tag)}
            className={"set-btn " + (activeTag === tag ? "active" : "")}
            key={tag + "-" + i}
          >
            #{tag}
          </button>
        ))}
      </div>
      <form className="input-container">
        <label htmlFor="query" hidden>
          Search query
        </label>
        <input
          type="text"
          id="query"
          placeholder="Search my content"
          onChange={(e) => onQuery(e.target.value)}
          defaultValue={defaultValue}
        />
      </form>
    </div>
  )
}
