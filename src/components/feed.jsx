import React from "react";
import Joi from "joi-browser";
import axios from "axios";
import { toast } from "react-toastify";
import Form from "./common/form";
import Post from "./common/post";
import ListGroup from "./common/listGroup";
import * as Inputs from "../consts/consts";

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
      },
      users: [],
      chosentUser: {},
      errors: {},
      posts: [],
    };
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
  getPostsByUser = async () => {
    try {
      const { data } = await axios.get(
        Inputs.serverURI + "/api/Post/GetUserPosts/" + this.state.post.userId,
        Inputs.defaultConfig
      );
      this.setState({ posts: data });
    } catch (ex) {}
  };
  componentDidMount() {
    this.getPostsByUser();
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
  handleChosenUser = async (user) => {
    try {
      const { data } = await axios.get(
        Inputs.serverURI + "/api/Post/GetUserPosts/" + user.id , Inputs.defaultConfig
      );
      data.length === 0
        ? this.setState({ emptyWall: true })
        : this.setState({ emptyWall: false });
      this.setState({ posts: data, chosentUser: user });
    } catch (ex) {}
    window.scrollTo(0, 0);
  };

  render() {
    const { post, errors, chosentUser, users, posts, emptyWall } = this.state;
    const { loggedUser } = this.props;
    return (
      <div className="row feed">
        <div className="row">
          <div className="col-3">
            <ListGroup
              dataList={users}
              currentItem={chosentUser}
              onChosenItem={this.handleChosenUser}
              label={"Users :"}
              id={"id"}
              name={"userName"}
            />
          </div>
          <div className="col-6">
            <div className="row-2 addPost">
              <h2 className="m-2">New Post </h2>
              <Form
                buttonLabel="Add Post"
                formValues={post}
                formInputs={Inputs.ADD_POST_FORM_INPUTS}
                onInputChange={this.handleInput}
                onSubmit={() => this.handleAddingPost(post)}
                errors={errors}
                inputTextArea={true}
                activateButton={this.validate()}
              />
            </div>
            <h6>{chosentUser.email || "My"} Posts : </h6>
            <div className="feed-posts-container">
              {!emptyWall
                ? [...posts].reverse().map((post) => (
                    <Post
                      key={post.postId}
                      currentUser={loggedUser}
                      post={post}
                      header={post.header}
                      description={post.description}
                    />
                  ))
                : <spna>BLA BLA</spna>}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Feed;
