import React from "react";
import axios from "axios";
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
  onChange = () => {
    console.log('Click');
  }
  render() {
    const { header, description, date, postToManage } = this.props;
    const { liked, likesCount, like } = this.state;
    const { Meta } = Card;
    // TODO: add user id + user name

    const items = [
      {
        key: '1',
        label: 'This is panel header 1',
        children: <p>asdfgasdfg</p>,
      },
      {
        key: '2',
        label: 'This is panel header 2',
        children: <p>23sdfasd423</p>,
      },
      {
        key: '3',
        label: 'This is panel header 3',
        children: <p>234234234</p>,
      },
    ];


    return (
      <Space direction="vertical" className="post-container">
        <Card bodyStyle={{width: "100%"}}
          actions={[
            !postToManage && <CommentAndLikes like={like} liked={liked} likesCount={likesCount} handleLike={this.handleLike} />,
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
        <Collapse className="accordion-post-container" accordion items={items}> 
          <Collapse.Panel header="Commants">
          <div className="commant-post">
            <div>
            <Avatar className="commant-post-avatar"><UserOutlined /></Avatar>
            <div className="commant-post-user">User Name</div>
            <span className="commant-post-date">{date.slice(0,10)}</span>
            </div>
            <span className="commant-post-description">Commant on your post! asdf asdfasdfasdfasdfasdfasdf asdf asdfas dfasdf asdf asdf asdf asdf asdfasdfasdfasdfasdf asdf asdf asdfasdfasdfasdfasdfasdfasdfsadfsadfsadfsadfddddd</span>
          </div>
          <Divider className="commant-post-divider"/>
          <div className="commant-post">
            <div>
            <Avatar className="commant-post-avatar"><UserOutlined /></Avatar>
            <div className="commant-post-user">User Name</div>
            <span className="commant-post-date">{date.slice(0,10)}</span>
            </div>
            <span className="commant-post-description">Commant on your post!</span>
          </div>
          </Collapse.Panel>
        </Collapse> 
      </Space>
    );
  }
}

export default Post;
