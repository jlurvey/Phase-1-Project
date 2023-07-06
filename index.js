document.addEventListener('DOMContentLoaded', () => console.log('We are connected!'));

//external API or json server with mock back-end
//get working fetch request

document.addEventListener('DOMContentLoaded', () => fetchData());

//hypothetically, get API to fetch data and log in console, then commit, comments present tense "working fetch"

//fetch API data
function fetchData() {
    fetch('https://statsapi.web.nhl.com/api/v1/teams')
    .then((resp) => resp.json())
    .then((data) => {
        allTeamsArray = data.teams
        //console.log(allTeamsArray);
        showTeams(allTeamsArray);
    })
};



//display team information
function showTeams(array) {
    const list = document.getElementById('list');
    list.innerText = '';
    array.forEach(team => {
        const teamName = document.createElement('li');
        const teamInfoContainer = document.createElement('ul');
        const firstYearOfPlay = document.createElement('li');
        const conference = document.createElement('li');


        teamName.textContent = `${team.name}, ${team.abbreviation}`;
        firstYearOfPlay.textContent = `First Year of Play: ${team.firstYearOfPlay}`
        conference.textContent = `Conference: ${team.conference.name}`


        list.appendChild(teamName);
        list.appendChild(teamInfoContainer);
        teamInfoContainer.appendChild(firstYearOfPlay);
        teamInfoContainer.appendChild(conference);


    });
};