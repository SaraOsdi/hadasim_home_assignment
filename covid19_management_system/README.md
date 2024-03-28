# Welcome to the Covid19 Management System!

## System Description

The Covd19 Management System was developed to streamline the management of COVID-19 related information among members of an HMO. This system provides comprehensive features for tracking vaccination records, managing member data, and monitoring pandemic-related data.

## Table of Contents
- [System Features](#system-features)
- [System Architecture](#system-architecture)
- [Data Protection](#data-protection)
- [Requirements](#requirements)
- [Installation Instructions](#installation-instructions)
- [Screenshots](#screenshots)
- [Contact Us](#contact-us)

## System Features

- **Advanced Database:** Stores personal records of an HMO members, including personal details and COVID-19 related data.
- **Member Management:** Ability to add, edit, and delete existing members of the HMO.
- **Vaccination Tracking:** Documentation and management of COVID-19 vaccination processes for each member.
- **Pandemic Data Management:** Recording and managing data on positive cases and recoveries.

## System Architecture

The application follows a client-server architecture, with a client-side application interacting with server-side APIs, which in turn interacts with a database to store and retrieve information. 
There are 4 layers in the architecture: 
1. The database layer. 
2. The server layer: the server communicate with the data base and access to the stored data.
3. The API layer: A functions set wich are user exposed to avoid direct access from the user to the server/ database.
4. The client layer.
Here's how the various components of the system interact:

### Client-Side Application:

- Developed in TypeScript using React. the client-side application is responsible for presenting the user interface (UI) to the end-users.
- It communicates with the server-side APIs, to perform CRUD (Create, Read, Update, Delete) operations and retrieve data via HTTP requests (GET, POST, PUT, DELETE) over the network.

- main.tsx - main page
- MembersTable - members detailes, view, edit, create and delete.
- LastMonthChart - represents in a Graph the morbidity for each day in the last month.
- AddMember - handles adding new member and detailes inserting.

Dependencies:
Axios, Mantine, ReactDom.


### Server-Side APIs:

- The server-side APIs, developed in Node.js using Express Framework, act as an intermediary between the client-side application and the MYSQL database.
- They handle incoming HTTP requests from the client-side application and execute corresponding logic.
- Server-side APIs interact with the MYSQL database to perform database operations such as inserting, querying, updating, and deleting data.

- controllers directory - containes functions: getMembers, getMembersDetails.
- routes directory - containes routes to functions in controllers.

Dependencies:
Dotenv, BodyParser, CookieParser, Cors, Morgan.


# Server-Side API Endpoints: 
1. GET /getMembersDetails: Retrieves a list of all members.
2. POST /addMember: Creates a new member.
3. PATCH /updateMember:id: Updates details of a specific member by ID.
4. DELETE /memberId/deleteMember: Deletes a specific member by ID.



### Database:

- The database stores the application's data in a structured format.
- It consists of tables to organize data.
- Entity Framework is used for communication between the server-side APIs and the SQL Server database.

### Schematic View of Information in the Database:

- members table: Stores information about members.
Id, name, address,date of birth and phone numbers.
- members_data table: Stores information about vaccinations and morbidity per member. this table is linked to the members table by id (not the official one). It contains dates of every vaccinations. vaccine manufactorer, morbidity(one time only) and recovery.


### Illustrative illustrations:



## Data Protection

The system uses a musql database to store data, ensuring data integrity and preventing foot faults.

## Requirements

- Node.js, Express
- mysql
- A supported web browser

## Installation Instructions

1. Clone the repository: git clone https://github.com/SaraOsdi/hadasim_home_assignment.git
2. Open the solution file using your favorite IDE.
3. Create a schema in mysql: covid19_management_system and run the sql files for creating the tables.
4. Create an .env file and enter your detailes as described:
    PORT=3302
    DB=your connection string
    HOST=localhost
    USER=root
    PASS=
    DB=covid19_system_management
5. Run Client: 
    A. first install dependencies by: npm i
    B. Run the application: npm run dev
    c. Navigate to http://localhost:5173
6. run Server by: npm start

# How to use the system: 

Main page: containes a list of the members. by clicking on the eye icon you can see their morbidity and vaccinations details.
You can edit the editable detailes - name, address, phone number, cell phone and to add new detailes about vaccinations and morbidity in the empty fields.
Pay attention to dates, you cannot add a second vaccinations without the first one and a vaccin manufatorer, you cannot add recovery date without a positive date etc.
Click submit to save.
New member: Add new in the main page below the headline, fill in the detailes with attention to their correctness, click submit.
You will see immediately the new record in the list.

Dasboard:
You can see in the graph how many active patients were in each day of the last month.
Below you can see how many members didn't get any vaccine.


## Screenshots

### Homepage:


### Statistics on Covid19:


### Adding New Member:


### Basic Member Information:


### Edit Member Details:


### Member Covid19 Details:


### Editing a Particular Vaccine:


### Edit/Add a Sick or Recovery Day:


### Add Vaccination:


## Contact Me

For any questions or further assistance, please contact me via email: saraosditcher@gmail.com or through my social media profiles.
