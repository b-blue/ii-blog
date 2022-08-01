# I3 Blog

This project is a hypothetical internal company blog that allows users to add, edit and delete articles. The landing page is a list of all articles, and searching for a specific article in this list by title is supported. 

You can check out a live demo of this application [by clicking here.](https://blog.b-blue.dev)

---

## Application Design

||Frontend|Backend|
|---|---|---|
|Built using|React|Amazon Web Services|
|Design|Material UI|
|Routing|react-router-dom|API Gateway|
|HTTP|axios|Lambda Functions|
|Persistence| |DynamoDB|

For this application, I knew I wanted a React frontend because I've built several React apps already and find its architecture matches my thinking about designing and reusing frontend components. The frontend is written in ES6 and JSX. I also like the Material UI library for its simplicity and presentation, `axios` as an HTTP client, and `react-router-dom` for simple routing. 

Each feature in the spec represented a particular view to me:
- `/` shows the list of all articles. It is the "home page" of the app.
- `/new/` provides a panel where a new article can be composed and submitted.
- `/article/{id}/` provides a panel where an existing article can be viewed, edited and saved. This panel also allows an article to be deleted, so that all editing operations are in a single part of the application. 

For the backend, I decided on a simple Lambda controller that persists articles to a DynamoDb table through Amazon Web Services' API Gateway. Distributing the API into discrete routes that can each be tied to a separate Lambda integration gives flexibility to the backend for future requirements. without altering the frontend consumption patterns. 

---

## Controller

The controller is invoked from the frontend by the `src/api-interface/api-interface.js` class. There are four basic operations: 

- `GET` | `apiGetAll` 
    - This function retrieves all articles in the DynamoDB table. 
- `GET` | `apiGet(id)`
    - This function retrieves a single article using its id as a handle.
- `PUT` | `apiSave`
    - This function leverages the idempotence of the HTTP PUT verb to both save new articles, and to update existing articles.
- `DELETE` | `apiDelete(id)`
    - This function deletes an article using its id as an identifier. The user is prompted to confirm deletion by separate logic before this method is invoked. 

The backend implementation of the controller, which runs as a Lambda function, is available in the `src/LambdaController.js` file. The contents of this file are identical to the AWS Lambda function.
