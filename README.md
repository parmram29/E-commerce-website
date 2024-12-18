# movie database project
this is a basic movie database website I made using React for the frontend and Node.js with MongoDB for the backend. 
the main purpose was to practice full-stack development

## features
- login using JSON Web Tokens (JWT).
- a login form to authenticate users.
- fetch and display movies stored in a MongoDB database.
- the ability to log out and return to the login page.
- basic error handling for login and fetching data.

## technologies used
- **React**
- **Node.js**
- **MongoDB**
- **Express.js**
- **TailwindCSS**
- **Axios**

## how it works
1. when you open the app, it shows a login page where you can enter your username and password.
2. after login, it fetches a token and stores it in localStorage.
3. you can click the "fetch movies" button to see a list of movies from the backend.
4. there's also a logout button 

## setup instructions
1. clone this repository to your local machine.
2. install dependencies for the backend:
   ```bash
   cd server
   npm install
