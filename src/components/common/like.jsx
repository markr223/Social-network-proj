import React from "react";

export default function Like({ liked, onLike, likesCount }) {
  let classes = "fa fa-heart";
  if (!liked) classes += "-o";
  return (
    <div>
      <i
        onClick={onLike}
        style={{ cursor: "pointer", margin: "5px" }}
        className={classes}
        aria-hidden="true"
      />
      {likesCount}
    </div>
  );
}
