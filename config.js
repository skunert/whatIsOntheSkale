module.exports = {
  appId: process.env["GEENY_APPLICATION_ID"],
  userId: '559d0faf-09de-4e69-a150-73acb412906b',
  publishUrl: process.env["GEENY_APPLICATION_BROKER_PUBLISHER_URL"],
  subscribeUrl: process.env["GEENY_APPLICATION_BROKER_SUBSCRIBER_URL"],
  authToken: process.env["GEENY_APPLICATION_AUTH_TOKEN"],
  messageTypes: {
    'a2d38aa9-cc72-4790-8554-ffbd11925cb6': 'skaleMeasure',
    '8a41092a-4a07-461d-9274-8409f60ac7e4': 'skaleButton',
    '54121087-14f1-4c2a-835f-117681618cc9': 'develco'
  },
  messages: {
    skaleMeasure: {
      items: [],
      limit: 1000
    },
    skaleButton: {
      items: [],
      limit: 100
    },
    develco: {
      items: [],
      limit: 100
    },
    all: {
      items: [],
      limit: 10000
    }
  },
  things: {
    smart_plug_1: {
      thingId: 'b14a4a0c-203d-42da-8005-423682eabc17',
      messageTypeId: '5d610b4f-5532-4e24-b46f-c355bdd99958',
      cmd_on: 'on',
      cmd_off: 'off'
    },
    smart_bulb_1: {
      thingId: '9bc506fa-218c-469a-8149-230107410825',
      messageTypeId: '5d610b4f-5532-4e24-b46f-c355bdd99958',
      cmd_on: 'on',
      cmd_off: 'off'
    },
    skale_1: {
      thingId: '64d3ad49-bb22-4687-b959-b83d6a186a0a',
      messageTypeId: 'fc7a9697-f98e-4f51-8b23-fd1b8b8f02e1',
      cmd_led_on: 0xED,
      cmd_led_off: 0xEE,
      cmd_tare: 0x10,
      cmd_info: 0xEC
    }
  }
}
