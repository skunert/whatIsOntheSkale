const defaultState = {
  CurrentSummationDelivered: '0 Wh',
  InstantaneousDemand: '0 W',
  MeasuredValue_Illuminance: '',
  MeasuredValue_Temperature: '25.5 °C',
  NetworkLinkAddress: '',
  NetworkLinkDevice: 'GW',
  NetworkLinkFer: '3 %',
  NetworkLinkPer: '0 %',
  NetworkLinkRssi: 'RSSI: -57.5 dBm',
  NetworkLinkStrength: '97 %',
  Occupancy: '',
  OnOff: 'Off',
  PrimarySwVersion: '3.4.4',
  ZoneStatus: 'not alarmed'
}

redis = {}

module.exports = {
  get: async (userId, thingId) => {
    try {
      const state = redis[`${userId}:${thingId}`]
      if (state == null) return defaultState
      else return state
    } catch (err) {
      console.log(err)
      return defaultState
    }
  },
  set: async (userId, thingId, state) => {
    try {
      redis[`${userId}:${thingId}`] = state
    } catch (err) {
      console.log(err)
    }
  }
}
