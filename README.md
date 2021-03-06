# Points

Hello! Thank you for taking the time to test out this application and read through the documentation.

This application is built using Node.js and the Express framework.

## Download Instructions

1. First, **clone** this repo on to your local machine. Run `git clone https://github.com/jordanmoore753/Points.git` on your command line in the directory where you want the repository to be cloned to.
2. Now, navigate to the directory with `cd Points`.
3. If you do not have Node.js installed, install it using the following guide: [Node.js Installation](https://nodejs.org/en/download/).
4. **npm** should already be installed once Node.js is done installing, but if it wasn't, install it using the following guide: [npm Install Guide](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).
5. Run `npm install` to install the dependencies required for this project.
6. Run `npm start` to start the application.

## API Documentation

The API is accessible at `http://localhost:3000`. I suggest using [Postman](https://www.postman.com/downloads/) or Insomnia for accessing this API, as there is no client to interact with.

The state of the application is stored in memory. There is exactly one user by the name of 'Jordan' that is usable in the application for this exercise.

There are several different routes and these are detailed below.

### POST `/reset`

The `/reset` endpoint resets the application's state to a blank slate. It will return the newly reset state of the application in JSON, like so:

```json
{
    "name": "Jordan",
    "transactions": [],
    "payers": [],
    "payerBalances": {},
    "balance": 0
}
```
This endpoint is useful for when you want to make several `/users/1/add` calls and build up the state on your own.

### POST `/populate/:id`

This endpoint sets the application's state to pre-filled state. There are 3 distinct cases one can use if they do not want to call the `/users/:id/add` endpoint several times. It is provided simply for convenience. Substitute either `1`, `2`, or `3` for `:id` in the request. The three provided cases one can use are:

**Case 1**
```json
{
    "name": "Jordan",
    "transactions": [
        {
            "payer": "DANNON",
            "points": 1000,
            "transactionDate": "2000-06-12T19:30"
        },
        {
            "payer": "UNILEVER",
            "points": 500,
            "transactionDate": "2001-06-12T19:30"
        },
        {
            "payer": "UNILEVER",
            "points": -400,
            "transactionDate": "2002-06-12T19:30"
        },
        {
            "payer": "UNILEVER",
            "points": -50,
            "transactionDate": "2003-06-12T19:30"
        },
        {
            "payer": "DANNON",
            "points": 2000,
            "transactionDate": "2004-06-12T19:30"
        },
        {
            "payer": "DANNON",
            "points": 3000,
            "transactionDate": "2004-06-12T19:30"
        }
    ],
    "payers": [
        "DANNON",
        "UNILEVER"
    ],
    "payerBalances": {
        "DANNON": 6000,
        "UNILEVER": 50
    },
    "balance": 6050
}
```

**Case 2**
```json
{
    "name": "Jordan",
    "transactions": [
        {
            "payer": "DANNON",
            "points": 1000,
            "transactionDate": "2000-06-12T19:30"
        },
        {
            "payer": "UNILEVER",
            "points": 500,
            "transactionDate": "2001-06-12T19:30"
        },
        {
            "payer": "UNILEVER",
            "points": -400,
            "transactionDate": "2002-06-12T19:30"
        },
        {
            "payer": "DANNON",
            "points": 2000,
            "transactionDate": "2003-06-12T19:30"
        },
        {
            "payer": "UNILEVER",
            "points": -50,
            "transactionDate": "2004-06-12T19:30"
        },
        {
            "payer": "DANNON",
            "points": 3000,
            "transactionDate": "2004-06-12T19:30"
        }
    ],
    "payers": [
        "DANNON",
        "UNILEVER"
    ],
    "payerBalances": {
        "DANNON": 6000,
        "UNILEVER": 50
    },
    "balance": 6050
}
```
**Case 3**: This is the test case provided in the exercise (the dates are slightly different but same order).
```json
{
    "name": "Jordan",
    "transactions": [
        {
            "payer": "DANNON",
            "points": 300,
            "transactionDate": "2000-06-12T19:30"
        },
        {
            "payer": "UNILEVER",
            "points": 200,
            "transactionDate": "2001-06-12T19:30"
        },
        {
            "payer": "DANNON",
            "points": -200,
            "transactionDate": "2002-06-12T19:30"
        },
        {
            "payer": "MILLER COORS",
            "points": 10000,
            "transactionDate": "2003-06-12T19:30"
        },
        {
            "payer": "DANNON",
            "points": 1000,
            "transactionDate": "2004-06-12T19:30"
        }
    ],
    "payers": [
        "DANNON",
        "UNILEVER",
        "MILLER COORS"
    ],
    "payerBalances": {
        "DANNON": 1200,
        "UNILEVER": 200,
        "MILLER COORS": 10000
    },
    "balance": 11300
}
```
### GET `/users/1/balances`

This endpoint returns the user's current positive balances from its payers. Of course, for a normal application, the `1` would be supplemented with an `:id` in the documentation, but in this case we only have the one user so we can just say `1`. 

For Case 3, the response (JSON) will look like:

```json
{
    "DANNON": {
        "balance": 1100
    },
    "UNILEVER": {
        "balance": 200
    },
    "MILLER COORS": {
        "balance": 10000
    }
}
```
### POST `/users/1/add`

This endpoint allows you to add points to the user's state. There are three required fields in the JSON body: `points`, `payer`, and `transactionDate`.

1. `points` must be an integer.
2. `payer` must be a string.
3. `transactionDate` must be a string of 16 characters following this format: `YYYY-MM-DDTHH:MM` (The `T` stands for **time**). The time is in the Hour:Minute format and is done on European/Military time.

The request's JSON body should look like so:

```json
{
    "payer": "MILLER COORS",
    "points": 10000,
    "transactionDate": "2004-11-01T14:00"
}
```
The response will be the same JSON body as the request, or it will return with an error in JSON format.

### POST `/users/1/deduct`

This endpoint allows you to deduct points from the user. There is only one required field in the JSON: `amount`, and this should be an integer.

An example request using Case 3:

```json
{
  "amount": 5000
}
```
The response from the server:

```json
{
  "DANNON": {
      "amountDeducted": -100
  },
  "UNILEVER": {
      "amountDeducted": -200
  },
  "MILLER COORS": {
      "amountDeducted": -4700
  }
}
```