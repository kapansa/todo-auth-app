# Todo Application

This is a web-based Todo application that allows users to manage their tasks and view the weather forecast for their city. The application provides various authentication options, including email/password, Google, and Facebook. Users can create, read, update, and delete their todo items once authenticated.

## Features

- User authentication with multiple options (email/password, Google, Facebook)
- Create, read, update, and delete todo items
- View weather forecast for the user's city

## Technologies Used

The application is built using the following technologies:

- Frontend: React
- Backend: Firebase
- Authentication: Firebase Auth
- Database: Firestore
- Weather API: Open Weather from Rapid API

## Installation

1. Clone the repository: `git clone https://github.com/kapansa/todo-auth-app.git`
2. Navigate to the project directory: `cd todo-auth-app`
3. Install the dependencies: `npm install`

## Configuration

Before running the application, you need to set up the necessary configurations:

1. Create a Firebase project and set up Firebase Auth and Firestore.
2. Obtain API keys for Google and Facebook authentication if required.
3. Sign up for the Open Weather API and obtain an API key.

Once you have the required configurations, create a `.env` file in the root directory of the project and add the following variables:

1. RAPID_API_KEY=YOUR_API_KEY
2. RAPID_API_HOST=YOUR_RAPID_API_HOST

## Usage

To start the application, run the following command:

`npm start`

This will start the development server, and you can access the application in your browser at `http://localhost:3000`.

## Contributing

Contributions are welcome! If you find any bugs or want to enhance the application, feel free to open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
