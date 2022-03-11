const mosca = require('mosca')
const security = require('./securityPolicies')

let config = {PORT: 5000}
let broker = new mosca.Server({
    /*backend: {
        type: 'redis',
        redis: require('redis'),
        port: '6379',
        host: 'localhost',
        return_buffers: true // to handle binary payloads
      },*/
    port:config.PORT/*,
    persistence: {
        factory: mosca.persistence.Redis
      }*/
})

broker.authenticate = security.authenticate
//broker.authorizePublish = security.authorizePublish
//broker.authorizeSubscribe = security.authorizeSubscribe

broker.on('ready', () => {
    console.log(`Broker corriendo sobre puerto: ${config.PORT}`)
})

broker.on('clientConnected', (client) => {
    console.log(`cliente conectado id: ${client.id}`)
    broker.publish({
        topic: '/raspberry/topic',
        payload: 'El borker te saulda'
    }, ()=> {
        console.log('Broker envió mensaje')
    })
})

broker.on('clientDisconnecting', (client) => {
    console.log(`cliente desconectandose id: ${client.id}`)
})

broker.on('clientDisconnected', (client) => {
    console.log(`cliente deesconectado: ${client.id}`)
})

broker.on('published', (packet, client) => {
    if (packet.topic.split("/")[0] != "$SYS") {
        console.log(`Mensaje: ${packet.payload.toString()} recibido en topico: ${packet.topic}`)
    }
})

broker.on('subscribed', (topic, client) => {
    console.log(`cliente ${client.id} suscrito a topico: ${topic}`)
})

broker.on('unsubscribed', (topic, client) => {
    console.log('cliente conectado')
})