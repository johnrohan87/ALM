/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require('path');

// Implement the Gatsby API “onCreatePage”. This is
// called after every page is created.
exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions;

  // page.matchPath is a special key that's used for matching pages
  // only on the client.
  if (page.path.match(/^\/almaccount/)) {
    page.matchPath = '/almaccount/*';

    // Update the page.
    createPage(page);
  }
  if (page.path.match(/^\/almlogin/)) {
    page.matchPath = '/almlogin/*';

    // Update the page.
    createPage(page);
  }
};

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === 'build-html') {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /auth0-js/,
            use: loaders.null(),
          },
        ],
      },
      resolve: {
        modules: [path.resolve(__dirname, 'src'), 'node_modules'],
      },
    });
  } else {
    actions.setWebpackConfig({
      resolve: {
        modules: [path.resolve(__dirname, 'src'), 'node_modules'],
      },
    });
  }
};
