console.log("Client side javascript file running !");

// add variales
const input = document.querySelector("input");
const form = document.querySelector("form");
const msg_one = document.querySelector("#messageOne");
const msg_two = document.querySelector("#messageTwo");
const msg_three = document.querySelector("#messageThree");
const msg_error = document.querySelector("#messageError");

// Fetch data from weather api

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const query = input.value;

    // Check if query is empty
    if (query === "") {
        msg_error.textContent = "Field Empty, Please provide query";
        msg_two.textContent = "";
        msg_three.textContent = "";
        return;
    }

    msg_one.textContent = "Loading...";
    msg_two.textContent = "";
    msg_three.textContent = "";

    // fetch url from browser
    const url = "http://localhost:3000/weather?search=" + query;

    fetch(url)
        .then((response) => {
            return response.json();
        })
        // get data
        .then((data) => {
            input.value = "";
            const val = data;
            console.log(val);
            msg_error.textContent = "";
            msg_one.textContent = `Temperature : ${val.temp}℃`;
            msg_two.textContent = `City : ${val.city}`;
            msg_three.textContent = `Discription : ${val.discription}`;
        })
        // check if any error exist and then catch the error
        .catch((error) => {
            console.log("error : ", error);
            msg_error.textContent = "Unable to find location. Try Again.";
            msg_one.textContent = "";
            msg_two.textContent = "";
            msg_three.textContent = "";
        });
});
