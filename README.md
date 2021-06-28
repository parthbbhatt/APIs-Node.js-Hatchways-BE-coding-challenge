# Blog Posts
##### Hatchways BE assessment


## Specifications
Here are the versions of the technologies I used:

>* node.js - 14.17.0
>* chai - 4.3.4
>* express - 4.17.1
>* node-fetch - 2.6.1
>* router - 1.3.5
>* chai-http - 4.3.0


## Installation


To install the project, I have included the package.json file which lists the dependencies that are required. Please use the command:
```bash
npm install
```
This will ensure all packages are installed.

## Getting started
To run the application, ensure you are in the directory where the app.js is located and run:
```bash
node app.js
```
It should say "listening on port {insert your port}". You can now make api calls.


Available API calls are:
>* /api/ping  -  used to see if the server is running
>* /api/posts
>   * tags - required query parameter to search for post by their tags
>   * sortBy - optional query parameter to sort posts by specific attributes listed below:
>      * id
>      * reads
>      * likes
>      * popularity
>   * direction - optional query parameter to sort the posts in either asc (ascending) or desc (descending) order 

To test the API endpoints, run:
```bash
npm test
```

## Contributing
By Parth Brahmbhatt
