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
      <div className="input-container">
        <input
          type="text"
          placeholder="Search my contents"
          onChange={(e) => onQuery(e.target.value)}
          defaultValue={defaultValue}
        />
      </div>
    </div>
  )
}
