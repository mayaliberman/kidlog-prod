import React, { useEffect, useContext } from 'react';
import PostCard from './PostCard/PostCard.jsx';
import Image from '../../assets/welcome_bg.jpg';
import Spinner from '../../components/ui/Spinner';
import PostContext from '../../context/post/postContext';
import LazyLoad from 'react-lazyload';
const PostsContainer = () => {
  const postContext = useContext(PostContext);
  const {
    posts,
    photos,
    loading,
    getUnsplashPhoto,
    getPosts,
    filteredPosts,
  } = postContext;
  const { results } = photos;
  useEffect(() => {
    getUnsplashPhoto();
    getPosts();
  }, []);
  // Photo by <a href="https://unsplash.com/@anniespratt?utm_source=your_app_name&utm_medium=referral">Annie Spratt</a> on <a href="https://unsplash.com/?utm_source=your_app_name&utm_medium=referral">Unsplash</a>

  if (loading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  } else if (filteredPosts.length < 1) {
    return (
      <div style={{ textAlign: 'center' }}>
        <h2>No Posts Uploaded Yet</h2>
      </div>
    );
  } else {
    return (
      <div>
        {filteredPosts.map((post, index) => {
          let photo = results
            ? results[Math.floor(Math.random() * results.length)].urls.regular
            : Image;

          return (
            <LazyLoad key={post._id} placeholder={<Spinner />}>
              <PostCard
                key={post._id}
                desc={post.desc}
                lessonNum={post.lessonId.lessonNum}
                date={post.createdAt}
                lessonTags={post.lessonId.tags}
                childId={post.childId._id}
                childName={post.childId.name}
                postData={post}
                defaultPhoto={post.image || photo || Image}
              />
            </LazyLoad>
          );
        })}
      </div>
    );
  }
};

export default PostsContainer;
