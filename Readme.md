# Ecommerce_MERN
Easily deploy ecommerce site within a minute.

Also supports admin features to add product, category, etc.

# Stack:
Backend: NodeJS, Express, Mongoose

Database: MongoDB

# Backend Setup
    -   Go to backend directory
    -   Open command prompt, run "npm install"
    -   Add your mongoDb url inside env file
    -   Optional ( Change PORT or jwt token secret as per your preference )
    -   Run "npm start" to start node server

** 😻 Backend setup complete 😻 **

# Routes to access 
Import this file to postman to easily access all API routes 🚀

    - Ecommerce.postman_collection.json

# All Routes:
-   http://localhost:8000/api/signup - POST
    
    
    Required:
    Name
    Email
    Password

    Optional:
    About

-   http://localhost:8000/api/signin - POST

    
    Required:
    Email
    Password


-   http://localhost:8000/api/signout - GET


-   http://localhost:8000/api/secret/:token - GET


    Provide Details of user profile


-   http://localhost:8000/api/category/create - POST

        Required:
        Name


-   http://localhost:8000/api/product/create - POST

        Required:
        Name
        Description
        price
        category ( Takes category id )
        Quantity
        Photo
    
        Optional
        Shipping ( 1 - Digital Download allowed, 0 - Only shipping )


-   http://localhost:8000/api/product/:productid - GET


- http://localhost:8000/api/product/:productid - DEL


-   http://localhost:8000/api/product/update/:productid - PUT


        Required:
        Name
        Description
        price
        category ( Takes category id )
        Quantity
        Photo
    
        Optional
        Shipping ( 1 - Digital Download allowed, 0 - Only shipping )

- http://localhost:8000/api/category/:categoryid - GET


-   http://localhost:8000/api/category/:categoryid - PUT


-   http://localhost:8000/api/category/:categoryid - DEL


-   http://localhost:8000/api/categories - GET ( All Categories )


-   http://localhost:8000/api/product/related/:productid?limit=2&sortby=_id&order=des - GET


- http://localhost:8000/api/products/by/search - POST


- http://localhost:8000/api/product/photo/:productid - GET


- http://localhost:8000/api/user/:token - GET


- http://localhost:8000/api/user/:token - PUT