import styled from 'styled-components';

export const HeaderList = styled.div`
  text-align: center;
  margin-top: 20px;

  h1 {
    font-size: 24px;
    margin-bottom: 20px;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    display: flex;
    align-items: center;

    input {
      flex: 1;
      margin-left: 10px;
      padding: 5px;
    }

    button {
      margin-left: 10px;
      padding: 5px 10px;
      cursor: pointer;
    }
  }

  input[type='text'],
  button {
    height: 30px;
    font-size: 14px;
  }

  button {
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  button:hover {
    background-color: #0056b3;
  }
`;

export const List = styled.li`
  display: flex;
  align-items: center;
`;

export const TodoInput = styled.input`
  flex: 1;
  margin-left: 10px;
  padding: 5px;
`;

export const TodoButton = styled.button`
  margin-left: 10px;
  padding: 5px 10px;
  cursor: pointer;
  background-color: ${(props) => (props.primary ? '#007bff' : '#28a745')};
  color: white;
  border: none;
  border-radius: 5px;

  &:hover {
    background-color: ${(props) => (props.primary ? '#0056b3' : '#218838')};
  }
`;
