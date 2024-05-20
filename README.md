* React + Firebase + Tailwind + TMDB-GPT API

- https://main--enchanting-cassata-ebdee9.netlify.app/
    -    or
- https://netflixgpt-c3d11.web.app/
  
# Features

- Login/Sign Up
    - Sign In/ Up form
    - Redirect to Browse Page

- Browse (after Authentication)
    - Header
    - Main Movie
        - Tailer in Background
        - Title & Description
        - Movie Suggestions 
            - Movie List * N

- Netflix GPT
    - Search Bar
    - Movie Suggestions

# Development Flow
- Create React App
- Configure Tailwind CSS
- Header
- Routing - react-browser-router
    - createBrowserRouter([{},{}...])
    - RouterProvider
    - useNavigate()
- Login
  - sign-up/in toggle
  - validation
  - useRef() hook
- Authentication
  - firebase google backend (sign-up sign-in onAuthStateChange)
  - Create Redux-Store
    - save all user object in redux-store @reduxjs/toolkit react-redux
  - update user profile
- Bugfixes :
      - update the user details after sign in
      - restrict navigation of "/browse" without log in, "/sign in" without log out
      - Unsubscribe to `onAuthChanged()` calllback when `header unmounts`
- fetch movies from `TMDB api`


# Netflix GPT

- create-react-app
- configured tailwind css into app
- install n use formic library to work with forms
