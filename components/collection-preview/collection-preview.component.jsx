import React from 'react';
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom';


import CollectionItem from '../collection-item/collection-item.component';

import './collection-preview.styles.scss';

// destructure title and items array from props (...otherCollectionProps in shop.component.jsx)
const CollectionPreview = ({ title, items }) => (

  < div className='collection-preview' >
    {/* <h1 className='title' onClick={event => history.push(`${match.url}${title.toLowerCase()}`)} > */}
    <h1 className='title'>
      <Link
        to={`/shop/${title.toLowerCase()}`}>{title.toUpperCase()}
      </Link>
    </h1>
    <div className='preview'>
      {/* only get the first four items of each for this preview; could use slice(0,4) */}
      {items
        .filter((item, index) => index < 4)
        .map((item) => (
          <CollectionItem key={item.id} item={item} />
        ))}
    </div>
  </div >
);

// const CollectionPreview = ({title, items}) => {
//   console.log('title is: ', title);
//   console.log('items is: ', items)
//   return (
//     <div className='collection-preview'>
//       <h1 className='title'>{title.toUpperCase()}</h1>
//       <div className='preview'>
//         {/* only get the first four items of each for this preview; could use slice(0,4) */}
//         {items
//           .filter((item, index) => index < 4)
//           .map((item) => (
//             <CollectionItem key={item.id} item={item} />
//           ))}
//       </div>
//     </div>
//   )
// };

export default withRouter(CollectionPreview);
