module.exports = {
  //your application id is provided from the runtime environment, do not modify this
  appId: process.env["GEENY_APPLICATION_ID"],

  //user id is needed when you send messages to connected devices
  //replace this string with your user id, check README.md how to do it.
  userId: '14634b94-bfdf-4a21-b220-109fbfc492db',

  //this is the url for sending the messages to connected devices,
  //is provided from the runtime environment, do not modify this
  publishUrl: process.env["GEENY_APPLICATION_BROKER_PUBLISHER_URL"],

  //this is the url for retreiving the messages to connected devices,
  //is provided from the runtime environment, do not modify this
  subscribeUrl: process.env["GEENY_APPLICATION_BROKER_SUBSCRIBER_URL"],

  //this is the auth token for retreiving and sending the messages to connected devices,
  //is provided from the runtime environment, do not modify this
  authToken: process.env["GEENY_APPLICATION_AUTH_TOKEN"],

  //uncoment the message types ids your application is enabled with
  //make sure you include only the message type ids that your application is enabled
  //check README.md for more details
  //do not modify the names, if you are not sure
  /* subscribeMessageTypes: {
     'a2d38aa9-cc72-4790-8554-ffbd11925cb6': 'skaleMeasure',
     '8a41092a-4a07-461d-9274-8409f60ac7e4': 'skaleButton',
     '54121087-14f1-4c2a-835f-117681618cc9': 'develco'
   },*/

  subscribeMessageTypes: {
    'a2d38aa9-cc72-4790-8554-ffbd11925cb6': 'skaleMeasure',
    '8a41092a-4a07-461d-9274-8409f60ac7e4': 'skaleButton',
  },

  //this defines the message store structure
  //usually you have to modify the limits if needed
  //if you modify this, make sure you update the other files also.
  messages: {
    skaleMeasure: {
      items: [],
      limit: 1000
    },
    skaleButton: {
      items: [],
      limit: 100
    },
    skaleCommand: {
      items: [],
      limit: 100
    },
    all: {
      items: [],
      limit: 10000
    }
  },

  //here you specify your connected things
  //this is useful when sending commands the connected devices
  // check README.md for details
  things: {
    /*TheSkale: { 
      id: "c6cf0125-ba53-4e94-aad1-1e112e610895", 
      "name": "TheSkale", 
      "serial_number": "E8196B03-5B06-4700-B6A7-460E1480C24F", 
      "thing_type": "a4526b26-cc04-4205-a8d3-c4a8dab1389d", 
      "created": "2017-12-15T10:31:02.284Z" 
    },*/
    TheSkale: {
      thingId: 'c6cf0125-ba53-4e94-aad1-1e112e610895',
      messageTypeId: 'fc7a9697-f98e-4f51-8b23-fd1b8b8f02e1',
      cmd_led_on: 0xED,
      cmd_led_off: 0xEE,
      cmd_tare: 0x10,
      cmd_info: 0xEC
    }
  }
}
