import React, { useEffect, useContext, useState } from 'react';
import { getUser } from '../../../services/cookies';
import {
  container,
  button,
  category,
  iconBox,
  avatar,
} from './FilterPosts.module.scss';
import PostContext from '../../../context/post/postContext';
import belt from '../../../assets/belt-1.svg';
import brush from '../../../assets/brush-1.svg';
import calculator from '../../../assets/calculator-1.svg';
import guitar from '../../../assets/guitar.svg';
import uparrow from '../../../assets/Up-arrow.svg';
import downarrow from '../../../assets/Down-arrow.svg';

const FilterPosts = () => {
  let user = getUser();

  const postContext = useContext(PostContext);
  const { posts, getPosts, getFilteredPosts } = postContext;
  const [lessonCategory, setLessonCategory] = useState([]);
  const [sortPosts, setSortPosts] = useState('New to Old');
  const [filterChild, setFilteredChild] = useState('');
  useEffect(() => {
    user = getUser();
  }, [user, posts]);

  const updateFilterCategory = (e) => {
    e.target.checked
      ? setLessonCategory([...lessonCategory, e.target.value])
      : setLessonCategory(
          [...lessonCategory].filter((category) => category !== e.target.value)
        );

    // const r = posts.filter((post) =>
    //   post.lessonId.tags.every((c) => lessonCategory.includes(c))
    // );
    // console.log(r);
  };

  const sortPostsDates = (e) => {
    setSortPosts(e.target.value);
  };

  const getFilterChild = (e) => {
    setFilteredChild(e.target.value);
  };
  const onSubmit = (e) => {
    // const postList = [...posts];
    // console.log(Object.values(postList[2].lessonId.tags));
    // lessonCategory.filter((e) => postList.lessonId.tags.indexOf(e) > -1);
    // lessonCategory.filter((e) => e.lessonId.tags.every(c => lessonId.tags.include()));
    // console.log(Object.keys(postList[0].lessonId.tags));
    // lessonCategory.filter((e) => Object.values(postList[0].lessonId.tags));
    e.preventDefault();

    let postsList = [...posts];
    let updatedFilteredPosts;
    //Sort post by date
    postsList.sort((a, b) => {
      return sortPosts === 'New to Old'
        ? new Date(b.createdAt) - new Date(a.createdAt)
        : new Date(a.createdAt) - new Date(b.createdAt);
    });

    //filter posts by child's name
    filterChild
      ? (updatedFilteredPosts = postsList.filter(
          (post) => post.childId.name === filterChild
        ))
      : (updatedFilteredPosts = postsList);

    //filter posts by Category
    if (lessonCategory.length > 0) {
      const r = posts.filter((post) =>
        post.lessonId.tags.every((c) => lessonCategory.includes(c))
      );
      updatedFilteredPosts = r;
    }
    getFilteredPosts(updatedFilteredPosts);
  };

  const clearFilter = (e) => {
    e.preventDefault();
    setLessonCategory([]);
    setSortPosts('New to Old');
    setFilteredChild('');
    getPosts();
  };

  const random_bg_color = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return 'rgb(' + r + ',' + g + ',' + b + ')';
  };
  let arrayOfData = user.children.filter(
    (kid) => (kid = kid.active === true)
  ) || [{ name: '' }];

  let checkboxes = arrayOfData.map((child) => (
    <label key={child._id}>
      <input
        type='radio'
        name='kid'
        value={child.name}
        onChange={getFilterChild}
      />
      <div className={iconBox}>
        <div className={avatar} style={{ background: random_bg_color() }}>
          {child.name.charAt(0)}
        </div>
        <span>{child.name}</span>
      </div>
    </label>
  ));
  return (
    <div className={container}>
      <form>
        <div className={category}>
          <h4>Filter by Category</h4>
          <label>
            <input
              type='checkbox'
              name='category'
              value='music'
              onChange={updateFilterCategory}
            />
            <div className={iconBox}>
              <img src={guitar} alt='music-icon' />
              <span>Music</span>
            </div>
          </label>
          <label>
            <input
              type='checkbox'
              name='category'
              value='karate'
              onChange={updateFilterCategory}
            />
            <div className={iconBox}>
              <img src={belt} alt='music-icon' />
              <span>Karate</span>
            </div>
          </label>

          <label>
            <input
              type='checkbox'
              name='category'
              value='logic'
              onChange={updateFilterCategory}
            />
            <div className={iconBox}>
              <img src={calculator} alt='music-icon' />
              <span>Logic</span>
            </div>
          </label>
          <label>
            <input
              type='checkbox'
              name='category'
              value='drawing'
              onChange={updateFilterCategory}
            />
            <div className={iconBox}>
              <img src={brush} alt='music-icon' />
              <span>Drawing</span>
            </div>
          </label>
        </div>
        <div className={category}>
          <h4>Filter by Kid</h4>
          {checkboxes}
        </div>
        <div className={category}>
          <h4>Sort by Date</h4>
          <label>
            <input
              type='radio'
              name='date'
              value='New to Old'
              onChange={sortPostsDates}
            />
            <div className={iconBox}>
              <img src={downarrow} alt='music-icon' />
              <span>New to Old</span>
            </div>
          </label>
          <label>
            <input
              type='radio'
              name='date'
              value='Old to New'
              onChange={sortPostsDates}
            />
            <div className={iconBox}>
              <img src={uparrow} alt='music-icon' />
              <span>Old to New</span>
            </div>
          </label>
        </div>
        <div>
          <button type='submit' onClick={onSubmit}>
            Apply
          </button>
          <button onClick={clearFilter}>Clear</button>
        </div>
      </form>
    </div>
  );
};

export default FilterPosts;
