let song;
let playSong; 

const clientId = "5d3ba71cb7b54b9caa8a148934fe8eb4"
const clientSecret = "d25da50504e848e1b24ce2b278464cca"


const getToken = async () => {
    const result = await fetch(`https://accounts.spotify.com/api/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
        },
        body: 'grant_type=client_credentials'
    })
    const data = await result.json()
    console.log(data.access_token)
    return data.access_token
}
/**
 * 
 * @param {number} imgIndex - index of each image 
 * @param {number} itemIndex - index of item
 * 
 */

const clickedEvent = async(imgIndex, itemIndex) => {
    let track = document.getElementsByTagName('img')[imgIndex].attributes[1].value
    console.log(track)

    let token = await getToken()

    let headers = new Headers([
        ['Content-Type', 'application/json'],
        ['Accept', 'application/json'],
        ['Authorization', `Bearer ${token}`]
    ])

   let request = new Request(`https://api.spotify.com/v1/search?q=${track}&type=track&limit=15`, {
        method: 'GET',
        headers: headers
    })

    let result = await fetch(request)
    let response = await result.json()
    console.log(response)

    song = response.tracks.items[itemIndex].preview_url
    

    while (song == null){
        itemIndex ++
        song = response.tracks.items[itemIndex].preview_url
    }
    console.log(song)

    if(playSong){
        stopSnippet()
    }
    songSnippet(song)


}

/**
 * 
 * 
 * @param {string} id - id value passed from html
 * @param {event} event - passes current event from onclick to function
 * 
 */

const getSong = (id, event) => {
    switch(id) {
        case 'fig-1': {
            event.stopPropagation()
            clickedEvent(1,0)
            break
        }
        case 'fig-2': {
            event.stopPropagation()
            clickedEvent(2,0)
            break
        }
        case 'fig-3': {
            event.stopPropagation()
            clickedEvent(3,0)
            break
        }
        case 'fig-4': {
            event.stopPropagation()
            clickedEvent(4,0)
            break
        }
        case 'fig-5': {
            event.stopPropagation()
            clickedEvent(5,0)
            break
        }
        case 'fig-6': {
            event.stopPropagation()
            clickedEvent(6,0)
            break
        }   
        
    }
}

/**
 * 
 * @param {string} url - preview url from our song 
 * 
 */

const songSnippet = (url) => {
    playSong = new Audio(url)
    return playSong.play()
}

const stopSnippet = () => {
    return playSong.pause()
}