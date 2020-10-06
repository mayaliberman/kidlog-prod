import React, { useEffect, useContext } from 'react';
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
  const postContext = useContext(PostContext);
  const { posts } = postContext;
  let user = getUser();

  useEffect(() => {
    user = getUser();
    if (user) {
    }
  }, [user, posts]);

  const random_bg_color = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return 'rgb(' + r + ',' + g + ',' + b + ')';
  };
  let arrayOfData = user.children.filter(
    (kid) => (kid = kid.active === true)
  ) || [{ name: '' }];

  console.log(arrayOfData);
  let checkboxes = arrayOfData.map((child) => (
    <label>
      <input type='checkbox' name='kid' value='music' />
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
            <input type='checkbox' name='music' value='music' />
            <div className={iconBox}>
              <img src={guitar} alt='music-icon' />
              <span>Music</span>
            </div>
          </label>
          <label>
            <input type='checkbox' name='karate' value='karate' />
            <div className={iconBox}>
              <img src={belt} alt='music-icon' />
              <span>Karate</span>
            </div>
          </label>

          <label>
            <input type='checkbox' name='logic' value='logic' />
            <div className={iconBox}>
              <img src={calculator} alt='music-icon' />
              <span>Logic</span>
            </div>
          </label>
          <label>
            <input type='checkbox' name='drawing' value='drawing' />
            <div className={iconBox}>
              <img src={brush} alt='music-icon' />
              <span>Drawing</span>
            </div>
          </label>
        </div>
        <div className={category}>
          <h4>Filter by Kid</h4>
          {checkboxes}
          {/* <label>
            <input type='checkbox' name='kid' value='music' />
            <div className={iconBox}>
              <div className={avatar}>A</div>
              <span>Ashley</span>
            </div>
          </label>
          <label>
            <input type='checkbox' name='kid' value='music' />
            <div className={iconBox}>
              <div className={avatar} style={{ background: 'pink' }}>
                R
              </div>
              <span>Rob</span>
            </div>
          </label> */}
        </div>
        <div className={category}>
          <h4>Sort by Date</h4>
          <label>
            <input type='checkbox' name='drawing' value='drawing' />
            <div className={iconBox}>
              <img src={downarrow} alt='music-icon' />
              <span>New to Old</span>
            </div>
          </label>
          <label>
            <input type='checkbox' name='drawing' value='drawing' />
            <div className={iconBox}>
              <img src={uparrow} alt='music-icon' />
              <span>Old to New</span>
            </div>
          </label>
        </div>
        {/* <button type='submit' className={button}>
          Apply Filter
        </button> */}
      </form>
    </div>
  );
};

export default FilterPosts;
