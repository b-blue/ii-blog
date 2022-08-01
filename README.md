# I3 Blog

This project is a hypothetical internal company blog that allows users to add, edit and delete articles. Searching by article title is also supported. 

## Development Process

For this application, I knew I wanted a React frontend because I've built several React apps already and find its architecture matches my thinking about designing and re-using frontend components. I also like the Material UI library for its simplicity and presentation, axios as an HTTP client, and react-router-dom for simple routing. 

Each feature in the spec represented a particular view to me:
    - /home/ shows the list of all articles. 
    - /new/ provides a panel where a new article can be composed and submitted.
    - /id/ provides a panel where an existing article can be viewed, edited and saved. 
        - This panel also allows an article to be deleted, so that all editing operations are in a single part of the application. 
    - /search/ provides a field where users can search for a specific post by title. 

For the backend, I decided on a simple Lambda controller that persists articles to a DynamoDb table through Amazon Web Services' API Gateway. I want my applications to be scalabe and extensible, and cloud solutions are perfect for that. 
    - The code for the Lambda controller is in the LambdaController.js file. 

## Composition

While I hardcoded the article schema for brevity, I could also have used the useReducer hook with calls to a dispatcher. I think that's a more elegant approach, especially when used in conjunction with the useContext hook for state management, but here I was moving quick! 

The UUID/GUID identifying the article is generated on the frontend because UUIDs do not repeat. Offloading this concern keeps my controller simple. If I were making a standalone backend application rather than a cloud badckend I could also consider moving some of these processes to the implementation class of a given controller's interface, also to prevent a "busy controller." 

I used the HTTP PUT verb because it allowed me to use the same endpoint to add or create resources (it's idempotent - after the first call, it just does the same thing). My DynamoDB table's key was the Id property of the payload object, so if it found a matching key it simply overwrites the record. 

The bonus feature of searching by title is implemented as a simple filter on the retrieved posts. If the query is empty (as in the case of hitting backspace until the box contains no text)