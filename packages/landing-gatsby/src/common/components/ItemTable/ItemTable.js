import React, { useEffect } from 'react';

function ItemTable({ items }) {
  useEffect(() => {
    console.log('items', items);
  }, [items]);
  return (
    <table>
      <thead>
        <tr>
          <th>Item Name</th>
          <th>Item Description</th>
          {/* Add more table headers if needed */}
        </tr>
      </thead>
      <tbody>
        {items
          ? items.feed.forEach((element) => {
              <td>{element}</td>;
            })
          : ''}
      </tbody>
    </table>
  );
}

export default ItemTable;
