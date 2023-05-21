import React from "react";
import {LikeOutlined, LikeFilled} from "@ant-design/icons";

export default function Like({ liked, onLike, likesCount }) {
  return (
    <div className="like-container">
      { !liked ? 
        <LikeOutlined 
          onClick={onLike}
          className="like-icon"
          aria-hidden="true"
        />
        :
        <LikeFilled
          onClick={onLike}
          className="like-icon"
          aria-hidden="true"
        />
      }
      {likesCount}
    </div>
  );
}
