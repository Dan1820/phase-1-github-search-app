const gitForm=document.querySelector('#github-form');

// adding and event listener for DOM load
document.addEventListener("DOMContentLoaded",()=>{
    gitForm.addEventListener("submit",searchGitHubUser);
});

// fetching info from github url
let searchGitHubUser=(e)=>{
    e.preventDefault();
    const username=document.querySelector('#search').value
    fetch(`https://api.github.com/search/users?q=${username}`)
    .then(response=>response.json())
    .then(users=>{renderUserDetails(users.items)})
    .catch(error=>{alert("kuna bug mahali")})
}
// user results for each of the received
let renderUserDetails=users=>{
    users.forEach(user => {
        createGithubUserCardElement(user)
        
    });
}
// creating a card and its child element and give specific user details
let createGithubUserCardElement=user=>{
    const userCard=document.createElement("div")
    userCard.className="user-card";
    document.querySelector('#user-list').appendChild(userCard)
    userCard.innerHTML=`
    <img src="${user.avatar_url}">
    <h2>${user.login}</h2>
    <a class="fs11" href="${user.html_url}" target="_blank">Go to Github profile</a><br>
    <button class="submit-btn fs11">View ${user.login}s Repos</button>
    
    `
    userCard.querySelector(".submit-btn").addEventListener("click",()=>{
        fetchRepositories(user)
    })
    
}

// fetch repositories using url provided
let fetchRepositories = username=>{
    fetch(`https://api.github.com/users/${username.login}/repos`)
    .then(response=>response.json())
    .then(repos=>{
        renderReposDetails(repos)
    })
    .catch(error=>{alert("there is a bug")})
}
// render repo details for each user
let renderReposDetails=repos=>{
    repos.foreach(repo=>createRepoCardElement(repo))
}
let createRepoCardElement=repo=>{
    const repositoryCard=document.createElement('div')
    repositoryCard.className='repo-card'
    document.querySelector('#repo-list').appendChild(repositoryCard);
    repositoryCard.innerHTML=`<h2 class="margin-none">${repo.name}</h2>
    <p class= "fs14 margin-none"> ${repo.description}</p>
    `

}