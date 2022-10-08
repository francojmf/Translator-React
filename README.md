# This is a translate implementation of the OpenAI API

It's possible to translate a sentence to a different language while choosing which model to use.

## Setup

1. If you don’t have Node.js installed, [install it from here](https://nodejs.org/en/)
2. Clone this repository
3. Navigate into the project directory

   ```bash
   $ cd 'FOLDER'
   ```

4. Install the requirements

   ```bash
   $ npm install
   ```
## Getting started

1. Make a new folder in pages/constants/
2. Make a new file api.key.js
3. Enter your OpenAPI Api key in following manner:

```js
const apiKey = "YOUR_API_KEY";
const organization = "YOUR_ORG_ID";

const _apiKey = apiKey;
const _organization = organization;

export { _apiKey as apiKey, _organization as organization};
```

4. Run
```sh
npm run dev
```