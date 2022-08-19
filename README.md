![Solera Logo](https://media-exp1.licdn.com/dms/image/C4E0BAQEv-RmhPPq0aw/company-logo_200_200/0/1599239465539?e=2147483647&v=beta&t=nguMOKesjnpwt44QhXD_BhGtC_EH140V_vjPOBE69Go)


[![NPM Status](https://img.shields.io/npm/v/@craco/craco.svg)](https://www.npmjs.com/package/@craco/craco)

# Solera technical test
This app was created with [Create React App](https://github.com/facebook/create-react-app) with Typescript Templace. You need to have install [Node](https://nodejs.org/en/) for run this proyect. It is recommended to have a version of Node greater than 14 installed

For create React application with Typescript template, Run this command in your [Git bash](https://gitforwindows.org/). Replace `HERE-APP-NAME` with your Application name

### `npx create-react-app HERE-APP-NAME template --typescript`

# Features
- Use of Hooks
- Use of Typescript
- Use of Absolute paths
- Use of Eslint and Prettier
- Use of SCSS
- Good Project Architecture
- Scalable project
- English language support
- Create, Edit, Delete or List Services availables
- Filter Service by Category

# How to run the project on your local machine?

- First you need to clone the project with the following:

### `git clone https://github.com/Husdady/tt-solera.git`

- Copy and paste the above command into Git Bash and hit Enter. The project will start cloning and you will have to wait a few seconds

- Go to the folder where the project is and install the dependencies. If you are using [NPM](https://www.npmjs.com/), use the following command

### `npm install`

- Or if you are using [yarn](https://yarnpkg.com/), use the following command

### `yarn install`

- Finally start the project in development mode with the command

### `npm run start`

- The application will be started on **localhost:3000**. Open your browser and go to the path mentioned above

### Note important
>
> ℹ ️Tests were not added in Jest due to a bug in the [craco](https://www.npmjs.com/package/@craco/craco) library with absolute paths
>

### Author message
>
> Hello, I'm Imanol (Husdady), the Frontend developer who made this project as a technical test. I have tried to follow the best practices for this project, I tried very hard and I think I did it well. In the same way, I request feedback in case of not passing the technical test.
>

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

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

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### `npm run clean-project`
Delete the **node_modules** folder and package-lock.json file

### `npm run lint-check`
Check the rules defined in the **.eslintrc.json** file

### `npm run lint-fix`
Fix bugs found with **Eslint**

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
