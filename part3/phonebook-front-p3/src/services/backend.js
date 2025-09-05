import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
    const req = axios.get(baseUrl)
    return req.then(res => res.data)
}

const create = newObj => {
    const req = axios.post(baseUrl, newObj)
    return req.then(res => res.data)
}

const update = (id, newObject) => {
    const request = axios.put(baseUrl + '/' + id, newObject)
    return request.then(res => res.data)
}

const deleteEntry = id => {
    const request = axios.delete(baseUrl + '/' + id)
    return request.then(res => res.statusText)
}

export default { getAll, create, update, deleteEntry }
