import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { loadPostsFromServer } from "../store/actions";
import Chart from "./common/chart";
import ListGroup from "./common/listGroup";

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
      "http://localhost:43619/api/Like/GetLikes/" + post.postId
    );
    this.setState({ currentPost: post, currentPostLikes: data });
  };
  render() {
    const { currentPost, currentPostLikes } = this.state;
    const { posts } = this.props;

    return (
      <div className="row feed">
        <div className="col-3">
          <ListGroup
            dataList={posts}
            currentItem={currentPost}
            onChosenItem={this.handleChosenPost}
            label={"Posts :"}
            id={"postId"}
            name={"header"}
          />
        </div>
        <div className="col-8">
          <Chart
            currentPost={currentPost}
            postLikes={currentPostLikes}
            postId={currentPost.postId}
          />
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    posts: state.postsFromStore.posts,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getPostsFromStore: () => dispatch(loadPostsFromServer()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostsDetails);
