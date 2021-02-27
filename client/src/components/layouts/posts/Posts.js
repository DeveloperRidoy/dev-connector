import { useEffect } from 'react';
import { connect } from "react-redux"
import { getPosts, clearPost } from '../../../store/actions/post';
import PropTypes from 'prop-types';
import Spinner from '../Spinner';
import PostItem from './PostItem';
import PostForm from './PostForm';

const Posts = ({ posts, postLoading, authLoading, getPosts, clearPost }) => {
         
  useEffect(() => {
    getPosts()
    return () => clearPost()
  }, []);
    return (
      <div>
        <h1 className="large text-primary">Posts</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Welcome to the community!
        </p>

        <div className="post-form">
          <div className="bg-primary p">
            <h3>Say Something...</h3>
          </div>
          <PostForm/>
        </div>

        <div className="posts">
          {postLoading || authLoading
              ? (<Spinner />)
              : posts.length === 0
              ? (<div>No posts from any developers yet. <h4>Be the first to post!</h4></div>)       
              : posts.map( post => <PostItem key={post._id} {...post}/>)}
        </div>
      </div>
    );
}

Posts.propTypes = {
    posts: PropTypes.array.isRequired,
    postLoading: PropTypes.bool.isRequired,
    authLoading: PropTypes.bool.isRequired,
    getPosts: PropTypes.func.isRequired,
    clearPost: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    posts: state.post.posts,
    postLoading: state.post.loading,
    authLoading: state.auth.loading
})

export default connect(mapStateToProps, {getPosts, clearPost})(Posts)
 