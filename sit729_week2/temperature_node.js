const net = require("net");

// const host = "127.0.0.1";
const host = "localhost";
const port = 6000;

const areas = [ "Mallee", "Wimmera", "South West", "Northern Country", "North Central", "Central", "North East", "East Gippsland", "West and South Gippsland"];

const client = net.createConnection(port, host, () => {
    console.log("Connected");
    setInterval(() => {
        const random_area = areas[Math.floor(Math.random() * areas.length)];
        const temp = Math.floor(Math.random() * 40) + 1;
        // client.write(`temp,` + temp);
        client.write(`temp, ${temp}, ${random_area}`);
    }, 2000); // Interval in milliseconds (2000ms = 2 seconds)
});

client.on("data", (data) => {
    console.log(`Received: ${data}`);
});

client.on("error", (error) => {
    console.log(`Error: ${error.message}`);
});

client.on("close", () => {
    console.log("Connection closed");
});