import { useEffect } from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { getPost, clearPost } from '../../../store/actions/post' ;
import Spinner from '../Spinner';  
import PostCommentForm from './PostCommentForm';   
import PostCommentItem from './PostCommentItem';
import Moment from 'react-moment'; 

const Post = ({ getPost, clearPost, postLoading, authLoading, post, match }) => {
 
  const { _id, text, title, username, user, date, comments, avatar } = post ? post : '';
 
  useEffect(() => {
    getPost(match.params.postID)
    return () => clearPost();
  }, []);

  return authLoading || postLoading
    ? <Spinner />
    : !post ? (
    <div>post not found</div>
  ) : (
    <div>
      <Link to="/posts" className="btn">
        Back To Posts
      </Link>
      <div className="post bg-white p-1 my-1">
        <div>
          <Link to={`/profile/${user}`}>
            <img className="round-img" src={avatar} alt={username} />
            <h4>{username}</h4>
          </Link>
        </div>
        <div>
          <h2>{title}</h2>
          <p className="my-1">{text}</p>
          <p className="post-date">
            Posted on <Moment format="YY/MM/DD">{date}</Moment>
          </p>
        </div>
      </div>
      <PostCommentForm postID={_id} />
      <div className="comments">
        {comments.map((comment) => (
          <PostCommentItem
            key={comment._id}
            {...comment}
            postID={_id}
          />
        ))}
      </div>
    </div>
  );
}

Post.propTypes = {
  post: PropTypes.object,
  postLoading: PropTypes.bool.isRequired,
  authLoading: PropTypes.bool.isRequired,
  getPost: PropTypes.func.isRequired,
  clearPost: PropTypes.func.isRequired,
  currentUserId: PropTypes.string,
}

const mapStateToProps = state => ({
  post: state.post.post, 
  postLoading: state.post.loading,
  authLoading: state.auth.loading,
})

export default connect(mapStateToProps, {getPost, clearPost})(Post);
   