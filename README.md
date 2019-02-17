# Contact Management

```
• CRUD APIs for a typical contact book app
• Supports adding/editing/deleting contacts from a primary storage(MySQL)
• Allows searching by name and email address
• Supports pagination and return 10 items by default per invocation.
• Added basic authentication for the APIs
```

## Setup Instructions

> NOTE : Make sure Node and mysql installed in the machine

* Clone the repository
* Open MySQL workbench(or alternatives) and run the `schema.sql` file.
* Open shell and naviage to the cloned project folder
* Now run `npm install`
* Then run `npm start`

## Endpoints
```
Running on port 3000

1. Crete a user - "/api/v1/users" [POST]
2. User Login - "/api/v1/users/login" [POST]

** Auth required for below routes **

3. Create a contact - "/api/v1/contacts" [POST]
4. Get all contacts - "/api/v1/contacts" [GET]
5. Pagination - "/api/v1/contacts?page={Number}" [GET]
6. Search a contact - "/api/v1/contacts?search={search-term}" [GET]
7. Limit contacts - "/api/v1/contacts?limit={Number}" [GET]

(5,6,7 APIs can be interchanebly called)

8. Get a contact by id - "/api/v1/contacts/{contactID}" [GET]
9. Delete a contact by id - "/api/v1/contacts/{contactID}" [DELETE]
10. Update a contact by id - "/api/v1/contacts/{ContactID}" [PATCH]
```

## Authors

* **Harish Matta**

## Acknowledgments

* Hat tip to anyone whose code was used



