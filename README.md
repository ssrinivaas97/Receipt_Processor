## Steps to start running and testing the app.

1)  Clone the repository into your local environment
2)  Open terminal and go into the repository until you see the docker and docker compose yml file.
3)  Run the command - 'docker-compose up --build' to run the dockerized setup.
4)  Test the endpoints through postman
5)  Endpoints are
      Process receipt (POST) - http://localhost:3000/receipts/process
    
      Get Points (GET) - http://localhost:3000/receipts/{id}/points
