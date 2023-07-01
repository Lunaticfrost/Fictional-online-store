# Fictional-online-store

A fully functional REST API using Node.js and the Express.js framework.
The API should allow users to perform the following actions:-
- Create, Read, Update, and Delete products.
- Search for products by name, description, and category.
- Add products to a shopping cart and place orders.
- Register and authenticate users.

## Prerequisites

- Node.js (version 18.12.1)
- MongoDB (version 6.0.6)
  
## How to set up and run the API on a local machine:-

1. Clone the repository or download the zip file in the local machine.
2. Extract and open the folder with VScode.
3. Install dependencies- Open the terminal in current folder
   and run command - "npm install".
4. Database Setup: Start your MongoDB Server.
5. Update the default.json file in config folder with your own values:
     {
    "dbURI": "mongodb://127.0.0.1:27017/OnlineStore", 
    "jwtsecret":    "a40a5cf8dcc5a68ef8795d4359f47f7b1a60a89ee12f50f5d7c339034aa11530fb5513c9eec2c6812503043bbe8e995ac811254878b974e3ff541dcf9e47cb30"
      }
   
6. Run server.js using command - "npm run dev".
   - The API will be running on 'http://localhost:4000'.
   
   
## API Endpoints

- You can check all the endpoints on 'http://localhost:4000/doc'.
  
- Items
    - GET /items: Get all items. (requires token in header)
    - POST /add-item: Add a new item. (requires token in header)
    - PUT /items/:id: Update an existing item. (requires token in header and itemId in url )
    - DELETE /items/:id: Delete an item. (requires token in header and itemId in url)

- Cart
    - GET /cart/:userId: Get items in the cart for a specific user (requires token in header and userId in url)
    - POST /cart/:userId: Add an item to the cart for a specific user (requires token in header and userId in url)
    - DELETE /cart/:userId/:itemId: Delete an item from the cart for a specific user (requires token in header and both userId and itemId in url)

- Orders
    - GET /order/:userId: Get all orders for a specific user. (requires token in header and userId in url)
    - POST /order/:userId: Create a new order for a specific user. (requires token in header and userId in url)

- Authentication
    - POST /register: Register a new user.
    - POST /login: Login with user credentials.
    - GET /user: Get user information (requires token in header).

- Search
    - GET /search/items?q=keyword: Search for items based on their title, description, or category. (requires token in header).



## Register and Authenticate
To test the endpoints that require authentication, follow these steps:

1. Register a new user:

    - Send a POST request to /register with the following payload:
    {
      "name": "Your Name",
      "email": "your-email@example.com",
      "password": "your-password"
    }
    - You will receive a response with a success message and a user token.
   
2. Authenticate and get the token:
    - Send a POST request to /login with the following payload:
    {
      "email": "your-email@example.com",
      "password": "your-password"
    }
   - You will receive a response with a success message and a user token.
   
3. Use the token for authenticated requests:

    - For any authenticated endpoint, add the "x-auth-token" header to your request and set its value to the received user token.


## Example Json Data
  - Adding an Item:- 
      {
      "title" : "Apple iPhone 14 Pro Max",
      "description" : "The iPhone 14 Pro Max measures 160.70 x 77.60 x 7.85mm (height x width…",
      "price" : 130000,
      "category" : "Smartphones"
    }
    



## CONTACT ME IF ANY ERROR PERSISTS
  
