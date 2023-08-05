import React, { useEffect, useState } from 'react';

function ItemTable({ items }) {
  const [Items, setItems] = useState(items);
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
        {console.log('items', items)}
        {items
          ? items['feed'].map((element) => {
              return (
                <>
                  <td key={element['list position']}>{element['file text']}</td>
                  <td key={element['list position']}>{element['ip']}</td>
                  <td key={element['list position']}>
                    {element['list position']}
                  </td>
                  <td key={element['list position']}>
                    {element['persons id']}
                  </td>
                  <td key={element['list position']}>
                    {element['update feed']}
                  </td>
                  <td key={element['list position']}>{element['url']}</td>
                </>
              );
            })
          : ''}
      </tbody>
    </table>
  );
}

export default ItemTable;
