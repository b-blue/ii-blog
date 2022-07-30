# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

## Development Process

For this application, I knew I wanted a React frontend because I've built several React apps already and find its architecture matches my thinking about designing frontends. I also like the Material UI library for its simplicity and presentation, axios as an HTTP client, and react-router-dom for simple routing. 

Each feature in the spec represented a particular view to me:
    - /home/ shows the list of all articles. 
    - /add/ provides a panel where a new article can be composed and submitted.
    - /edit/ provides a panel where an existing article can be loaded, edited and saved. 
        - This panel also allows an article to be deleted, so that all editing operations are in a single part of the application. 
    - /search/ provides a field where users can search for a specific post by title. 

For the backend, I decided on a simple Lambda controller that persists articles to a DynamoDb table through Amazon Web Services' API Gateway. I want my applications to be scalabe and extensible, and cloud solutions are perfect for that. 
    - The code for the Lambda controller is in the LambdaController.js file. 

## Composition

While I hardcoded the article schema for brevity, I could also have used the useReducer hook with calls to a dispatcher. I think that's a more elegant approach, especially when used in conjunction with the useContext hook for state management, but here I was moving quick! 

The UUID/GUID identifying the article is generated on the frontend because UUIDs do not repeat. Offloading this concern keeps my controller simple. If I were making a standalone backend application rather than a cloud badckend I could also consider moving some of these processes to the implementation class of a given controller's interface, also to prevent a "busy controller." 