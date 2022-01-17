# openweathermap-nuxt

# Before Start

Generate personel api key from [github tokens page](https://home.openweathermap.org/api_keys).\
Rename .env.development to .env.\
Fill the API_KEY field in .env file.

## Available Scripts

In the project directory, you can run:

### `yarn dev` or `npm run dev`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test` or `npm run test`

Launches the test runner in the interactive watch mode.\

### `yarn build` or `npm run build`

Builds the app for production.\
It correctly bundles Nuxt in production mode and optimizes the build for the best performance.

Your app is ready to be deployed!

### `yarn docker:build --build-arg API_KEY={API_KEY}`

Builds an image upon which your container will be built.\

### `yarn docker:run`

Runs the app on docker container.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

Welcome to the interview task :)
===============================

If something is not clear or you need help - just ask :smile:. Nobody knows everything!

1. Read the task
2. Create a project
3. Please implement the project according to your own best standards, possibly
   - Tests, tdd
   - Code guidelines
   - Structure / architecture
   - Refactoring
   - Conventions
4. For the layout bootstrap or plain design is enough.
5. Make sure to commit frequently and feel free to stop working on it after 1-2 hours
6. Provide an overview which points you would improve if you had more time to work on the project

N.B.: Please do not make the repo publicly accessible. Send an archive of your repo to us instead.

Scenario - Weathermap api client
---------------------------

Your app should be a client for the [Open Weather Map API](http://openweathermap.org/API#weather) JSON api

Features that should work:

* Display the weather at random geographic coordinates
* A form with city and country that fetches and displays the weather in this city
  - optional: cache the fetched weather data
* Gracefully handle the case where the city could not be found (display the information to the user)

Have fun!
