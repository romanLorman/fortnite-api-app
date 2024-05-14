# ForniteAPI App
This demonstration project is a single-page application based on the open [Fortnite API](https://fortniteapi.io/).
To showcase my layout skills, I've almost entirely avoided using external style libraries, except for instances related to animation. This project includes responsive design for all device types. Some animations might be too complex for certain phones and are included here solely for demonstration purposes. State management is handled by Redux. I have increased performance by minimizing the creation of unnecessary states through preserving certain data (page number, product id, section name, etc.) in the browser's address bar using React Router capabilities. Finally, by analyzing the capabilities of this open FortniteAPI, I aimed to anticipate and prevent potential errors, as the API is constantly undergoing mutations and modifications.

## GitHub pages 
Open ForniteAPI App(the branch is gh-pages): [https://romanlorman.github.io/fortnite-api-app/]

## Building the app
  1. Get your API from [Fortnite API](https://fortniteapi.io/)
  2. Follow to **fortniteapi.io** and assign your key value to **"export const API_KEY"** insted of **"process.env.REACT_APP_API_KEY"**
