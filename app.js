
const getInput = () => {
    const input = document.getElementById('search-input')
    const inputValue = input.value;
    input.value = '';
    const url = `https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=${inputValue}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayTeam(data.teams))

}

const displayTeam = teams => {
    const displayResult = document.getElementById('team-container')
    teams.forEach(team => {
        // console.log(team.idTeam);
        const teamDiv = document.createElement('div')
        teamDiv.classList.add('col')
        teamDiv.innerHTML = `
        <div onclick= "getDetails(${team.idTeam})"  class="card">
            <img src="${team.strTeamBadge}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${team.strAlternate}</h5>
                <p class="card-text">${team.strDescriptionEN.slice(0, 100)}</p>
                <a href="${team.strTwitter}" class="btn btn-primary">Welcome Website</a>
            </div>
        </div>`;
        displayResult.appendChild(teamDiv)
    });

}

const getDetails = teamId => {
    // console.log(teamId);
    const idUrl = `https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id=${teamId}`
    fetch(idUrl)
        .then(res => res.json())
        .then(data => getDisplayDetails(data.teams[0]))

}

const getDisplayDetails = team => {
    // console.log(team);
    const displayDetails = document.getElementById('team-details')
    const displayDiv = document.createElement('div')
    displayDiv.innerHTML = `
   
    <div class="card">
      <div class="card-body">

        <h6 class="card-title">Since : ${team.intFormedYear}</h6>
        <h5 class="card-title">Club Name: ${team.strTeam}</h5>
        <p class="card-title">Club Origin: ${team.strCountry}</p>
        <p class="card-title">Stadium: ${team.strStadium}</p>
        <p class="card-text">Description: ${team.strDescriptionEN.slice(0, 100)}</p>

      </div>
    </div>
    `;
    displayDetails.appendChild(displayDiv)
}