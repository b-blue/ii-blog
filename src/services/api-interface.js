import axios from "axios";

export const apiInterface = {
  route: "https://xw65wbn55b.execute-api.us-east-2.amazonaws.com/articles"
};

// Consistently append ids to urls
export function apiInterfaceAppend(id) {
  return apiInterface.route + "/" + id;
}

// Ensure consistent date/timestamps
export function getPublicationDate() {
  return (
    new Date(Date.now()).toDateString() +
    " " +
    new Date(Date.now()).toLocaleTimeString()
  );
}

// Wrapper for axios put (creates OR overwrites)
export const apiSave = async (body) => {
  return await axios.put(apiInterface.route, body).then((res) => {
    return res.status;
  });
}

// Wrapper for axios get article by id
export const apiGet = async (id) => {
  return await axios.get(apiInterfaceAppend(id)).then((res) => {
    return res.data.Item;
  });
}

// Wrapper for axios get all articles in table
export const apiGetAll = async () => {
  return await axios.get(apiInterface.route).then((res) => {
    return res.data.Items.sort((a,b) => {return (a.Title > b.Title) ?  1 : -1});
  });
}

// Wrapper for axios delete article by id
export const apiDelete = async (id) => {
  return await axios.delete(apiInterfaceAppend(id)).then((res) => {
    return res.status;
  })
}