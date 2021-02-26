import { useState } from 'react';
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";
import { updateComment, deleteComment } from '../../../store/actions/post';
import PropTypes from 'prop-types';

const PostCommentItem = ({
  _id: commentID,
  user,
  text,
  date,
  username,
  avatar,
  updateComment,
  deleteComment,
  postID,
  currentUser,
}) => {
      
  const [editMode, setEditMode] = useState(false);
  
  const [updatedText, setUpdatedText] = useState(text);

  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${user}`}>
          <img className="round-img" src={avatar} alt={username} />
          <h4>{username}</h4>
        </Link>
      </div>
      <div>
        {editMode ? (
          <textarea
            name="updatedText"
            cols="30"
            rows="5"
            style={{ padding: "5px" }}
            value={updatedText}
            onChange={(e) => setUpdatedText(e.target.value)}
          />
        ) : (
          <p className="my-1">{text}</p>
        )}
        <p className="post-date">
          Posted on <Moment format="YY/MM/DD">{date}</Moment>
        </p>
        {currentUser._id === user && (
          <div className="w-100">
            {editMode ? (
              <>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    updatedText !== text &&
                      updateComment(
                        currentUser.name,
                        currentUser.avatar,
                        postID,
                        commentID,
                        updatedText
                      );
                    setEditMode((prevState) => !prevState);
                  }}
                >
                  Update
                </button>
                <button
                  type="button"
                  className="btn btn-danger ml-auto"
                  onClick={() => setEditMode((prevState) => !prevState)}
                >
                  <i className="fas fa-times"></i>
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => setEditMode((prevState) => !prevState)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="btn btn-danger ml-auto"
                  onClick={() => deleteComment(postID, commentID)}
                >
                  Delete
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

PostCommentItem.propTypes = {
  updateComment: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  currentUser: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  currentUser: state.auth.user
})

export default connect(mapStateToProps, {updateComment, deleteComment})(PostCommentItem);
