# Personal Budget Tracker


A <b>Personal Budget Tracker</b> is a Full Stack application which uses ReactJs as frontend and Django REST framework as Backend  , which allows users to manage their income and expenses. The application will enable users to add, edit, and delete transactions.The functionalities are :
<br/>
 - <b>User Authentication</b>: Enable user registration and login functionality using Django's REST framework authentication system.
<br />
 * ### <b>Add, Edit, and Delete Transactions</b>:-
    *  Add expenses which have a name and a cost
    *  Remove expenses
    *  View how much of their budget is remaining
    *  View how much they've spent so far
</br>
<br/>
* ### <b>Dashboard</b>: Display an overview of the user's financial situation, including total Budget, total Spent, and Total Remaining.
<br/>

## <b>Frontend</b>
### Using Context API - Context API is a (kind of) new feature added in version 16.3 of React that allows one to share state across the entire app (or part of it) lightly and with ease.This is the alternative to "prop drilling" or moving props from grandparent to child to parent, and so on
```
npm install
npm start
npm install react-bootstrap bootstrap
npm install axios
```

## <b> Backend </b>
### Using Django REST Framework - Django REST framework (DRF) is a powerful and flexible toolkit for building Web APIs. Its main benefit is that it makes serialization much easier. Django REST framework is based on Django's class-based views
```
pip install django
pip install djangorestframework
pip install djnago-cors-headers
```
## These 2 key points are building blocks of Web Technologies.

 * ### In the back-end, we will create API using Django- rest (having methods like GET, POST).
 * ### In front-end, we will consume the API made in Django by hitting it using React.
 
## Authentication
### 1. The communication between a web browser and a server over HTTP is stateless, meaning that each request is independent and has no relation to other requests. 
<br/>

### 2. The server does not keep track of the user interacting with it on the frontend. However, Django, a web framework, provides powerful features to enable stateful interactions.
<br/>

### 3. With Django, you can easily set up a user authentication app within minutes, making client/server requests identifiable and traceable. The server can store information in a database to determine the user associated with each request.
<br/>

### 4.You can write your Django backend as a REST API using the Django Rest Framework.
<br/>

### 5. The Django API can run at localhost 8000, while the React frontend can run at localhost 3000. React can send requests to Django using Axios, and you can implement session authentication.

<br/>

## Procedure

### - Sessions in Django are stateful and work as follows: 
* When a user sends login credentials, the server validates them and generates a session. 
* The session is stored on the backend, and the session ID is sent to the browser.
* The session ID is then stored in the browser as a cookie and sent with every subsequent request to the server.
* This allows the server to identify and authenticate the user for each request based on the session information stored on the backend.



## Video - https://drive.google.com/file/d/1Ho8nKcIxq3sKqkE_VT2gDn6A7SUvVOHE/view?usp=sharing
<br/>

# Thank You
