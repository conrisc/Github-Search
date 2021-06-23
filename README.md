# Github Search

Github Search is a Single Page Application written in React and Typescript. This app allows us to search github users and view their account details.

### `yarn start`
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

#### Important
Run this project with proper `node-sass` version.
| Node version | node-sass version | comment |
| ------ | ------ | ------ |
| 14 | 4.14 | |
| 15 | 5 | |
| 16 | :( | node-sass is also a dependecy for some other package which currently doesn't support `node-sass v6` |

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

To run tests only in a given path run
`npx react-scripts test ./some/path/to/test/eg/component.test.tsx`

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
