import React from 'react';

const DictionaryTable = ({ dictionary }) => {
  // Function to render table rows
  const renderTableRows = () => {
    return Object.keys(dictionary).map((key) => {
      return (
        <tr key={key}>
          <td>{key}</td>
          <td>{dictionary[key]}</td>
        </tr>
      );
    });
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Key</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>{renderTableRows()}</tbody>
    </table>
  );
};

export default DictionaryTable;
