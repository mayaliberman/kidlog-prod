import React, { useState, useContext, useEffect } from 'react';
import PostsContainer from '../PostsContainer';
import { postGallery, container } from './PostGallery.module.scss';
import AddPostButton from '../AddPostButton/AddPostButton';
import AddPost from '../AddPost/AddPost';
import PostFeedback from '../PostFeedback/PostFeedback';
import FeedBackThankYou from '../FeedBackThankYou/FeedBackThankYou';
import PostContext from '../../../context/post/postContext';
import { getUser } from '../../../services/cookies';
import { useHistory } from 'react-router-dom';

const PostsGallery = () => {
  const postContext = useContext(PostContext);
  const { currentPost, clearCurrentPost } = postContext;
  const [editPopup, setEditPopup] = useState(false);
  const [addButtonPopup, setAddButtonPopup] = useState(false);
  const [feedbackPost, setFeedbackPost] = useState(false);
  const [ThankYouPopup, setThankYouPopup] = useState(false);
  const history = useHistory();
  let user = getUser();
  useEffect(() => {
    user = getUser();
  }, [user]);

  if (!user.children.length > 0) {
    console.log('no kids');
    history.push('/add-kid');
  }
  const addPostButtonTogglePop = () => {
    setAddButtonPopup(true);
  };

  const feedbackToggle = () => {
    setFeedbackPost(!feedbackPost);
  };
  const submitAddPost = () => {
    setAddButtonPopup(false);
    setFeedbackPost(true);
  };

  const submitFeedback = () => {
    setFeedbackPost(false);
    setThankYouPopup(true);
    setTimeout(() => {
      setThankYouPopup(false);
    }, 1500);
  };

  const toggleEditPost = () => {
    setEditPopup(!editPopup);
  };

  return (
    <main className={container}>
      {/* <div style={{ marginTop: '80px', color: 'black', width: '150px' }}>
        <h1>Filter area</h1>
      </div> */}
      <div className={postGallery}>
        <AddPostButton togglePop={addPostButtonTogglePop} />
        {addButtonPopup && (
          <AddPost
            close={() => setAddButtonPopup(false)}
            submit={submitAddPost}
            headerTitle={'New Activity'}
            submitButton='Add Post'
          />
        )}
        {feedbackPost && (
          <PostFeedback togglePop={feedbackToggle} submit={submitFeedback} />
        )}
        {ThankYouPopup && (
          <FeedBackThankYou togglePop={() => setThankYouPopup(false)} />
        )}
        {currentPost.desc && (
          <AddPost
            submit={toggleEditPost}
            close={() => clearCurrentPost()}
            headerTitle={'Edit Post'}
            submitButton='Edit Post'
          />
        )}

        <PostsContainer />
      </div>
      <div></div>
    </main>
  );
};

export default PostsGallery;
