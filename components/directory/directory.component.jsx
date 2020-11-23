import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectDirectorySections } from '../../redux/directory/directory.selectors';
import MenuItem from '../menu-item/menu-item.component';

import './directory.styles.scss';

// converted Directory component from Class to a functional component when reduxing it
const Directory = ({ sections }) => (
  < div className='directory-menu' >
    {/* destructure data from the sections array; since the field names are
        sufficient for the prop names we will want in MenuItem, ES6 spread them into a single
        prop (destructure in MenuItem); need to specify id because is used as MenuItem key
        i.e., replace this with what follows (data was in state)
        {this.state.sections.map(({ title, imageUrl, id, size }) => (
          <MenuItem key={id} title={title} imageUrl={imageUrl} size={size} />
        ))} */}
    {
      sections.map(({ id, ...otherSectionProps }) => (
        <MenuItem key={id} {...otherSectionProps} />
      ))
    }
  </div >
);

// a garden variety mapStateToProps
// const mapStateToProps = state => ({
//   sections: state.directory.sections
// })

// mapStateToProps, destructing directory first
// const mapStateToProps = ({ directory }) => ({
//   sections: directory.sections
// })

// mapStateToProps using a reselect selector
const mapStateToProps = createStructuredSelector({
  sections: selectDirectorySections
})

export default connect(mapStateToProps)(Directory);