# Welcome to the Covid19 Management System!

## System Description

The Covid19 Management System was developed to streamline the management of COVID-19 related information among members of an HMO. This system provides comprehensive features for tracking vaccination records, managing member data, and monitoring pandemic-related data.

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

![image](https://github.com/SaraOsdi/hadasim_home_assignment/assets/144591438/6e37af9a-50fd-4a30-84b2-45a45f31bd74)

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
Axios, Mantine, ReactDom, Multer.


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
5. POST /image: Image uploading. transfers to a middleware for convention the picture.



### Database:

- The database stores the application's data in a structured format.
- It consists of tables to organize data.

### Schematic View of Information in the Database:
![image](https://github.com/SaraOsdi/hadasim_home_assignment/assets/144591438/94e907cd-5491-4c68-86f1-0a0ac41067a4)

- members table: Stores information about members.
Id, name, address,date of birth and phone numbers.
- members_data table: Stores information about vaccinations and morbidity per member. this table is linked to the members table by id (not the official one). It contains dates of every vaccinations. vaccine manufactorer, morbidity(one time only) and recovery.
Note that pictures save locally on the server since only jpg is supported, it saved under the id_official in Public.




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
Pay attention to dates, you cannot add a second vaccinations without the first one and a vaccin manufatorer, you cannot add recovery date without a positive date, vaccination manufactorer name without any vaccination etc.
Click submit to save.
You can upload a jpg image for each member whenever you want.
New member: Add new in the main page below the headline, fill in the detailes with attention to their correctness, click submit.
You will see immediately the new record in the list.


Dasboard:
You can see in the graph how many active patients were in each day of the last month.
Below you can see how many members didn't get any vaccine.


## Screenshots

### Homepage:
![image](https://github.com/SaraOsdi/hadasim_home_assignment/assets/144591438/bcf35510-1071-45f4-b1db-6a4fde70851c)
![image](https://github.com/SaraOsdi/hadasim_home_assignment/assets/144591438/3a5e0d46-1059-40e9-a65b-526a7221a74e)


### Statistics on Covid19:
![image](https://github.com/SaraOsdi/hadasim_home_assignment/assets/144591438/442b622f-75a3-419d-9a2f-a796a40e9586)


### Adding New Member:
![image](https://github.com/SaraOsdi/hadasim_home_assignment/assets/144591438/7215be26-063c-49dd-ab60-85b1047cad3b)


### Basic Member Information:
![image](https://github.com/SaraOsdi/hadasim_home_assignment/assets/144591438/13ae0c56-4a2a-48e1-8521-d35f87823920)


### Edit Member Details:
![image](https://github.com/SaraOsdi/hadasim_home_assignment/assets/144591438/8bb5cce9-52a1-42b4-b142-b92f1c39b88b)


### Member Covid19 Details:
![image](https://github.com/SaraOsdi/hadasim_home_assignment/assets/144591438/423447d1-5a90-452f-8c92-12a1be1cfb90)

![image](https://github.com/SaraOsdi/hadasim_home_assignment/assets/144591438/9cab7965-9088-487f-956e-93f57e2e7b4d)

### Edding a Picture:
![Uploading image.png…]()


### Editing a Particular Vaccine:
![image](https://github.com/SaraOsdi/hadasim_home_assignment/assets/144591438/be51baca-d566-4574-9929-ba7acbdc5ed2)


### Edit/Add a Sick or Recovery Day:
![image](https://github.com/SaraOsdi/hadasim_home_assignment/assets/144591438/06a3d7e0-e148-467a-b753-cc1a97c24ecc)



## Contact Me

For any questions or further assistance, please contact me via email: saraosditcher@gmail.com or through my social media profiles.
