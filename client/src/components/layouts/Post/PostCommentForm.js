import { useState } from 'react';
import PropTypes from 'prop-types';
import { addComment } from '../../../store/actions/post'; 
import { connect } from 'react-redux';
 
const PostCommentForm = ({ addComment, postID, username, avatar }) => {
    
    const [text, setText] = useState('');

    const formSubmit = e => {
        e.preventDefault();
      addComment(username, avatar, postID, text);
      setText('')
    }

  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Leave A Comment</h3>
      </div>
      <form className="form my-1" onSubmit={formSubmit}>
        <textarea
          name="text"
          cols="30"
          rows="5"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Comment on this post"
          required
        ></textarea>
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  );
}

PostCommentForm.propTypes = ({
  addComment: PropTypes.func.isRequired,
  postID: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
})

const mapStateToProps = state => ({
  username: state.auth.user.name,
  avatar: state.auth.user.avatar
})

export default connect(mapStateToProps, {addComment})(PostCommentForm)
