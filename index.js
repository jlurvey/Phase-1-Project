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
        const teamsArray = mapTeamData(data.teams)
        //initially displays teams alphabetically
        teamsArray.sort((a,b) => {
            const nameA = a.name.toUpperCase();
            const nameB = b.name.toUpperCase();
            if (nameA < nameB) {return -1;}
            if (nameA > nameB) {return 1;}
            return 0;
        });

        displayTeams(teamsArray);
    })
    
/*     const searchForm = document.getElementById('searchForm')

    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        query = e.target.search.value
        filterTeams(allTeamsArray,query)
    });
    
    const dropdown = document.getElementById('sort')

    dropdown.addEventListener('change', () => {
        const selectedOption = dropdown.value;
        sortTeams(allTeamsArray,selectedOption)
    }); */
};

//map array
function mapTeamData(array) {
    return array.map(team => ({
        name: team.name,
        abb: team.abbreviation,
        firstYearOfPlay: team.firstYearOfPlay,
        conference: team.conference.name,
        division: team.division.name,
        divisionAbb: team.division.nameShort,
        venue: team.venue.name,
        website: team.officialSiteUrl
    }))
};



//display team information
function displayTeams(array) {
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

        teamName.textContent = `${team.name}, '${team.abb}'`;
        firstYearOfPlay.textContent = `First Year of Play: ${team.firstYearOfPlay}`;
        conference.textContent = `Conference: ${team.conference}`;
        division.textContent = `Division: ${team.division}, '${team.divisionAbb}'`;
        venue.textContent = `Venue: ${team.venue}`;
        teamWebsite.textContent = `Link to team website: ${team.website}`;

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
    const filteredArray = array.filter((team) =>
    team.name.toLowerCase().includes(query.toLowerCase()) ||
    team.abb.toLowerCase().includes(query.toLowerCase()) ||
    team.firstYearOfPlay.includes(query.toString()) ||
    team.conference.toLowerCase().includes(query.toLowerCase()) ||
    team.division.toLowerCase().includes(query.toLowerCase()) ||
    team.divisionAbb.toLowerCase().includes(query.toLowerCase()) ||
    team.venue.toLowerCase().includes(query.toLowerCase())
    );
    displayTeams(filteredArray);
};