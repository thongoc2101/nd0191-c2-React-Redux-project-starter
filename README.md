Employee Polls Project

This is the starter code for the final assessment project for Udacity's React & Redux course.
The _DATA.js file represents a fake database and methods that let you access the data. 

------- Data ---------
There are two types of objects stored in database:
1. Users
2. Questions

-------- Your code will talk to the database via 4 methods: -------
1. _getUsers() Method
Description: Get all of the existing users from the database.
Return Value: Object where the key is the user’s id and the value is the user object.

2. _getQuestions() Method
Description: Get all of the existing questions from the database.
Return Value: Object where the key is the question’s id and the value is the question object.

3. _saveQuestion(question) Method
Description: Save the polling question in the database. If one of the parameters are missing, an error is thrown. Parameters: Object that includes the following properties: author, optionOneText, and optionTwoText. 

4. _saveQuestionAnswer(object) Method
Description: Save the answer to a particular polling question in the database. If one of the parameters are missing, an error is thrown. Parameters: Object that contains the following properties: authedUser, qid, and answer. 

------- Installation --------
Run npm install to download all dependencies.

Available Scripts
In the project directory, you can run:

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
