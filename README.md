# TodoIsh - An Web App to keep in touch with your todos

## Api Reference

### User Routes

> Get a user info

```javascript
Route -> .../api/user/:userId

// USERID is required
```

> Register user

```javascript
Route -> .../api/register

// Three fields are required

body = {
    "name": "Hitesh Choudhary", // This is required
    "email": "hitesh@lco.com", // Email should be unique
    "password": "somepassword" // This is required
}
```

> Login User

```javascript
Route -> .../api/login

// Two fields are required

body = {
    "email": "hitesh@lco.com", // This is required
    "password": "somepassword" // This is required
}
```

>Logout User

```javascript
Route -> .../api/logout

// No value from fronted is needed
```

### Todo Routes

> Get a Todo
```javascript
Route -> .../api/todo/:todoId

// TODOID is required
```

> Create a todo

```javascript
Route -> .../api/todo/create/:userId

// Two fields and a USERID are required

body = {
    "title": "MyTodo", // This is required
    "tasks": ["Task 1","Task 2"] // This is optional
}
```

> Remove a Todo

```javascript
Route -> .../api/todo/delete/:userId/:todoId

// TODOID and a USERID are required
```

## Response Objects

### User Responses

```javascript
// After Login this is returned as response
{
  "token": "sometoken",
  "user": {
    "_id": "637db07adb62fee3ce1f2bd5",
    "name": "Hitesh Choudhary",
    "email": "hitesh@lco.com"
  }
}

// User Object
{
  "_id": "637db07adb62fee3ce1f2bd5",
  "name": "Swayangdipta Das",
  "email": "a@gmail.com",
  "todos": [
    {
      "_id": "637e04e8865d682d60f8d15f",
      "title": "second todo",
      "tasks": [
        "t1",
        "t2"
      ],
      "createdAt": "2022-11-23T11:32:56.353Z",
      "updatedAt": "2022-11-23T11:32:56.353Z",
      "__v": 0
    }
  ],
  "createdAt": "2022-11-23T05:32:42.924Z",
  "updatedAt": "2022-11-23T13:11:45.877Z",
  "__v": 0
}
```

### Todo Responses

```javascript
    // Fetching Todo Response
    {
    "_id": "637e04e8865d682d60f8d15f",
    "title": "second todo from thunder client",
    "tasks": [
        "t1",
        "t2"
    ],
    "createdAt": "2022-11-23T11:32:56.353Z",
    "updatedAt": "2022-11-23T11:32:56.353Z",
    "__v": 0
    }

    // After Creating todo this response will be sent
    {
    "todos": [
        "637e04e8865d682d60f8d15f",
        "637e2547994d6d48c3c35625"
    ],
    "todoId": "637e2547994d6d48c3c35625"
    }
```