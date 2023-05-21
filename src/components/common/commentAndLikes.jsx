import { Input, Button, Divider } from 'antd';
import Like from "./like";
import {SendOutlined} from '@ant-design/icons';

const CommentAndLikes = (props) => {
    const {handleLike, handleSendComment, like, liked, likesCount} = props;
    return (
        <div className="post-send-comment-container">
              <Input className="post-send-comment-input"/>
              <Button className="post-send-comment-button" type="primary" shape="circle" icon={<SendOutlined className="post-send-comment-icon"/>} onClick={() => handleSendComment()} />
              <Divider className="post-send-comment-devider" type="vertical" />
              <Like
                onLike={() => handleLike(like)}
                liked={liked}
                likesCount={likesCount}>
              </Like>
            </div>
    )
}

export default CommentAndLikes;