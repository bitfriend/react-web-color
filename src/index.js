import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

const { Fragment } = React;


// Implement a feature to allow item selection with the following requirements:
// 1. Clicking an item selects/unselects it.
// 2. Multiple items can be selected at a time.
// 3. Make sure to AVOID UNNECESSARY RE-RENDERS (performance).
// 4. Currently selected items should be visually highlighted.
// 5. Currently selected items' names should be shown at the top of the page.

const onClick = (index, selected, setSelected) => {
  const found = selected.findIndex(selItem => selItem === index);
  let newSelected = [];
  if (found === -1) {
    newSelected = [...selected, index];
  } else {
    newSelected = [...selected.slice(0, found), ...selected.slice(found + 1)];
  }
  setSelected(newSelected);
}

const List = ({ items }) => {
  const [selected, setSelected] = useState([]);
  return (
    <Fragment>
      <ul className="Chosen">
        {items.map((item, index) => {
          const found = selected.findIndex(selItem => selItem === index);
          if (found === -1) {
            return null;
          } else {
            return (
              <li key={index}>{item.name}</li>
            );
          }
        })}
      </ul>
      <ul className="List">
        {items.map((item, index) => {
          const found = selected.findIndex(selItem => selItem === index);
          return (
            <li key={item.name} className={`List__item List__item--${item.color}`} onClick={() => onClick(index, selected, setSelected)}>
              <div className={`${found !== -1 && 'selected'}`}>
                {item.name}
              </div>
            </li>
          );
        })}
      </ul>
    </Fragment>
  );
};

// ---------------------------------------
// Do NOT change anything below this line.
// ---------------------------------------

const sizes = ['tiny', 'small', 'medium', 'large', 'huge'];
const colors = ['navy', 'blue', 'aqua', 'teal', 'olive', 'green', 'lime', 'yellow', 'orange', 'red', 'maroon', 'fuchsia', 'purple', 'silver', 'gray', 'black'];
const fruits = ['apple', 'banana', 'watermelon', 'orange', 'peach', 'tangerine', 'pear', 'kiwi', 'mango', 'pineapple'];

const items = sizes.reduce(
  (items, size) => [
    ...items,
    ...fruits.reduce(
      (acc, fruit) => [
        ...acc,
        ...colors.reduce(
          (acc, color) => [
            ...acc,
            {
              name: `${size} ${color} ${fruit}`,
              color,
            },
          ],
          [],
        ),
      ],
      [],
    ),
  ],
  [],
);

ReactDOM.render(
  <List items={items}/>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
