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
