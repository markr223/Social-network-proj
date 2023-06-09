import React from "react";
import { connect } from "react-redux";
import { loadPostsFromServer} from "../store/actions";
import Chart from "./common/chart";
import Post from "./common/post";
class PostsDetails extends React.Component {
  componentDidMount() {
    this.props.getPostsFromStore();
  }

  createPostComponent = () => {
    const { posts } = this.props;
    return posts.map(post => {
      return(
        <div className="feed-posts-container">
          <Post 
            key={post.postId}
            currentUser={post.userId}
            post={post}
            header={post.header}
            description={post.description}
            date={post.date}
            postToManage
        />
      </div>
      )})
  }
  render() {
    const { posts } = this.props;
    return (
      <div className="row feed-post-details">
        <div className="feed-chart col-8">
          <div className="feed-chart-title"> Post count per date </div>
          <Chart
            posts={posts} />
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
