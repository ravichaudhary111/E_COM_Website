# E_COM_Website

## Description
This repository contains the codebase for an e-commerce API developed in Node.js with TypeScript and Express. The API offers comprehensive functionality for product management, user accounts, and order processing, adhering to industry best practices for scalability, security, and maintainability.



## Installation


```bash
npm install @types/express@4.17.21 
npm install bcrypt@5.1.1
npm install dotenv@16.3.1 
npm install express@4.18.2 
npm install jsonwebtoken@9.0.2 
npm install mongoose@8.0.2
```
```bash
npm install @types/bcrypt@5.0.2 
npm install @types/joi@17.2.3 
npm install @types/jsonwebtoken@9.0.5 
npm install jest@29.7.0 ts-node@10.9.1 
npm install typescript@5.3.2 --save-dev

```
## Implemented
#### User Account Management
* Authentication: Secure user registration and authentication mechanisms using JWT for user access.
* Endpoints: API endpoints for user registration, login, and profile management.
* Data Security: Implemented password hashing and encryption best practices to ensure user data security.

#### Product Management
 * Endpoints: CRUD operations for products are available via API endpoints.
* Product Data: Products are represented with attributes like name, description, price, ratings, and stock availability.
* Data Validation: Implemented data validation, error handling, and proper HTTP status codes for product-related actions.

#### Order Processing
* Order Endpoints: Designed endpoints for creating and managing customer orders.
* Functionality: Implemented order placement, status updates, and retrieval of order history.
* Validation: Included validation and error handling for order-related operations.

#### Data Storage and Persistence
* Database: Utilizing a Non-relational database (e.g., MongoDB) for efficient data storage and interaction.
* Relationships: Established necessary relationships between products, users, and orders in the database.

## CURL for API

### user creation
It allows the creation of two types of users.
#### admin: [curl](https://desktop.postman.com/?desktopVersion=10.20.0&userId=20672701&teamId=3723244&entity=folder-72ac15b5-f68a-4849-bc09-952a9cb6937e)

Allow to add product in store.
```
{"role": "admin"}
```
```
curl --location 'http://localhost:4000/api/users/registerUser' \
--header 'accept: */*' \
--header 'accept-language: en-US,en;q=0.9' \
--header 'cache-control: no-cache' \
--header 'Content-Type: application/json' \
--data-raw '{
    "username": "ravi02",
    "mobileNumber": "99599****1",
    "email": "ravi02@gmail.com",
    "role": "admin",
    "password": "ravi1235"
}'
```
#### customer: [curl](https://desktop.postman.com/?desktopVersion=10.20.0&userId=20672701&teamId=3723244&entity=folder-ec0a6dad-29e3-4959-807f-bb41686faccb)

Allow to shop the product.
```
{"role": "user"}
```
```
curl --location 'http://localhost:4000/api/users/registerUser' \
--header 'accept: */*' \
--header 'accept-language: en-US,en;q=0.9' \
--header 'cache-control: no-cache' \
--header 'Content-Type: application/json' \
--data-raw '{
    "username": "parshant1",
    "mobileNumber": "99599****2",
    "email": "parshant1@gmail.com",
    "role": "user",
    "password": "parshant1234"
}'
```

### user login : [curl](https://desktop.postman.com/?desktopVersion=10.20.0&userId=20672701&teamId=3723244&entity=folder-bee71b09-c532-4197-8c51-d93a3df321f7)

* they can log in using a mobile number and password.
```
{
    "mobileNumber": "9959915351",
    "password": "ravi1235"
}
```

* they can log in using their email number and password.

```
{
    "email": "ravi02@gmail.com",
    "password": "ravi1235"
}
```

```
curl --location 'http://localhost:4000/api/users/login' \
--header 'accept: */*' \
--header 'accept-language: en-US,en;q=0.9' \
--header 'cache-control: no-cache' \
--header 'Content-Type: application/json' \
--data '{
    "mobileNumber": "9959915351",
    "password": "ravi1235"
}'
```


### add  product in store  [curl](https://desktop.postman.com/?desktopVersion=10.20.0&userId=20672701&teamId=3723244&entity=request-072b0dfc-d6d9-40b4-9331-7e87a94cae8f)

only the admin is allowed to add the product.
```
curl --location 'http://localhost:4000/api/products/create' \
--header 'accept: */*' \
--header 'accept-language: en-US,en;q=0.9' \
--header 'cache-control: no-cache' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer eyJhbG' \
--data '{
    "name": "Power bank",
    "description": "It is emergency power backup",
    "price": 999,
    "stock": 50
}'
```
### Get store items [curl](https://desktop.postman.com/?desktopVersion=10.20.0&userId=20672701&teamId=3723244&entity=folder-c54b4942-8fc9-4366-8d0e-8083af89b643)

* you can search products using the name-
```
{
    "search":"laptop"
}
```
* you can sort the product by name and price.
```
"sortKey": "price",
```
```
  "sortKey": "name",
```
* you can also select sort order the product by increment and decrement.
```
"sortOrder": "dec"
```
```
"sortOrder": "asc"
```

```
curl --location 'http://localhost:4000/api/products/' \
--header 'accept: */*' \
--header 'accept-language: en-US,en;q=0.9' \
--header 'cache-control: no-cache' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer eyJhbG' \
--data '{
    "page": 0,
    "size": 5,
    "sortKey": "price",
    "sortOrder": "dec"
}'
```

### Get store individual item by ID [curl](https://desktop.postman.com/?desktopVersion=10.20.0&userId=20672701&teamId=3723244&entity=folder-64d7d4cf-7daa-4f5d-a225-0ee0e881f335)
```
curl --location 'http://localhost:4000/api/products/getProductById/657080f691e7a1d32b650f1e' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer eyJhbG'
```
### update product [curl](https://desktop.postman.com/?desktopVersion=10.20.0&userId=20672701&teamId=3723244&entity=folder-70a6a39b-6086-45db-b821-345504d1af2b)
```
curl --location --request PUT 'http://localhost:4000/api/products/updateProduct' \
--header 'accept: */*' \
--header 'accept-language: en-US,en;q=0.9' \
--header 'cache-control: no-cache' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer eyJhbGci' \
--data '{
   "productId":"657080f691e7a1d32b650f1e",
    "price": 1237,
    "stock": 100
}'
```
### Delete the product [curl](https://desktop.postman.com/?desktopVersion=10.20.0&userId=20672701&teamId=3723244&entity=folder-1a084746-3856-4d56-ac4f-78abe5365227)
```
curl --location --request DELETE 'http://localhost:4000/api/products/deleteProduct/657080f691e7a1d32b650f1e' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer eyJhbGc'
```
### Add review [curl](https://desktop.postman.com/?desktopVersion=10.20.0&userId=20672701&teamId=3723244&entity=folder-2238520b-07aa-4e8b-a8f7-0da2fbfdb775)
```
curl --location 'http://localhost:4000/api/products/addReview' \
--header 'accept: */*' \
--header 'accept-language: en-US,en;q=0.9' \
--header 'cache-control: no-cache' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer eyJhbGciOiJ' \
--data '{
 "productId":"657081f091e7a1d32b650f28",
  "rating":1, 
  "remarks" :"111 product"
}'
```

### create order

```
curl --location 'http://localhost:4000/api/orders/create' \
--header 'accept: */*' \
--header 'accept-language: en-US,en;q=0.9' \
--header 'cache-control: no-cache' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer eyJhbGciOiJI' \
--data '{
    "userId": "6570650bd9be285272a1451d",
    "products": [
        {
            "productId": "6570814191e7a1d32b650f20",
            "quantity":5
        },
         {
            "productId": "6570835091e7a1d32b650f2e",
            "quantity":2
        }
    ]
}'
```
### get order history [curl](https://desktop.postman.com/?desktopVersion=10.20.0&userId=20672701&teamId=3723244&entity=folder-7beac5de-5418-4865-bc87-45494439d829)
```
curl --location 'http://localhost:4000/api/orders//history/6570650bd9be285272a1451d' \
--header 'accept: */*' \
--header 'accept-language: en-US,en;q=0.9' \
--header 'cache-control: no-cache' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer eyJhbGciOiJI'
```
### Update Status of the order [curl](https://desktop.postman.com/?desktopVersion=10.20.0&userId=20672701&teamId=3723244&entity=folder-ea6d9f39-824e-45ea-af79-f84ae6ba1a88)
```
curl --location --request PUT 'http://localhost:4000/api/orders/updateStatus' \
--header 'accept: */*' \
--header 'accept-language: en-US,en;q=0.9' \
--header 'cache-control: no-cache' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer eyJhbGci' \
--data '{
    "orderId":"657213807dc98aae478a869e", 
    "status":"delivered"
}'
```
### delete order product
```
curl --location --request DELETE 'http://localhost:4000/api/products/deleteOrder/657080f691e7a1d32b650f1e' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer eyJhbGci'
```


