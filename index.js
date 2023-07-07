//document.addEventListener('DOMContentLoaded', () => console.log('We are connected!'));

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
        //showTeams(allTeamsArray);
        filterTeams(allTeamsArray,query="");
    })
    
    const dropdown = document.getElementById('sort')

    dropdown.addEventListener('change', () => {
        const selectedOption = dropdown.value;
        sortTeams(allTeamsArray,selectedOption)
    });
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

//sorts all options
function sortTeams(array, option) {
    const newArray = [...array];
    if (option === 'firstYearOfPlay') {
    const sortedArray = newArray.sort((a,b) => a.firstYearOfPlay - b.firstYearOfPlay)
    showTeams(sortedArray);
    } else {
        const sortedArray = newArray.sort((a,b) => {
            const nameA = a[option].name.toUpperCase();
            const nameB = b[option].name.toUpperCase();
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
        });
        showTeams(sortedArray);
    }
};

//filter displayed results
function filterTeams(array,query) {
    const newArray = [...array];
    const filteredArray = newArray.filter((team) =>
    team.name.toLowerCase().includes(query.toLowerCase()) || team.abbreviation.toLowerCase().includes(query.toLowerCase())
    );
    console.log(filteredArray);
    showTeams(filteredArray)
};
    


// sort teams alphabetically
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
};

//sort first year of play numerically
function sortYearNum(array) {
    const newArray = [...array];
    const sortedArray = newArray.sort((a,b) => a.firstYearOfPlay - b.firstYearOfPlay)
    showTeams(sortedArray);
};

//sort options alphabetically
function sortAlpha(array, option) {
    const newArray = [...array];
    const sortedArray = newArray.sort((a,b) => {
        const nameA = a[option].name.toUpperCase();
        const nameB = b[option].name.toUpperCase();
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    });
    showTeams(sortedArray);
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
};

//event listener for sort dropdown
/* const dropdown = document.getElementById('sort')

dropdown.addEventListener('change', () => {
    const selectedOption = dropdown.option;
    console.log(selectedOption)
});
*/