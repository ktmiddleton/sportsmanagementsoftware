# Sports Management Software

## Contributors
Kobe Middleton

Collin Katz

Software Development Project for Loyola University Maryland, Computer Science Capstone CS496

## Project Description
The project plans to create "LoyolaFit," a new app for Loyola's Department of Recreation and Wellness (RecWell), to fix problems with the current IMLeagues software. People have complained about IMLeagues being hard to use, having too many ads, limited payment options, and making administrative work difficult. LoyolaFit aims to be easy to use and flexible enough to support different sports, fitness classes, and intramural leagues. Additionally, users will be able to complete required forms and pay their team dues on the platform. It will serve as a central location for RecWell's activities, allowing for easy customization of leagues and teams, making admin tasks smoother, and letting guests sign up for fitness and pool activities.

## Installation Instructions
There is no "installation" required in order to run and use the app. The only app that you are required to have on your computer is **Docker Desktop**. Since the application is dockerized and runs in a container, much like a virtual machine, this container handles all of the setup for you.

### Installing Docker Desktop
Information on how to install and run docker desktop can be found below
#### Windows
<a href="https://docs.docker.com/desktop/install/windows-install/">Windows Installation Guide</a>
#### macOS
<a href="https://docs.docker.com/desktop/install/mac-install/">Mac Installation Guide</a>
#### Linux
<a href="https://docs.docker.com/desktop/install/linux-install/">Linux Installation Guide</a>

## How to Run
1. Open the **Docker Desktop** application
2. Clone the project repository using git to a location on your system as desired.
3. Open a command line/terminal window.
4. Navigate to the outtermost directory of the project `sportsmanagementsoftware/`
5. Run the command `docker compose up` in the terminal
6. Now if all goes well you should be able to access the frontent via <a href="https://localhost:3000">localhost:3000</a> and backend endpoints for the API run on <a href="https://localhost:8000">localhost:8000</a>
7. To take down the application simply do `^c` in the terminal window in which you ran the application
8. Now run the command `docker compose down --rmi all` this will remove the applications docker images from your system and will allow you to re-run the application with a fresh start

## How to Test
In order to run tests, you must have installed all the requirements to run the app locally outside of a docker container
**You must have node and python 3 installed in order to run the tests**
### Testing frontend
1. Navigate to the `reactinterface/` subdirectory of the project in a terminal
2. run `npm install` to install the node packages required for the project
3. now run `npm test` to run the available tests for the frontend

### Testing backend
1. Navigate to the `sportsserver/` subdirectory of the project in a terminal
2. running the command: `pip install -r requirements.txt` will install the requirements for the project
3. Running the command: `python manage.py test` will run all available tests for django on the backend
