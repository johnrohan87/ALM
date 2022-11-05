import React from 'react';

// Our global theme context with default values
export const ThemeContext = React.createContext({
  loggedIn: false,
  setLoggedIn: () => {},
});

// Theme provider component with state
const ThemeProvider = (props) => {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const value = { loggedIn, setLoggedIn };

  return (
    <ThemeContext.Provider value={value}>
      {props.children}
    </ThemeContext.Provider>
  );
};

// Exports a ThemeProvider wrapper
export default ({ element }) => <ThemeProvider>{element}</ThemeProvider>;
