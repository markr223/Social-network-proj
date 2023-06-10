import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Collapse, Card, Space, Avatar, Button, Divider } from 'antd';
import * as consts from "../../consts/consts";
import CommentAndLikes from "./commentAndLikes";
import { UserOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";

export default function Post(props) {
  const [likeData] = useState({
    date: consts.currentDate,
    userId: props.currentUser.id,
    postId: props.postId
  });
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [comments, setComments] = useState([]);

  const getcomments = async () => {
    const {postId} = props
    try {
      const { data } = await axios.get(consts.serverURI + "/api/Comment/GetPostComments/" + postId, consts.defaultConfig)
      setComments(data);
    } catch (ex) {
      toast.error("failed get comments");
    }
    
  }
  const getLikes = async () => {
    const {currentUser} = props;
    try {
      const { data } = await axios.get(
        consts.serverURI + "/api/Like/GetLikes/" + likeData.postId,
        consts.defaultConfig
      );
      for (let postLikes of data)
        if (postLikes.userId === currentUser.id)
          setLiked(true);
      setLikesCount(data.length);
    } catch (ex) {
      toast.error("failed to get the likes");
    }
  };

  useEffect(() => {
    getLikes();
    getcomments();
  }, []);

  const handleSendComment = async (description) => {
    const {postId, currentUser} = props;
    if(!description){
      toast.error("Please add a description");
    }
    else {
      const comment = {date: new Date(), description, postId: postId.toString(),  userId: currentUser.id, userName: currentUser.userName}
      try {
        await axios.post( consts.serverURI + "/api/Comment/AddComment", comment, consts.defaultConfig);
        toast.success('Comment sent!')
        getcomments();
      } catch (ex) {
        alert("Error on add comment");
      }
    }
  }

  const handleLike = async (like) => {
    setLiked(!liked)
    try {
      await axios.post( consts.serverURI + "/api/Like", like, consts.defaultConfig);
      try {
        const { data } = await axios.get(
          consts.serverURI + "/api/Like/GetLikes/" + like.postId,
          consts.defaultConfig
        );
        setLikesCount(data.length);
      } catch (ex) {
        toast.error(ex + ' Error with likes');
      }
    } catch (ex) {
      toast.error(ex + ' Error with likes')
    }
  };

  const handleRemoveComment = async (commentId) => {
    try {
      await axios.post(
        consts.serverURI + "/api/Comment/RemoveComment/" + commentId,
        consts.defaultConfig
      );
      getcomments();
    }catch(ex) {
      toast.error(ex + ' Error with remove comment')
    }
  };

  const handleRemovePost = async (postId) => {
    const {getPosts} = props;
    try {
      await axios.post(
        consts.serverURI + "/api/Post/RemovePost/" + postId,
        consts.defaultConfig
      );
      getPosts();
    }catch(ex) {
      toast.error(ex + ' Error with remove post')
    }
  }

  const displayComments = () => {
    const { postToManage } = props;
    return comments && comments.map(co => {
        return (
          <>
            <div className="commant-post">
              <div>
              <Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${co.userId}`} className="commant-post-avatar" />
              <div className="commant-post-user">{co.userName}</div>
              <span className="commant-post-date">{co.date.slice(0,10)}</span>
              </div>
              <span className="commant-post-description">{co.description}</span>
              {postToManage && <Button type="primary" danger className="comment-admin-delete" onClick={() => {handleRemoveComment(co.commentId)}}>X</Button>}
            </div>
              <Divider className="commant-post-divider"/>
            </>
        )
      })
  }

    const { header, description, date, postToManage, userId, userName, handleShowUserFeed, postId } = props;
    const { Meta } = Card;
    return (
      <Space direction="vertical" className="post-container">
        <Card bodyStyle={{width: "100%"}}
          actions={[
            !postToManage && <CommentAndLikes 
              handleSendComment={handleSendComment} 
              like={likeData} 
              liked={liked} 
              likesCount={likesCount} 
              handleLike={handleLike} 
            />,
            ]}
        > 
          <Button className="post-user-name" type="link" onClick={() => handleShowUserFeed(userId, userName)}>{userName}</Button>
          <Meta
            className="post"
            avatar={<Avatar 
              src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${userId}`}
              className="post-avatar"
              onClick={() => handleShowUserFeed(userId, userName)}
              >
                <UserOutlined />
              </Avatar>}
            title={<div>
              <span>{header}</span>
              {postToManage && <Button type="primary" danger className="post-admin-delete" onClick={() => handleRemovePost(postId)}>X</Button>}
              <div className="post-title-date">{date.slice(0,10)}</div>
            </div>}
            description={description}
          />
        </Card>
        {comments.length ? <Collapse className="accordion-post-container" accordion> 
          <Collapse.Panel header={`${comments.length} Commants`}>
          {displayComments()}
          </Collapse.Panel>
        </Collapse> :
        <></>
        }
      </Space>
    );
}

