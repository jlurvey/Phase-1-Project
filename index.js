document.addEventListener("DOMContentLoaded", () => console.log("We are connected!"));

//external API or json server with mock back-end
//get working fetch request

document.addEventListener("DOMContentLoaded", () => fetchData/*call with ()?*/);

//hypothetically, get API to fetch data and log in console, then commit, comments present tense "working fetch"

function fetchData() {
    fetch('url')
    .then((resp) => resp.json())
    .then(() => console.log(data))
};