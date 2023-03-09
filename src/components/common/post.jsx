import React from "react";
import axios from "axios";
import Like from "./like";
import * as consts from "../../consts/consts";

class Post extends React.Component {
  state = {};
  constructor(props) {
    super(props);
    this.state = {
      like: {
        date: consts.currentDate,
        userId: this.props.currentUser.id,
        postId: this.props.post.postId,
      },
      liked: false,
      likesCount: 0,
    };
  }

  getLikes = async () => {
    const like = this.state.like;
    try {
      const { data } = await axios.get(
        "http://localhost:43619/api/Like/GetLikes/" + like.postId
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
    console.log("Like", like);
    const liked = this.state.liked;
    this.setState({ liked: !liked });
    try {
      await axios.post("http://localhost:43619/api/Like", like);
      try {
        const { data } = await axios.get(
          "http://localhost:43619/api/Like/GetLikes/" + like.postId
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
    const { header, description } = this.props;
    const { liked, likesCount, like } = this.state;
    return (
      <div className="container">
        <div className="post m-2">
          <h3>{header}</h3>
          <h6>{description}</h6>
          <Like
            onLike={() => this.handleLike(like)}
            liked={liked}
            likesCount={likesCount}
          />
        </div>
      </div>
    );
  }
}

export default Post;
