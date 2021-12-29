const request = require("request");
const chalk = require("chalk");
// -----------------

const geocode = (location, callback) => {
    const query = location;
    const accessKey = "780dbb2dc6b5f4fd4ead74c87a8f3d09";
    const url = `http://api.weatherstack.com/current?access_key=${accessKey}&query=${query}`;

    request({ url, json: true }, (error, { body }) => {
        // console.log(body);
        if (error) {
            callback(
                chalk.black.bgRed("Unable to fetch data from server."),
                undefined
            );
        } else if (body.location === undefined) {
            callback(chalk.black.bgRed("Location not found."), undefined);
        } else {
            callback(undefined, {
                temp: body.current.temperature,
                city: body.location.name,
                discription: body.current.weather_descriptions,
            });
        }
    });
};

module.exports = geocode;
