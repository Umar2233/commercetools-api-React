import axios from "axios"

export default axios.create({
    baseURL : "https://api.europe-west1.gcp.commercetools.com"
})

export const axiosPrivate = axios.create({
    baseURL : "https://auth.europe-west1.gcp.commercetools.com"
})