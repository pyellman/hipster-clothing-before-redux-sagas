import React from 'react';

// withRouter is a "higher order component", takes a component
// as an arg and returns a modified component that has access
// to location, match and history objects -- avoid prop tunneling
import { withRouter } from 'react-router-dom';

import './menu-item.styles.scss';

// destructure props from props, and grab router info (i.e., match)
const MenuItem = ({ title, imageUrl, size, history, linkUrl, match }) => (
  // use jsx/js to dynamically add another class depending on value of size prop;
  // will show 'undefined' in dev tools inspector if not specified as large
  // and add a react-router constructed link to the onClick attribute
  // and history.push with match to route to the right component
  <div className={`${size} menu-item`} onClick={() => history.push(`${match.url}${linkUrl}`)}>
    {/* use jsx style attribute to dynamically add a style to our component */}
    <div
      className='background-image' style={{
        backgroundImage: `url(${imageUrl}`
      }}
    />
    <div className='content'>
      <h1 className='title'>{title.toUpperCase()}</h1>
      <span className='subtitle'>SHOP NOW</span>
    </div>
  </div>
);

export default withRouter(MenuItem);