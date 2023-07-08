document.addEventListener('DOMContentLoaded', fetchData);

//fetch API data
function fetchData() {
    fetch('https://statsapi.web.nhl.com/api/v1/teams')
    .then((resp) => resp.json())
    .then((data) => {
        
        //initially displays teams alphabetically
        const teamsArray = sortTeams(mapTeamData(data.teams),"name")
        displayTeams(teamsArray);

        //establishes filteredArray variable
        let filteredArray = filterTeams(teamsArray);
    
        //filter event listner
        const searchForm = document.getElementById('searchForm')

        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            query = e.target.search.value
            filteredArray = filterTeams(teamsArray,query);
            displayTeams(filteredArray);
            return filteredArray;
        });
    
        //sort event listener
        const dropdown = document.getElementById('sort')
        
        dropdown.addEventListener('change', () => {
            const selectedOption = dropdown.value;
            sortedArray = sortTeams(filteredArray,selectedOption)
            displayTeams(sortedArray);
            });
        })
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

//filter displayed results
function filterTeams(array, query="") {
    filteredArray = array.filter((team) => {
        for (const key in team) {
            if (team[key].toUpperCase().includes(query.toUpperCase())) {
            return team;
            };
        }
     });
    return filteredArray;
};

//sorts all options
function sortTeams(array, option) {
    let sortedArray = [...array];
    if (option === 'firstYearOfPlay') {
    sortedArray = sortedArray.sort((a,b) => a.firstYearOfPlay - b.firstYearOfPlay)
    } else {
        sortedArray = sortedArray.sort((a,b) => {
            const nameA = a[option].toUpperCase();
            const nameB = b[option].toUpperCase();
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
        });
    }
    return sortedArray
};