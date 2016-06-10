# Image-Server

## Docker

### What is Docker?

![What is Docker](/Users/danielconger/Desktop/Desktop_Folders/mac-down/docker/what-is.png)

### Why Use Docker?

![What is Docker](/Users/danielconger/Desktop/Desktop_Folders/mac-down/docker/why-use.png)

As a web developer who is part of a collaborative team, you might want to use Docker for several reasons:

1. Docker can help set up a development environment very quickly. Sometimes a team member may be experiencing an error on their machine that you struggle to recreate on your own machine in order to help debug the code. With Docker, you can be assured that the way the code runs on your co-worker's machine is the way it is going to run on your machine.
2. What's more, Docker can give you the confidence that the way your code runs in development is the same way it is going to run in staging, and production.

### Docker Tools to Become Familiar With:

**Docker Toolbox**:
![What is Docker](/Users/danielconger/Desktop/Desktop_Folders/mac-down/docker/docker-toolbox.png)

Docker Toolbox is the "Getting Started" point of setting up Docker on your local machine. See the link in the image above or click [here](https://www.docker.com/products/docker-toolbox) to get started downloading.

**Docker Client (Part of Docker Toolbox)**:

Docker Client is what allows you to interact with the Docker environment (i.e., images and containers, etc.) via your command line.

**Docker Machine (Part of Docker Toolbox)**:

Docker Machine allows you to work with a virtual machine (Linux host) sitting on your OSX or Windows operating system and set up environmental variables within your virtual machine so that Docker Client can then interact with the running containers that we might have within our Linux virtual machine.

![Docker Machine](/Users/danielconger/Desktop/Desktop_Folders/mac-down/docker/docker-hr/docker-machine.png)

In the example above, we have Docker Machine managing our only existing Linux host (this Linux host is called "default").

**Docker-Compose**:

This allows us to run multiple containers and link them together so they can interact with each other. An app typically isn't just a web-server. Oftentimes, we have a database or multiple databases as part of our app, possibly other web-servers that have differing responsibilities, etc. `docker-compose` allows us to bring up multiple containers on the same Linux host and have those containers talk to each other.

![Docker Compose](/Users/danielconger/Desktop/Desktop_Folders/mac-down/docker/docker-hr/docker-compose-1.png)

![Docker Compose](/Users/danielconger/Desktop/Desktop_Folders/mac-down/docker/docker-hr/docker-compose-2.png)

In the two images above, a `docker-compose.yml` file has been created by the team member in the first image (i.e., "compewter").

A second team member, (i.e., "terpewcom") could then pull the team's repo down from GitHub and use the `docker-compose.yml` file that is sitting in that repo to create an identical application environment to the application environment the first team member created.

## Directory Structure

This directory attempts to show how multiple web-servers with differing responsibilities and functionality could be stored within a single parent directory:
	
	├── services/
	|   └── image-server/
	|   |   ├── api/
	|   |   |   ├── Accepted.jsx
	|   |   |   ├── CountdownTimer.jsx
	|   |   |   ├── RequestReceived.jsx
	|   |   |   └── RequestSent.jsx
	|   |   |
	|   |   ├── config/
	|   |   |   ├── environment/
	|   |   |   ├── db.js
	|   |   |   ├── express.js
	|   |   |   └── multer.js
	|   |   |
	|   |   ├── lib/
	|   |   |   ├── aws.js
	|   |   |   └── utils.js
	|   |   ├── test/
	|   |   ├── app.js
	|   |   ├── circle.yml
	|   |   ├── Dockerfile
	|   |   ├── index.js
	|   |   └── package.json
	|
	└── docker-compose.yml
	
The `image-server` is basically in charge of reading `multi-part` form data from a client application via `multer` and saving that image received from the client to AWS S3, and then saving an entry into MongoDB that looks like this:

`{ "_id" : ObjectId("57589e7ded5985b5e2b13dea"), "path" : "https://some-s3-bucket.s3.amazonaws.com/1.jpg", "__v" : 0 }`

## Running the Server

There are two ways to run the application:

1. From within your local machine
2. From within Docker containers

### From within Local Machine:

**Step 1:** From within the root directory:

```sh
npm install
```

**Step 2:** Next, set up an AWS account if you don't already have one.

**Step 3:** Next, create an S3 bucket.

**Step 4:** Next, there is a file within the `config/environment` folder called `secrets.example.js`. Rename that to `secrets.js`. **NOTE:** make sure your `secrets.js` is included within `.gitignore` to avoid publishing your AWS API keys (created in next step) to GitHub.

**Step 5:** Next, create a set of AWS API keys and add those into the `secrets.js` file.


**Step 6:** After installing all dependencies and adding in your AWS keys, turn on MongoDB in terminal:

```sh
mongod
```

**Step 7:** then run node on the index.js file:

```sh
node index.js
```

### From within Docker Containers:

**`docker-compose.yml`**:

This file looks like this:

	web:
	  build: ./services/image-server
	  ports:
	    - "3000:3000"
	  environment:
	    NODE_ENV: development
	  links:
	    - mongo
	mongo:
	  image: mongo
	  command: --smallfiles
	  ports:
	    - "27017:27017"

Within the `image-server/` directory there is a `Dockerfile`.

The `Dockerfile` looks like this:

	FROM node:latest

	COPY . /var/www
	
	WORKDIR /var/www
	
	RUN npm install
	
	EXPOSE 8080
	
	ENTRYPOINT [ "npm", "start" ]
	
**Step 1:** Set up an AWS account if you don't already have one.

**Step 2:** Next, create an S3 bucket.

**Step 3:** Next, there is a file within the `config/environment` folder called `secrets.example.js`. Rename that to `secrets.js`. **NOTE:** make sure your `secrets.js` is included within `.gitignore` to avoid publishing your AWS API keys (created in next step) to GitHub.

**Step 4:** Next, create a set of AWS API keys and add those into the `secrets.js` file.

**Step 5:** From the command line, run `docker-compose up`. This will take a little while to run the first time you run this command.

*What is Happening?*

`docker-compose.yml` is setup to find the `Dockerfile` located at `./services/image-server` and build a Docker image (i.e., snapshot) of your node app.

`docker-compose` also sees the `mongo:` key within the `docker-compose.yml` file and looks to see if you have the MongoDB Docker image available on your computer. If you do not have it available on your computer, then the image will be pulled from Docker Hub and built on your local computer (Note: The part where Docker is building the image on your computer for the first time is what takes such a long time). Once you have Docker images for both the `web` image and the `mongo` image, Docker will build two containers, each container holding one of your images and link them to each other. Now your app is running on a Linux virtual machine and can be accessed by...

## Docker Command Cheatsheet

##### `eval "$(docker-machine env NAME)"`
Sets up your current shell with the variables from `docker-machine env NAME`.

##### `docker ps`
Lists all of your containers.

##### `docker images`
Lists all of your images, these are the building blocks for your containers.

##### `docker-machine start NAME`
Starts your docker virtual machine (only applicable to non Linux).

##### `docker-machine stop NAME`
Stops your docker virtual machine (only applicable to non Linux).

##### `docker-machine env NAME`
Lists the needed ENV variables needed to connect to your virtual machine.

##### `eval "$(docker-machine env NAME)"`
Sets up your current shell with the variables from `docker-machine env NAME`.

##### `docker-machine ip`
Will return the ip address your docker machine is running on.

##### `docker ps -q | xargs docker stop`
Will stop all running containers based on the list from `docker ps`.

##### `docker-compose build`
Will compose your services together based off a root `docker-compose.yml` file.

##### `docker-compose up`
Runs your composed services (asumming you are in the correct directory.

For a full cheatsheet on docker please see the [Docker Cheat Sheet][] repo.

[Docker Cheat Sheet]: https://github.com/wsargent/docker-cheat-sheet