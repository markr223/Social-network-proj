import React from "react";
import Joi from "joi-browser";
import { connect } from "react-redux";
import { loadUsers, loadPostsFromServer, loadUserPostFromServer } from "../store/actions";
import { Layout, Button, Empty } from 'antd';
import axios from "axios";
import { toast } from "react-toastify";
import Form from "./common/form";
import Post from "./common/post";
import ListGroup from "./common/listGroup";
import * as Inputs from "../consts/consts";
import NewPostModal from "./common/newPostModal";
import { FormOutlined, HomeOutlined, SmileFilled, UserOutlined } from "@ant-design/icons";

class Feed extends React.Component {
  state = {};
  schema = {
    header: Joi.string().required().label("Header"),
    description: Joi.string().required().label("Description"),
    userId: Joi.label("User Id"),
  };
  constructor(props) {
    super(props);
    this.state = {
      post: {
        header: "",
        description: "",
        userId: this.props.loggedUser.id,
        date: ""
      },
      users: [],
      chosentUser: {},
      errors: {},
      isModalOpen: false
    };
    props.getPostsFromStore();
    console.log(this.props.loggedUser);
  }
  getAllUsers = async () => {
    try {
      const { data } = await axios.get(
        Inputs.serverURI + "/api/User/GetAllUsers",
        Inputs.defaultConfig
      );
      this.setState({ users: data });
    } catch (ex) {}
  };

  componentDidMount() {
    this.getAllUsers();
  }

  validate = () => {
    const { error } = Joi.validate(this.state.post, this.schema, {
      abortEarly: false,
    });
    if (!error) return null;
    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  handleInput = (e, value) => {
    let post = { ...this.state.post };
    post[value] = e.currentTarget.value;
    post['date'] = new Date();
    this.setState({ post });
  };

  handleAddingPost = async (post) => {
    try {
      await axios.post(
        Inputs.serverURI + "/api/Post",
        post, 
        Inputs.defaultConfig
      );
      toast.success("Post Successfully Added :)");
      setTimeout(() => (window.location = "/feed"), 1000);
    } catch (ex) {
      const { message } = ex.response.data;
      toast.error(message);
    }
  };

  manageFeedText = () => {
    const { chosentUser } = this.state;
    const { loggedUser } = this.props;
    if (Object.keys(chosentUser).length) {
      if(chosentUser.id === loggedUser.id){
        return (
          <div className="feed-user-container">
              <UserOutlined className="feed-user-icon"/>
              <div>Its Your wall</div>
          </div>
        )
      } 
        return (
          <div className="feed-user-container">
              <UserOutlined className="feed-user-icon"/>
              <div>Its {chosentUser.userName} wall</div>
          </div>
        );
      }
  }

  manageEmptyWallText = () => {
    const { chosentUser } = this.state;
    const { loggedUser } = this.props;
    if (Object.keys(chosentUser).length) {
      if(chosentUser.id === loggedUser.id){
        return (
          <>
            <div className="empty-wall-text" >No post yet? Post one</div>
            <Button type="primary" icon={<FormOutlined className="welcome-icon-button"/>} onClick={() => this.showModal()}>
              Write new post
            </Button>
          </>
        )
      } 
        return (
          <div className="empty-wall-text">No post yet </div>
        );
      }
  }

  handleChosenUser = (user) => {
    const {getUserPosts} = this.props;
    this.setState({chosentUser: user});
    getUserPosts(user.id);
  };

  handleChosenUserId = (userId, userName) => {
    const {getUserPosts} = this.props;
    this.setState({chosentUser: {id: userId, userName}});
    getUserPosts(userId);
  } 

  showModal = () => {
    this.setState({isModalOpen: true});
  };

  handleCancel = () => {
    this.setState({isModalOpen: false});
  };

  render() {
    const { post, errors, chosentUser, users, isModalOpen } = this.state;
    const { loggedUser, posts } = this.props;
    const { Content, Sider } = Layout;
    return (
      <>
      <Layout>
          <Sider 
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'sticky',
            left: 0,
            top: 0,
            bottom: 0,
          }}>
          <ListGroup
              dataList={users}
              currentItem={chosentUser}
              onChosenItem={this.handleChosenUser}
              label={"Users"}
              id={"id"}
              name={"userName"}
              manageUsers={loggedUser.Role === "Admin"}
            />
          </Sider>
          <Content>
            <div className="row-2 addPost">
              <div>
                <div className="welcome-container">
                  <div>
                    <span className="welcome-message">{<SmileFilled className="welcome-icon"/>} 
                      Hello, {loggedUser.userName} 
                      <Button 
                        className="welcome-go-your-feed"
                        type="link" 
                        onClick={() => {this.handleChosenUser(loggedUser)}}
                        icon={<HomeOutlined className="welcome-go-your-feed-icon"/>}>
                        My Wall
                      </Button>
                    </span>
                    <span className="welcome-message-sec">
                      Welcome to the feed
                    </span>
                  </div>
                  <Button className="welcome-new-post-button" type="primary" icon={<FormOutlined className="welcome-icon-button"/>} onClick={() => this.showModal()}>
                    Write new post
                  </Button>
                </div>
                <NewPostModal isModalOpen={isModalOpen} handleOk={() => this.handleAddingPost(post)} handleCancel={() => this.handleCancel()}>
                  <Form
                    formValues={post}
                    formInputs={Inputs.ADD_POST_FORM_INPUTS}
                    onInputChange={this.handleInput}
                    onSubmit={() => this.handleAddingPost(post)}
                    errors={errors}
                    activateButton={this.validate()}
                  />
                </NewPostModal> 
              </div>
              <div>
              {this.manageFeedText()}
              </div>
              <div className="feed-posts-container">
                {posts.length
                  ? [...posts].reverse().map((post) => (
                      <Post
                        key={post.postId}
                        currentUser={loggedUser}
                        postId={post.postId}
                        date={post.date}
                        header={post.header}
                        description={post.description}
                        userId={post.userId}
                        userName={post.userName}
                        handleShowUserFeed={this.handleChosenUserId}
                      />
                    ))
                  : 
                    <Empty 
                    className="feed-empty"
                    imageStyle={{height: 240}}
                    description = {
                      this.manageEmptyWallText()
                    }
                    />}
              </div>
            </div>
          </Content>
          </Layout>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.allUsers.users,
    posts: state.postsFromStore.posts,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    loadUsers: () => dispatch(loadUsers()),
    getPostsFromStore: () => dispatch(loadPostsFromServer()),
    getUserPosts: (userId) => dispatch(loadUserPostFromServer(userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
