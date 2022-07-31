import axios from "axios";

export const apiInterface = {
  route: "https://xw65wbn55b.execute-api.us-east-2.amazonaws.com/articles",
  oldRoute: "https://s2ntl9aho7.execute-api.us-east-2.amazonaws.com/articles",
};

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
export async function saveArticle(body) {
  console.log("body");
  console.log(body);
  await axios.put(apiInterface.route, body).then((res) => {
    console.log("status: " + res.status)
    if (res.status == 200) {
      console.log("returning true")
      return true;
    }
    console.log("returning false");
    return false;
  });
}
