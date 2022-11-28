## Teacher Supply Donation Web Application
Oregon State University Fall 2022 CS467 Online Capstone Project

https://tsdonation.live

**Developers/Authors:**
- Alice Fisher
- Joel Swenddal
- Sean Park

## Get Started
After cloning the project, create a `.env` file in the root directory.

Place the following in the file:

```
PORT=8000
REACT_APP_BACKEND_URL=http://localhost:3000
REACT_APP_GOOGLE_CLIENT=<Your Google Client ID>
```

The React app will run on Port 8000 and proxy to localhost:3000 where the Express app should be running on.

When developing locally, `REACT_APP_BACKEND_URL` will point to the local express server.  For deployment, `REACT_APP_BACKEND_URL` is set to the Donation Web API's URL.

`REACT_APP_GOOGLE_CLIENT` is required for the GoogleOAuthProvider component to function properly.  You can get the Client ID by registering an application in the Google Cloud console.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:8000](http://localhost:8000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.
