const BASE_URL = "http://localhost:8000/";

const getInit = () => {
  return {
    headers: {
      "Content-Type": "application/json",
    },
  };
};

const tryCatchFetch = async (url, init) => {
  try {
    let response = await fetch(url, init);
    if (response.ok) {
      if (response.status !== 204) {
        let data = await response.json();
        return data;
      } else {
        return { success: true };
      }
    }
  } catch (error) {
    console.error(":ERR:", error);
  }
};

const getPersons = async () => {
  let url = `${BASE_URL}api/persons/`;
  return await tryCatchFetch(url, getInit());
};

const getPersonById = async (personId) => {
  let url = `${BASE_URL}api/persons/${personId}/`;
  return await tryCatchFetch(url, getInit());
};

const createPerson = async (newPersonParams) => {
  let url = `${BASE_URL}api/persons/`;
  let init = getInit();
  init["method"] = "POST";
  init["body"] = JSON.stringify(newPersonParams);
  return await tryCatchFetch(url, init);
};

const deletePerson = async (personId) => {
  let url = `${BASE_URL}api/persons/${personId}/`;
  let init = getInit();
  init["method"] = "DELETE";
  return await tryCatchFetch(url, init);
};

const myExports = {
  getPersons,
  getPersonById,
  createPerson,
  deletePerson,
};

export default myExports;
