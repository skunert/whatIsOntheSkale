# Develco Hackathon Kit #

## Introduction ##

This is the Hackathon Kit for the first Geeny Hackathon. It's a simple NodeJS app
that reads message-streams from Geeny. This sample is intended as initial Boilerplate
template to easily get started with Develco messages. This README is self-contained
documentation about how to get started with this project.

# Step 0. Get yourself a Developer Account.

We are making things super simple for the Hackathon. No worries about onboarding
users. Use *ONE* user to setup the formulas and elements ahead.

# Step 1. Setup Home-Smart-Home.

## Pairing/Login to your Gateway

Pairing the Develco devices is done by accessing the Develco Gateway.
First, go to the IP of your gateway:

```
[Your Gateway IP]:8000/
```

After login and you should be prompted with the following screen

![Alt text](docs/smart-home-1.png?raw=true "Login")


Click the [+] button for adding new devices. You'd need the serial number of your
device which is written in the device itself.

![Alt text](docs/smart-home-2.png?raw=true "Sensor Management")

### Tip:

Remove batteries to force restart of the sensor and get faster pairing. For
wall-powered sensors, plug-unplug.

# Step 2. Deploying This Boilerplate Example

1. Clone this repository `git@prod01-gitlab01.geeny.local:developers/HackathonKit.git`

2. Refer to the [staging
   docs](http://test-docs.geeny.io.s3-website.eu-central-1.amazonaws.com/getting-started/formulas/step-2/)
   to see how the deployment works

### Tip:

Edit the ./build_and_push.sh script for deploying faster.

# Step 3. How to use this Kit

The kit consists of 3 files.

* `app.js` contains the simple endpoints for a web app.
* `worker.js` Polls for new data into your formula
* `server.js` Entry point of the app, starts the `app.js` and `worker.js`.

Once Deployed you have two useful paths utilities to debug your application.

* `<your-app-url>/msgs`: Will render the messages you have got so far (F5/Refresh and
  you should see the new upcoming messages)

* `<your-app-url>/log`: Using the "log" function you can add logs to an internal
  array and analyze them in this path.

* `<your-app-url>/`: Your app could live here.
