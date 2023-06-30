//* Displays user information from parameter */
function userInformationHTML(user) {
    return `<h2>${user.name}
                <span class="small-name">(@<a href="${user.html_url}" target="_blank">${user.login}</a>)</span>
            </h2>
            <div class="gh-content">
                <div class="row">
                    <div class="col-md-3 gh-avatar hvr-grow">
                        <a href="${user.html_url}" target="_blank">
                            <img src="${user.avatar_url}" width="64" height="64" alt="${user.login}"
                        </a>
                    </div>
                    <div class="col">
                        <a href="${user.html_url}/?tab=repositories" target="_blank">
                            <p>Followers: ${user.followers} - Following: ${user.following}<br>Repos: ${user.public_repos}</p>
                        </a>
                    </div>
                </div>
            </div>`
}

//* Picks a random color from array to style repo list items */
function colorRandomizer() {
    let colors = ["#C6DFCD", "#F5F2D3", "#E6D5C3", "#C9A8A0", "#737D89", "#869F9F", "#B6CED9", "#7B86B3", "#E39898", "#F0AF9E", "#F7D3BE", "#CC7A3B", "#C49B3B", "#5A778A", "#8CB2BB", "#C5C5B9", "#778874", "#80D5DC", "#6AC1DE", "#5A9DD7", "#6F6283", "#7CBB90"]
    let randomColor = colors[Math.floor(Math.random()*colors.length)]
    return randomColor
}

//* Displays repository information passed as a second parameter from fetchGitHubInformation() */
function repoInformationHTML(repos) {
    if (repos.length === 0) {
        return `<div class="clearfix repo-list">No repos to show!</div>`
    }
    listItemsHTML = repos.map(function (repo) {
        return `<li class="hvr-float">
            <a style="background-color:${colorRandomizer()}" href="${repo.html_url}" target="_blank">${repo.name}</a>
        </li>`
    });

    return `<div class="clearfix repo-list">
        <p>
            <strong id="repo-heading">Repo List:</strong>
        </p>
        <ul>
            ${listItemsHTML.join("\n")}
        </ul>
    </div>`
}

//** Takes promise from API and either passes response to userInformation function, or throws error. */
function fetchGitHubInformation(e) {
    $("#gh-user-data").html("");
    $("#gh-repo-data").html("");

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
            } else if (errorResponse.status === 403) {
                let resetTime = new Date(errorResponse.getResponseHeader("X-RateLimit-Reset") * 1000);
                $("#gh-user-data").html(`<h4>You have exceeded githubs maximum requests (60). Rate limiter will reset at: ${resetTime.toLocaleTimeString()}</h4>`)
            } else {
                console.log(errorResponse);
                $("#gh-user-data").html(`<h2>Error: ${errorResponse.responseJSON.message}</h2>`);
            }
        });
}