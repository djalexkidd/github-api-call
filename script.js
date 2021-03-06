const APICALL = "https://api.github.com/users/"
const affichage = document.querySelector('.affichage')
const form = document.querySelector('.form-github-recherche')
const inpRecherche = document.querySelector('.inp-recherche')

// Création d'une fonction asynchrone
async function dataGithub(utilisateur) {
    const reponse = await fetch(`${APICALL}${utilisateur}`)
    const data = await reponse.json()
    console.log(data)

    creationCarte(data)
}

// Affichage de la carte d'utilisateur
function creationCarte(user) {
    const date = new Date(`${user.created_at}`)
    const formated_date = date.getDate() + '/' + (date.getMonth() + 1)  + '/' + date.getFullYear() + ' à ' + date.getUTCHours() + ':' + date.getMinutes() + ':' + date.getSeconds()

    const carteHTML = `
    <div class="carte">
        <img src="${user.avatar_url}" alt="icone" class="avatar">
        <h2>${user.name}</h2>
        <ul class="cont-infos">
            <li class="followers">Followers : ${user.followers}</li>
            <li class="following">Following : ${user.following}</li>
            <li class="repos">Repos : ${user.public_repos}</li>
            <li class="bio">Bio : ${user.bio}</li>
            <li class="created">Date de création : ${formated_date}</li>
            <a class="link" href=${user.html_url} target="_blank">Lien du profil</a>
        </ul>
    </div>
    `

    affichage.innerHTML = carteHTML
}

// Formulaire pour entrer le nom
form.addEventListener('submit', (e) => {
    e.preventDefault()
    if(inpRecherche.value.length > 0) {
        dataGithub(inpRecherche.value)
        inpRecherche.value = ""
    }
})