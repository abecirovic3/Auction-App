<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/abecirovic3/Auction-App">
    <img src="https://i.imgur.com/DBnqHR8.png" alt="Logo" width="80" height="80">
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


## Contact

Ajdin Becirovic - [@Ajdin Becirovic](https://www.facebook.com/ajdin.becirovic.1/) - abecirovic3@etf.unsa.ba


