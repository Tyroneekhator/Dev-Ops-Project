Integrations:

- Discord webhook

## Install required packages

To install packages required to run the application, enter the following into the console:

    npm install

## Update .env file

Add below to .env file. Supply the credentials as needed, by registrering a new github OAUTH application.

    GITHUB_ID=<from github oauth settings>
    GITHUB_SECRET=<from github oauth settings>
    NEXT_AUTH_URL=http://localhost:3000/

### Image hosting configuration

- Create account at https://cloudinary.com

Add the following the your .env file, values to use can be found on your cloudinary dashboard:

    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
    NEXT_PUBLIC_CLOUDINARY_PRESET=
    NEXT_PUBLIC_CLOUDINARY_FOLDER=dev
    CLOUDINARY_URL=

Run the development server and connect production database collection: `npm run dev`

Visit `http://localhost:3000` to view web application locally

To seed the database with recipe data, visit `http://localhost:3000/api/seeder`

To seed the database with user data, visit `http://localhost:3000/api/seed_users`

To see the project stories:, `npm run "storybook"`

To run site interaction testing: `npm run cypress run`

Visit `com619-devops.vercel.app` to see production version of app.
