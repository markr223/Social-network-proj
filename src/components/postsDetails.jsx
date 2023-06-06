import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { loadPostsFromServer} from "../store/actions";
import Chart from "./common/chart";
import Post from "./common/post";
import { serverURI, defaultConfig } from "../consts/consts";

class PostsDetails extends React.Component {
  state = {
    posts: [],
    currentPost: {},
    currentPostLikes: [],
  };
  componentDidMount() {
    this.props.getPostsFromStore();
  }

  handleChosenPost = async (post) => {
    const { data } = await axios.get(
      serverURI + "/api/Like/GetLikes/" + post.postId,
      defaultConfig
    );
    this.setState({ currentPost: post, currentPostLikes: data });
  };

  createPostComponent = () => {
    const { posts } = this.props;
    return posts.map(post => {
      return(
        <div className="feed-posts-container" onClick={() => {this.handleChosenPost(post)}}>
          <Post 
            key={post.postId}
            currentUser={post.userId}
            post={post}
            header={post.header}
            description={post.description}
            date={post.date}
            onClick={() => {this.handleChosenPost(post)}}
            postToManage
        />
      </div>
      )})
  }
  render() {
    const { currentPost, currentPostLikes } = this.state;
    console.log("currentPostLikes", currentPostLikes);
    return (
      <div className="row feed-post-details">
        <div className="feed-chart col-8">
          {currentPostLikes.length ? 
          <>
          <div className="feed-chart-title"> Post like Data </div>
          <Chart
            currentPost={currentPost}
            postLikes={currentPostLikes}
            postId={currentPost.postId}
          /> 
          </>: 
            <div className="feed-chart-nothing"> Nothing to show </div>
          }
        </div>
        <div className="feed-post-title"> Posts To Managed </div>
          {this.createPostComponent()}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    posts: state.postsFromStore.posts
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getPostsFromStore: () => dispatch(loadPostsFromServer())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostsDetails);
