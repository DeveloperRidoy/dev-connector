import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";
import { addLikeToPost, removeLikeFromPost, deletePost } from '../../../store/actions/post';
import PropTypes from 'prop-types';
 
const PostItem = ({ avatar, username, title, text, date, likes, comments, user, _id, currentUserID, addLikeToPost, removeLikeFromPost, deletePost }) => {    

    // see if user liked the post or not
    const likedThePost = likes[likes.findIndex( like => like.user === currentUserID)] ? true : false;
   
    return ( 
      <div className="post bg-white p-1 my-1">
        <div> 
          <Link to={`/profile/${user}`}>
            <img
              className="round-img"
              src={`//${avatar}`}
              alt={username} 
            />
            <h4>{username}</h4>
          </Link>
        </div> 
        <div>  
          <h2>{title}</h2>
          <p className="my-1">{text.length > 50
            ? (<span>{text}...<Link to={`/post/${_id}`}>read more</Link></span>)
            : text}</p>
          <p className="post-date">
            Posted on <Moment format="YY/MM/DD">{date}</Moment>
          </p> 
          <button  
            type="button" 
            className="btn btn-light" 
            disabled={likedThePost ? true : false}
            onClick={() => addLikeToPost(_id)}>   
            <i className="fas fa-thumbs-up"></i>
            {likes.length > 0 && <span>{likes.length}</span>}
          </button>
          <button
            type="button"
            className="btn btn-light" 
            disabled={likedThePost ? false : true}
            onClick={() => removeLikeFromPost(_id)}>
            <i className="fas fa-thumbs-down"></i>
          </button>
          <Link to={`/post/${_id}`} className="btn btn-primary">
            Discussion{" "}
            {comments.length > 0 && (
              <span className="comment-count">{comments.length}</span>
            )}
          </Link>
          {currentUserID === user && (
            <button type="button" className="btn btn-danger" onClick={() => deletePost(_id)}>
              <i className="fas fa-times"></i>
            </button>
          )} 
        </div>
      </div>
    );
}
 
PostItem.propTypes = {
    currentUserID: PropTypes.string.isRequired,
    addLikeToPost: PropTypes.func.isRequired,
    removeLikeFromPost: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    currentUserID: state.auth.user._id
})

export default connect(mapStateToProps, {addLikeToPost, removeLikeFromPost, deletePost})(PostItem)
