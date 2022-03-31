import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  return axios.get(baseUrl).then((response) => response.data);
};

const create = (newContact) => {
  return axios.post(baseUrl, newContact).then((response) => response.data);
};

const update = (id, updatedContact) => {
  return axios
    .put(`${baseUrl}/${id}`, updatedContact)
    .then((response) => response.data);
};

const deletePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`).then((response) => response);
};

const personService = {
  getAll,
  create,
  update,
  deletePerson,
};
export default personService;
