const mqtt = require('mqtt');

const client = mqtt.connect("mqtt://broker.hivemq.com:1883");

var topic="/myid";
var message="My message";

client.on('connect', () => 
{
    console.log('mqtt connected');
    client.publish(topic, message);
    console.log('published to Topic: ' + topic + " with Message: " + message);
}); 

