const net = require("net");
const port = 6000;

let temp;
let wind;
let rain;
let fire;
let request_area;
let area;

const weather_data = {
    "Mallee": { temp: null, wind: null, rain: null, fire: "NO RATING" },
    "Wimmera": { temp: null, wind: null, rain: null, fire: "NO RATING" },
    "South West": { temp: null, wind: null, rain: null, fire: "NO RATING" },
    "Northern Country": { temp: null, wind: null, rain: null, fire: "NO RATING" },
    "North Central": { temp: null, wind: null, rain: null, fire: "NO RATING" },
    "Central": { temp: null, wind: null, rain: null, fire: "NO RATING" },
    "North East": { temp: null, wind: null, rain: null, fire: "NO RATING" },
    "East Gippsland": { temp: null, wind: null, rain: null, fire: "NO RATING" },
    "West and South Gippsland": { temp: null, wind: null, rain: null, fire: "NO RATING" },
};

const server = net.createServer((socket) => {
    console.log("Client connected");

    socket.on("data", (data) => {
        const strData = data.toString();
        console.log(`Received: ${strData}`);

        const command = strData.split(",");
        const name = command[0];
        let value = 0;

        if (name == "fire") {
            value = command[1].trim();
        }
        else {
            value = parseFloat(command[1]);
        }

        if (name != "request") {
            area = command[2].trim();
            console.log(area);
        }

        let result;
        let fire_warining;
        console.log(name);
        console.log(value);


        switch (name) {
            case "temp":
                console.log(value);
                // temp = value;
                weather_data[area][name] = value;
                result = "ok";
                break;
            case "rain":
                console.log(value);
                // rain = value;
                weather_data[area][name] = value;
                result = "ok";
                break;
            case "wind":
                console.log(value);
                // wind = value;
                weather_data[area][name] = value;
                result = "ok";
                break;
            case "fire":
                console.log(value);
                // fire = value;
                weather_data[area][name] = value;
                result = "ok";
                break;
            case "request":
                request_area = command[1].trim();
                let area_data = weather_data[request_area];
                console.log(request_area);

                if (area_data.temp > 20 && area_data.rain < 50 && area_data.wind > 30) {
                    result = `Weather Warning for ` + request_area;
                }
                else
                    result = `Everything fine for ` + request_area;

                fire_warining = area_data.fire;
                socket.write(`\nFire warning for ${request_area} : ${fire_warining}\n`);
                break;

        }
        socket.write(result.toString());
    });

    socket.on("end", () => {
        console.log("Client disconnected");
    });

    socket.on("error", (error) => {
        console.log(`Socket Error: ${error.message}`);
    });
});

server.on("error", (error) => {
    console.log(`Server Error: ${error.message}`);
});

server.listen(port, () => {
    console.log(`TCP socket server is running on port: ${port}`);
});