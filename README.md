# Event Management System
This is a system to manage events and participants, where you can create events, register participants, cancel them, and more. It is developed using SAP Cloud Application Programming (CAP).

## Project Description
This project allows you to manage events and associate participants with these events. The system also connects to an external API_BUSINESS_PARTNER API to query business partner data related to the participants.

### Project Requirements
Events:

Create events with a name, start date, end date, location, and description.  
Query all available events.  
Update existing event details.  
Delete events.  
Cancel and reopen events as needed.  

Participants:

Participants can be registered in a specified event.  
Relevant data like first name, last name, email, phone, and a business partner ID should be stored.  
Participants can only register in existing events.  

Integration with External API (Business Partner):

The external API_BUSINESS_PARTNER is used to query and register business partners.  
Participant data can include a Business Partner ID which is queried from the external API.  

Event and Participant Workflow:

An event can have multiple participants.  
A participant can only register for an event if that event exists.  


## Installation
**Clone this repository:**  
`` https://github.com/Ash19-88/event-management-system ``


Copiar código  
`` git clone https://github.com/Ash19-88/event-management-system ``   
`` cd event-management-system ``  

## Install the dependencies:

Copiar código  
`` npm install ``

**Run the service:**

Copiar código  
`` cds watch ``  
This will start the local server at http://localhost:4004.

**Testing**  
1. Test External API (API_BUSINESS_PARTNER)  
To test querying the external Business Partner API, you can use the following endpoint to fetch all business partners:

Copiar código  
``GET http://localhost:4004/odata/v4/Foo``  
This endpoint is used to query the external Business Partner API.

2. Test Event and Participant Endpoints  
You can use tools like Postman or Insomnia to test the API endpoints for creating, reading, updating, and deleting events and registering participants.

**Contribution**  
If you want to contribute to the project, please follow these steps:

**Fork this repository.**

Create a new branch   
``git checkout -b feature/new-feature``

Make your changes and commit   
``git commit -am 'Add new feature'``

Push to your branch   
``git push origin feature/new-feature``

Open a Pull Request describing your changes.  

## Technologies

SAP Cloud Application Programming (CAP): Framework used to develop the business logic and expose OData endpoints.  
Node.js: Used for running the service and integrations.  
SQLite: In-memory database for development.  
