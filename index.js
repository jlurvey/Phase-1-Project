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
        allTeamsArray = data.teams.sort((a,b) => {
            const nameA = a.name.toUpperCase();
            const nameB = b.name.toUpperCase();
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
        });
        //console.log(allTeamsArray);
        //showTeams(allTeamsArray);
        //sortTeamAlpha(allTeamsArray);
        //sortYearNum(allTeamsArray);
        //sortConferenceAlpha(allTeamsArray);
        //sortDivisionAlpha(allTeamsArray);
        sortVenueAlpha(allTeamsArray);
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
        const division = document.createElement('li');
        const venue = document.createElement('li');
        const teamWebsite = document.createElement('li')

        teamName.textContent = `${team.name}, '${team.abbreviation}'`;
        firstYearOfPlay.textContent = `First Year of Play: ${team.firstYearOfPlay}`;
        conference.textContent = `Conference: ${team.conference.name}`;
        division.textContent = `Division: ${team.division.name}, '${team.division.nameShort}'`;
        venue.textContent = `Venue: ${team.venue.name}`;
        teamWebsite.textContent = `Link to team website: ${team.officialSiteUrl}`;

        list.appendChild(teamName);
        list.appendChild(teamInfoContainer);
        teamInfoContainer.appendChild(firstYearOfPlay);
        teamInfoContainer.appendChild(conference);
        teamInfoContainer.appendChild(division);
        teamInfoContainer.appendChild(venue);
        teamInfoContainer.appendChild(teamWebsite);

    }); 
};

/* // sort teams alphabetically
function sortTeamAlpha(array) {
    const newArray = [...array];
    const sortedArray = newArray.sort((a,b) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    });
    showTeams(sortedArray);
    console.log(sortedArray);
}; */

//sort first year of play numerically
function sortYearNum(array) {
    const newArray = [...array];
    const sortedArray = newArray.sort((a,b) => a.firstYearOfPlay - b.firstYearOfPlay)
    showTeams(sortedArray);
    console.log(sortedArray);
};

//sort conference alphabetically
function sortConferenceAlpha(array) {
    const newArray = [...array];
    const sortedArray = newArray.sort((a,b) => {
        const nameA = a.conference.name.toUpperCase();
        const nameB = b.conference.name.toUpperCase();
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    });
    showTeams(sortedArray);
    console.log(sortedArray);
};

//sort division alphabetically
function sortDivisionAlpha(array) {
    const newArray = [...array];
    const sortedArray = newArray.sort((a,b) => {
        const nameA = a.division.name.toUpperCase();
        const nameB = b.division.name.toUpperCase();
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    });
    showTeams(sortedArray);
    console.log(sortedArray);
};

//sort venue alphabetically
function sortVenueAlpha(array) {
    const newArray = [...array];
    const sortedArray = newArray.sort((a,b) => {
        const nameA = a.venue.name.toUpperCase();
        const nameB = b.venue.name.toUpperCase();
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    });
    showTeams(sortedArray);
    console.log(sortedArray);
};