import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Collapse, Card, Space, Avatar, Button, Divider } from 'antd';
import * as consts from "../../consts/consts";
import CommentAndLikes from "./commentAndLikes";
import { UserOutlined } from "@ant-design/icons";

class Post extends React.Component {
  state = {};
  constructor(props) {
    super(props);
    this.state = {
      like: {
        date: consts.currentDate,
        userId: this.props.currentUser.id,
        postId: this.props.postId,
      },
      liked: false,
      likesCount: 0,
      comments: []
    };
  }

  getcomments = async () => {
    const {postId} = this.props
    try {
      const { data } = await axios.get(consts.serverURI + "/api/Comment/GetPostComments/" + postId, consts.defaultConfig)
      this.setState({comments: data})
    } catch (ex) {
      toast.error("failed get comments");
    }
    
  }
  getLikes = async () => {
    const like = this.state.like;
    try {
      const { data } = await axios.get(
        consts.serverURI + "/api/Like/GetLikes/" + like.postId,
        consts.defaultConfig
      );
      for (let postLikes of data)
        if (postLikes.userId === this.props.currentUser.id)
          this.setState({ liked: true });
      this.setState({ likesCount: data.length });
    } catch (ex) {
      toast.error("failed to get the likes");
    }
  };

  componentDidMount() {
    this.getLikes();
    this.getcomments()
  }

  handleSendComment = async (description) => {
    const {postId, currentUser} = this.props;
    if(!description){
      toast.error("Please add a description");
    }
    else {
      const comment = {date: new Date(), description, postId: postId.toString(),  userId: currentUser.id, userName: currentUser.userName}
      try {
        await axios.post( consts.serverURI + "/api/Comment/AddComment", comment, consts.defaultConfig);
        toast.success('Comment sent!')
        this.getcomments();
      } catch (ex) {
        alert("Error on add comment");
      }
    }
  }

  handleLike = async (like) => {
    const liked = this.state.liked;
    this.setState({ liked: !liked });
    try {
      await axios.post( consts.serverURI + "/api/Like", like, consts.defaultConfig);
      try {
        const { data } = await axios.get(
          consts.serverURI + "/api/Like/GetLikes/" + like.postId,
          consts.defaultConfig
        );
        this.setState({ likesCount: data.length });
      } catch (ex) {
        toast.error(ex + 'Error with likes');
      }
    } catch (ex) {
      toast.error(ex + 'Error with likes')
    }
  };

  displayPost = () => {
    const { postToManage } = this.props;
    const { comments } = this.state;
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
              {postToManage && <Button type="primary" danger className="comment-admin-delete">X</Button>}
            </div>
              <Divider className="commant-post-divider"/>
            </>
        )
      })
  }

  render() {
    const { header, description, date, postToManage, userId, userName, handleShowUserFeed } = this.props;
    const { liked, likesCount, like, comments } = this.state;
    const { Meta } = Card;
    return (
      <Space direction="vertical" className="post-container">
        <Card bodyStyle={{width: "100%"}}
          actions={[
            !postToManage && <CommentAndLikes 
              handleSendComment={this.handleSendComment} 
              like={like} 
              liked={liked} 
              likesCount={likesCount} 
              handleLike={this.handleLike} 
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
              {postToManage && <Button type="primary" danger className="post-admin-delete">X</Button>}
              <div className="post-title-date">{date.slice(0,10)}</div>
            </div>}
            description={description}
          />
        </Card>
        {comments.length ? <Collapse className="accordion-post-container" accordion> 
          <Collapse.Panel header={`${comments.length} Commants`}>
          {this.displayPost()}
          </Collapse.Panel>
        </Collapse> :
        <></>
        }
      </Space>
    );
  }
}

export default Post;
