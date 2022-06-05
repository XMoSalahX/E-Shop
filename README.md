# E-SHOP

E-Shop is a web application that allows you to buy and sell products as it is an integrated system that covers all services related to e-commerce.

## What You're Getting

```bash
┌── Back-end # The folder responsible for the backend of the website.
│   ├── documentation # The folder responsible for the documentation of the backend.
│   │   └── api-swagger-endpoints.yaml # The file responsible for the documentation of the backend.
│   ├── migrations # The folder responsible for the migrations of the backend.
│   │   ├── sqls # The folder responsible for the sql files of the backend.
│   │   │   ├── 20220406220048-user-down.sql # The file responsible for removing the user table.
│   │   │   ├── 20220406220048-user-up.sql # The file responsible for creating the user table.
│   │   │   ├── 20220406220133-admin-res-down.sql # The file responsible for removing the admin resource table.
│   │   │   ├── 20220406220133-admin-res-up.sql # The file responsible for creating the admin resource table.
│   │   │   ├── 20220411190845-seller-category-down.sql # The file responsible for removing the seller category table.
│   │   │   └── 20220411190845-seller-category-up.sql # The file responsible for creating the seller category table.
│   │   ├── 20220406220048-user.js # The file responsible for the migration of the user table.
│   │   ├── 20220406220133-admin-res.js # The file responsible for the migration of the admin resource table.
│   │   └── 20220411190845-seller-category.js # The file responsible for the migration of the seller category table.
│   ├── spec # The folder responsible for the specification of the backend.
│   │   └── support # The folder responsible for the support of the specification of the backend.
│   │       └── jasmine.json # The file responsible for jasmine configuration of the specification of the backend.
│   ├── src # The folder responsible for the source code of the backend.
│   │   ├── handlers # The folder responsible for the handlers of the backend.
│   │   │   ├── category-D-handeler.ts # The file responsible for the category D handler of the backend.
│   │   │   ├── Seller Control handeler.ts # The file responsible for the seller control handeler of the backend.
│   │   │   ├── UploadFiles.ts # The file responsible for the upload files of the backend.
│   │   │   └── user_handerler.ts # The file responsible for the user handeler of the backend.
│   │   ├── middlewares # The folder responsible for the middlewares of the backend.
│   │   │   ├── authorization.ts # The file responsible for the authorization of the backend.
│   │   │   ├── check category d.ts # The file responsible for the check category d of the backend.
│   │   │   └── multer.ts # The file responsible for the multer of the backend.
│   │   ├── model # The folder responsible for the models of the backend.
│   │   │   ├── Seller Control Model.ts # The file responsible for the seller control model of the backend.
│   │   │   ├── uploadFiles_Model.ts # The file responsible for the upload files model of the backend.
│   │   │   ├── Seller Control Model.ts # The file responsible for the seller control model of the backend.
│   │   │   └── user_model.ts # The file responsible for the user model of the backend.
│   │   ├── Route # The folder responsible for the routes of the backend.
│   │   │   └── route.ts # The file responsible for the route of the backend.
│   │   ├── template # The folder responsible for the templates of the backend.
│   │   │   └── verify email.ts # The file responsible for the verify email of the backend.
│   │   ├── tests # The folder responsible for the tests of the backend.
│   │   │   ├── helpers # The folder responsible for the helpers of the tests of the backend.
│   │   │   │   └── reporter.ts # the file responsible for make report for jasmine unit testing.
│   │   │   ├── 0userSpec.ts # The file responsible for the user test of the backend.
│   │   │   ├── 1sellerSpec.ts # The file responsible for the seller test of the backend.
│   │   │   ├── 2category-DSpec.ts # The file responsible for the category D test of the backend.
│   │   │   └── 3UploadFileDSpec.ts # The file responsible for the upload files test of the backend.
│   │   ├── utlities # The folder responsible for the utilities of the backend.
│   │   │   ├── checker.ts # The file responsible for the checker functions of the backend.
│   │   │   ├── error_response.ts # The file responsible for the error response of the backend.
│   │   │   ├── mail controler.ts # The file responsible for the mail controler of the backend.
│   │   │   └── swagger doc.ts # The file responsible for the swagger doc of the backend.
│   │   ├── database.ts # The file responsible for the database of the backend.
│   │   └── server.ts # The file responsible for the server of the backend.
│   ├── upload # The folder responsible for the upload of the backend.
│   ├── database.json # The file responsible for the database of the backend.
│   ├── package.json # Npm package manager file.
│   ├── README.md # This file.
│   └── tsconfig.json # The file responsible for the typescript configuration of the backend.
├── Front-end # The folder responsible for the front-end of the website.
│   └── readme.md # Readme file for front-end.
├── .gitiignore # The file responsible for the gitignore of the website.
└── Readme.md # This file.
```

## Back-end Documentation

Go to backend documentation: [Click here](./Back-end/)

## Front-end Documentation

Go to front-end documentation: [Click here](./Front-end/)
