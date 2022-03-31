import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  return axios.get(baseUrl).then((response) => response.data);
};

const create = (newPerson) => {
  return axios.post(baseUrl, newPerson).then((response) => response.data);
};

const update = () => {
  //
};

const deletePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`).then((response) => response);
};

const personService = {
  getAll,
  create,
  update,
  deletePerson
};
export default personService;