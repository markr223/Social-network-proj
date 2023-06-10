import React from "react";
import { connect } from "react-redux";
import { loadPostsFromServer, loadUsers} from "../store/actions";
import { FormOutlined, UserOutlined } from '@ant-design/icons';
import { Col, Row, Statistic } from 'antd';
import CountUp from 'react-countup';
import Chart from "./common/chart";
import Post from "./common/post";
class PostsDetails extends React.Component {
  componentDidMount() {
    this.props.getPostsFromStore();
    this.props.loadUsers();
  }

  createPostComponent = () => {
    const { posts } = this.props;
    return posts.map(post => {
      return(
        <div className="feed-posts-container">
          <Post 
            key={post.postId}
            currentUser={post.userId}
            postId={post.postId}
            header={post.header}
            description={post.description}
            date={post.date}
            postToManage
        />
      </div>
      )})
  }
  render() {
    const { posts, users } = this.props;
    const formatter = (value) => <CountUp end={value} />;
    return (
      <div className="row feed-post-details">
        <Row className="feed-statistic-container">
          <Col span={2}>
            <Statistic valueStyle={{ color: '#3f8600' }} title="Total Posts" value={posts.length} prefix={<FormOutlined />} formatter={formatter} />
          </Col>
          <Col span={2}>
            <Statistic valueStyle={{ color: '#3f8600' }} title="Registered users" value={users.length} prefix={<UserOutlined />} formatter={formatter} />
          </Col>
      </Row>
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
    posts: state.postsFromStore.posts,
    users: state.allUsers.users
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getPostsFromStore: () => dispatch(loadPostsFromServer()),
    loadUsers: () => dispatch(loadUsers())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostsDetails);
