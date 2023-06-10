import React from "react";
import axios from "axios";
import { Card, Space, Avatar, Button } from 'antd';
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
    };
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
      alert("Error ;(");
    }
  };

  componentDidMount() {
    this.getLikes();
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
        alert("Error ;(");
      }
    } catch (ex) {
      alert("Error ;(");
    }
  };
  render() {
    const { header, description, date, postToManage } = this.props;
    const { liked, likesCount, like } = this.state;
    const { Meta } = Card;
    // TODO: add user id + user name
    return (
      <Space direction="vertical" className="post-container">
        <Card 
          actions={[
            !postToManage && <CommentAndLikes like={like} liked={liked} likesCount={likesCount} handleLike={this.handleLike} />
            ]}
        > 
          <Meta
            className="post"
            avatar={<Avatar 
              // src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${this.state.userId}`} NEED TO PUT USER-ID
              className="post-avatar">
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
      </Space>
    );
  }
}

export default Post;
