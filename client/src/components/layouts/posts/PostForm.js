import { useState } from "react";
import { createPost } from "../../../store/actions/post";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const PostForm = ({createPost}) => {

    const [formData, setFormData] = useState({
      title: "",
      text: "",
    });

    const { title, text } = formData;

    const inputChangeHandler = (e) =>
      setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));

    const formSubmit = (e) => {
      e.preventDefault();
        createPost(formData);
        setFormData({title: '', text: ''});
    };
    return (
      <form className="form my-1" onSubmit={formSubmit}>
        <input
          type="text"
          className="my-1"
          name="title"
          placeholder="title"
          value={title}
          onChange={inputChangeHandler}
          required
        />
        <textarea
          name="text"
          cols="30"
          rows="5"
          placeholder="Create a post"
          value={text}
          onChange={inputChangeHandler}
          required
        ></textarea>
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
    );
}

PostForm.propTypes = {
    createPost: PropTypes.func.isRequired,
}

export default connect(null, {createPost})(PostForm)
