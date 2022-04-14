const API_KEY = "AIzaSyDGvBETzItQ1g8J1iPdIsmAi7coHG7_frM"

//** Renders map via google maps js API and adds home marker*/
function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: {
            lat: 59.334591,
            lng: 18.063240,
        }
    });
    new google.maps.Marker({
        position: {
            lat: 59.34222271014225,
            lng: 17.93553904348374
        },
        map,
        title: "Home!",
    });
}

//** GitHub */

//* Displays user information from parameter */
function userInformationHTML(user) {
    return `<h2>${user.name}
                <span class="small-name">(@<a href="${user.html_url}" target="_blank">${user.login}</a>)</span>
            </h2>
            <div class="gh-content">
                <div class="gh-avatar">
                    <a href="${user.html_url}" target="_blank">
                        <img src="${user.avatar_url}" width="64" height="64" alt="${user.login}"
                    </a>
                </div>
                <p>Followers: ${user.followers} - Following: ${user.following}<br>Repos: ${user.public_repos}</p>
            </div>`
}

//* Displays repository information passed as a second parameter from fetchGitHubInformation() */
function repoInformationHTML(repos) {
    if (repos.length === 0) {
        return `<div class="clearfix repo-list">No repos to show!</div>`
    }
    listItemsHTML = repos.map(function (repo) {
        return `<li>
            <a href="${repo.html_url}" target="_blank">${repo.name}</a>
        </li>`
    });

    return `<div class="clearfix repo-list>
        <p>
            <strong>Repo List:</strong>
        </p>
        <ul>
            ${listItemsHTML.join("\n")}
        </ul>
    </div>`
}

//** Takes promise from API and either passes response to userInformation function, or throws error. */
function fetchGitHubInformation(e) {
    let username = $("#gh-username").val();
    if (!username) {
        $("#gh-user-data").html(`<h2>Please enter a existing GitHub username.</h2>`);
        return;
    }
    $("#gh-user-data").html(`<div id="loader"><img src="assets/images/loader.gif" alt="loading..."/></div>`);

    $.when(
        $.getJSON(`https://api.github.com/users/${username}`),
        $.getJSON(`https://api.github.com/users/${username}/repos`)
    ).then(
        function (firstResponse, secondResponse) {
            $("#gh-user-data").html(userInformationHTML(firstResponse[0]));
            $("#gh-repo-data").html(repoInformationHTML(secondResponse[0]));
        },
        function (errorResponse) {
            if (errorResponse.status === 404) {
                $("#gh-user-data").html(`${username} was not found...`)
            } else {
                console.log(errorResponse);
                $("#gh-user-data").html(`<h2>Error: ${errorResponse.responseJSON.message}</h2>`);
            }
        });
}