import axios from "axios"

axios.create({
    baseURL: "https://us-central1-admasocial-media.cloudfunctions.net/api",
    headers: {"Allow-Control-Access-Origin": "*"},
    
})