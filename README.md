<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/abecirovic3/Auction-App">
    <img src="https://i.imgur.com/azpeC0F.png" alt="Logo" width="83" height="94">
  </a>

  <h3 align="center">Auction App</h3>

  <p align="center">
    Auction App is a fullstack web application for online auctions.
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#technology-stack">Technology Stack</a>
      <ul>
        <li><a href="#frontend">Frontend</a></li>
        <li><a href="#backend">Backend</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#frontend-prerequisites">Frontend Prerequisites</a></li>
        <li><a href="#backend-prerequisites">Backend Prerequisites</a></li>
      </ul>
    </li>
    <li>
      <a href="#deployment">Deployment</a>
      <ul>
        <li><a href="#frontend-application">Frontend Application</a></li>
        <li><a href="#backend-application">Backend Application</a></li>
      </ul>
    </li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

## Technology Stack

### Frontend

Technologies used:
* ReactJS
* Sass

### Backend

Technologies used:
* Java
* Spring Boot
* PostgreSQL

## Getting Started

### Frontend Prerequisites

In order the run the frontend part of the application you will need to have <a href="https://nodejs.org/en/" target="_blank"> Node JS </a> installed. 

To start the app, in the project directory, you can run:

`npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

In order to use the image upload services you will need to have a valid <a href="https://imgur.com/" target="_blank"> Imgur </a> Client-ID. To get a Client-ID you will need to register your app. You can do so by following <a href="https://apidocs.imgur.com/" target="_blank"> these </a> instructions. After you have your Client-ID, you can than run the app like this:

```sh
REACT_APP_IMGUR_API_KEY=<YOUR CLIENT-ID> npm start
```

Or you can set the `REACT_APP_IMGUR_API_KEY` environment variable.


### Backend Prerequisites

In order to run the Spring Boot application you will need to setup PostgreSQL in your system. If you aren't already familiar with PostgreSQL, you can refer to this <a href="https://www.postgresql.org/" target="_blank"> link </a> to get started.

After PostgreSQL is setup correctly, you will need to create a database with the name `auctionapp`, so the application can connect to it.

To run the app you can either use <a href="https://maven.apache.org/" target="blank"> Maven </a> or start the app from your code editor. For development <a href="https://www.jetbrains.com/idea/" target="_blank"> IntelliJ IDEA </a> code editor was used.

If Maven is setup on your system, in the project root directory run the command:

```sh
mvn spring-boot:run
```

If everything went well the server should start and the connection to the database should be established.

To check available routes open [http://localhost:8080/swagger-ui/](http://localhost:8080/swagger-ui/)

## Deployment

<a href="https://www.heroku.com/" target="_blank">Heroku</a> is used for application deployment.

### Frontend Application

Frontend ReactJS application is deployed at <a href="https://auction-app-1.herokuapp.com/" target="_blank">https://auction-app-1.herokuapp.com/</a>.

### Backend Application

Backend Spring Boot application is deployed at <a href="https://auction-api-1.herokuapp.com/" target="_blank">https://auction-api-1.herokuapp.com/</a>.

## Contact

Ajdin Becirovic - [@Ajdin Becirovic](https://www.facebook.com/ajdin.becirovic.1/) - abecirovic3@etf.unsa.ba


