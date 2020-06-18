# The problem 🤯 #
When the shops, restaurants and studios reopen, they have to somehow manage their visitors, guests and patients so that the distances etc. can be kept. Customers also have an interest in not being in full shops, practices, etc. This will remain the case until at least spring 2021.

# The solution 💡 #
With "Platzhalter.io", businesses and non-profits can easily manage their availabilities and thus meet their requirements.
The customer, on the other hand, books his or her project relaxed by using a smartphone. This avoids queues in front of and in shops.
"Platzhalter.io" combines simple usability with data economy, which in turn allows business and coexistence despite Covid19.
If "Platzhalter.io" is a relief, the user can donate. 

# What it does 🎫 #
Businesses and non-profits can assign fixed slots and appointments to their customers and thus easily avoid queues, waiting times and distance problems. There is no technical know-how, no installation necessary - this applies to both the businss and the customer.

# Technology used 💻 #
In general Javascript, Frontend with Typescript, Backend tba.

# Team 🧝🏻‍♀️🧝🏻‍♀️🧝🏻🧝🏻 #
Platzhalter.io is a project started at ITC1's digital hackathon.

- Stefanie Susser, UX/UI & Product Design
- Thomas Bergwinkl, Backend
- Jörn Bernhardt, Frontend
- Kristina Juse, Marketing & Project Management

# Building / setup 🛠 #

To start the backend server, run:

```
docker-compose up
```

If you need to rebuild the code, run `docker-compose build`. To make 
development faster, use frontend and backend as docker volumes and add them to
the docker command or use your own `docker-compose.yml` file.

## Deployment ##
To initialize the server, run `server-install.sh`. It will setup the (Ubuntu)
server by creating a user to work with and install docker if its not installed
yet.

When running `server-update.sh`, a new version of the docker file will be 
built, the image uploaded and the uploaded image loaded into the hosts docker
system. It will then restart the service and run it.
