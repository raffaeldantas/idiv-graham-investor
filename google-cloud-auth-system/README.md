# Google Cloud Authentication System

This project implements an authentication system using Google Cloud services. It provides a framework for handling user authentication through Google accounts.

## Project Structure

```
google-cloud-auth-system
├── src
│   ├── main.ts          # Entry point of the application
│   ├── auth
│   │   ├── googleAuth.ts # Handles Google authentication
│   │   └── index.ts      # Exports authentication classes and functions
│   ├── config
│   │   └── googleConfig.ts # Configuration for Google authentication
│   └── types
│       └── index.ts      # Type definitions for user data and tokens
├── package.json          # NPM configuration file
├── tsconfig.json         # TypeScript configuration file
└── README.md             # Project documentation
```

## Setup Instructions

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd google-cloud-auth-system
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Configure Google Authentication:**
   - Create a project in the Google Cloud Console.
   - Enable the Google Identity API.
   - Create OAuth 2.0 credentials and obtain the `clientId` and `clientSecret`.
   - Update the `src/config/googleConfig.ts` file with your credentials.

4. **Run the application:**
   ```
   npm start
   ```

## Usage Guidelines

- The application initializes a server that listens for authentication requests.
- Use the `GoogleAuth` class to handle sign-in and sign-out processes.
- Ensure that the necessary environment variables and configurations are set before running the application.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.