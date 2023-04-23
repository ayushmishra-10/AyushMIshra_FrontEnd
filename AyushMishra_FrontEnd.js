//Q.1. Explain what the simple List component does.
// Ans:- The 'List' component from React renders a list of items with the option to select one at a time.
// The component receives an array of objects as the 'items' prop, and from this array, the list
// items are generated. The text property of each object in the array should be the 'text' that 
// will be shown for the list item.
//    The 'SingleListItem' component of the 'List' component serves to represent a single list item. 
// It requires four arguments: text, the text to be displayed for the list item, onClickHandler, which 
// is a function to be called when the item is clicked, and index, which is the index of the item in 
// the items array.


// Q.2. There are a few problems/warnings with the code:

//Ans:- 1) In the 'SingleListItem' component, the 'onClickHandler' prop is not properly defined. It should be defined
//    as a function that takes an event object as an argument and returns another function that calls 
//    'onClickHandler(index)' with the index of the item as an argument. This can be fixed by changing 
//    'onClick={onClickHandler(index)}' to 'onClick={(e) => onClickHandler(index)}' .

// 2) The 'isSelected' prop in the 'SingleListItem' component is being set to the 'selectedIndex' state variable, 
//    which is not a boolean but rather the index of the currently selected item. This can be fixed by changing 
//    'isSelected={selectedIndex}'to 'isSelected={selectedIndex === index}' .

// 3) In the 'WrappedListComponent' component, the 'setSelectedIndex' state setter function is being used incorrectly.
//    It should be called as 'setSelectedIndex(newValue)' instead of 'setSelectedIndex(null)' .

// 4) In the 'WrappedListComponent' component, the items prop is defined as an array of objects, but the array propType 
//    definition should be wrapped in 'PropTypes.arrayOf()' .


//Here is the Debugged code

import React, { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';


const WrappedSingleListItem = ({
  index,
  isSelected,
  onClickHandler,
  text,
}) => {
  return (
    <li
      style={{ backgroundColor: isSelected ? 'green' : 'red'}}
      onClick={() => onClickHandler(index)}
    >
      {text}
    </li>
  );
};

WrappedSingleListItem.propTypes = {
  index: PropTypes.number,
  
  isSelected: PropTypes.bool,
  onClickHandler: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

const SingleListItem = memo(WrappedSingleListItem);


const WrappedListComponent = ({
  items,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    setSelectedIndex(null);
  }, [items]);

  const handleClick = index => {
    setSelectedIndex(index);
  };

  return (
    <ul style={{ textAlign: 'left' }}>
      {items.map((item, index) => (
        <SingleListItem
          onClickHandler={() => handleClick(index)}
          text={item.text}
          index={index}
          isSelected={selectedIndex === index}
        />
      ))}
    </ul>
  )
};

WrappedListComponent.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
  })),
};

WrappedListComponent.defaultProps = {
  items: null,
};

const List = memo(WrappedListComponent);

export default List;