const net = require("net");

// const host = "127.0.0.1";
// const host = "localhost";
const host = "192.x.x.x";
const port = 5000;

function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

const client = net.createConnection(port, host, () => {
    console.log("Connected");

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    setInterval(async () => {

        const operand1 = getRandomNumber(1, 100).toFixed(2);
        const operand2 = getRandomNumber(1, 100).toFixed(2);
        const operators = ["add", "sub", "mul", "div"];

        for (const operator of operators) {
            client.write(`${operator},${operand1},${operand2}\n`);
            await delay(100);
        }
    }, 100);
});

client.on("data", (data) => {
    console.log(`Received: ${data}`);
    // process.exit(0);
});

client.on("error", (error) => {
    console.log(`Error: ${error.message}`);
});

client.on("close", () => {
    console.log("Connection closed");
});