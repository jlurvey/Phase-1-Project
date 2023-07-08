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
            filteredArray = filterTeams(filteredArray,query);
            //to filter from displayed teams, uncomment first line below and comment second line
            //filteredArray = filterTeams(teamsArray,query);
            displayTeams(filteredArray);
            searchForm.reset()
            dropdown.value = ""
            return filteredArray;
        });
    
        //sort event listener
        const dropdown = document.getElementById('sort')
        
        dropdown.addEventListener('change', () => {
            const selectedOption = dropdown.value;
            sortedArray = sortTeams(filteredArray,selectedOption)
            displayTeams(sortedArray);
        });
        

        //reset event listener
        const button = document.getElementById('reset')

        button.addEventListener('click', () => {
            displayTeams(teamsArray);
            filteredArray = teamsArray
            dropdown.value = ""
            search.value = ""
        });

    })};//end of fetchData

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
    const list = document.getElementById('teams-container');
    list.innerText = '';
    array.forEach(team => {
        const teamName = document.createElement('h3');
        const teamInfoContainer = document.createElement('ul');
        const firstYearOfPlay = document.createElement('li');
        const conference = document.createElement('li');
        const division = document.createElement('li');
        const venue = document.createElement('li');
        const teamWebsite = document.createElement('li');
        const websiteLink = document.createElement('a');

        teamName.textContent = `${team.name}, '${team.abb}'`;
        firstYearOfPlay.textContent = `First Year of Play: ${team.firstYearOfPlay}`;
        conference.textContent = `Conference: ${team.conference}`;
        division.textContent = `Division: ${team.division}, '${team.divisionAbb}'`;
        venue.textContent = `Venue: ${team.venue}`;
        teamWebsite.textContent = `Link to team website: `;
        websiteLink.href = team.website;
        websiteLink.textContent = team.website;

        list.appendChild(teamName);
        list.appendChild(teamInfoContainer);
        teamInfoContainer.appendChild(firstYearOfPlay);
        teamInfoContainer.appendChild(conference);
        teamInfoContainer.appendChild(division);
        teamInfoContainer.appendChild(venue);
        teamInfoContainer.appendChild(teamWebsite);
        teamWebsite.appendChild(websiteLink);
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

//sorts displayed resultes by dropwdown options
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