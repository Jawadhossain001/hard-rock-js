var searchOpt = document.getElementById('search-opt');
var searchBtn = document.getElementById('search-btn')

searchOpt.addEventListener('keypress', function (){
    fetch(`https://api.lyrics.ovh/suggest/${event.target.value+event.key}`)
    .then(res => res.json())
    .then(data =>{
        for(let i = 0; i <= 5; i++){
            
        }
    })
})

// searchBtn.addEventListener('click', function (){
//     fetch(`https://api.lyrics.ovh/suggest/data`)
//     .then(res => res.json())
//     .then(data =>{
//         console.log(data);
//     })
// })
