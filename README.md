## Overview
This backend system serves as the foundation for a Schedule Management App. Developed using Node.js and Express.js, the application relies on MongoDB to store and manage schedule-related information.

## MongoDB Collections
1. Users Collection
    * _id: MongoDB Object ID
    * name: User's name
    * email: User's email address
    * password: User's hashed password

2. Events Collection

    * _id: MongoDB Object ID
    * userId: Reference to the user
    * title: Event title
    * description: Event description
    * type: Event type (e.g., 'Meeting', 'Appointment', 'Task', etc.)
    * dueDate: Due date of the task
    * time: Time of the event
    * completed: Boolean indicating if the event is completed

## Project Structure
The project follows a modular structure for better organization

* config: Configuration files are housed here, encompassing settings such as database connections.
* controller: This directory is the heart of the application's logic. It is further divided into four files:
    1. controller.js: Contains the core business logic of the application
    2. route.js: Defines routes specific to the module, keeping the codebase organized.
    3. service.js: Manages database queries for the associated APIs, promoting separation of concerns.
    4. validator.js: Responsible for API input validation, ensuring data integrity and security.
* helpers: This directory contains various helper functions that assist in different aspects of the application.
* middleware: Essential middleware components, such as authentication, are stored here to maintain a clean and modular codebase.
* models: All schema definitions related to the project are centralized within this directory.
* routes: The primary route definitions for the project are encapsulated here, promoting a clear separation of concerns.
* utils: Static utility functions reside in this directory, providing reusable tools to enhance code efficiency.

## Getting Started

1. Clone the repository.
2. Navigate to the project directory.
3. Install dependencies using `npm install`.
4. Set up configuration files in the `config` directory, including database connections.
5. Explore the modular structure in the `controller` directory for better understanding of business logic and routing.
6. Utilize the `middleware` and `helpers` directories as needed for additional functionalities.
7. Execute the application by running `npm run dev` for development and `npm start` for production.