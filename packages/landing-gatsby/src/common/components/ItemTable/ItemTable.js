import React, { useEffect, useState } from 'react';

function ItemTable({ items }) {
  const [Items, setItems] = useState(items);
  useEffect(() => {
    console.log('Items', Items);
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
          ? Items.feed.forEach((element) => {
              <td>{element['file text']}</td>;
              <td>{element['ip']}</td>;
              <td>{element['list position']}</td>;
              <td>{element['persons id']}</td>;
              <td>{element['update feed']}</td>;
              <td>{element['url']}</td>;
            })
          : ''}
      </tbody>
    </table>
  );
}

export default ItemTable;
