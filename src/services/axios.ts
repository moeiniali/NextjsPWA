import axios from "axios"




const BASE_URL = "https://core.b2shelf.com/api/v2/"

export default axios.create({

 baseURL: BASE_URL,
 headers: { "content-Type": " application/json " },

})
