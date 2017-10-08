import axios from 'axios'

let sequenceApi = ENV.sequenceApi || 'http://localhost:3000'

export default axios.create({
  baseURL: sequenceApi,
  withCredentials: true
})
