export const apiInterface = {
    route: "https://s2ntl9aho7.execute-api.us-east-2.amazonaws.com/articles",
  };

export function apiInterfaceAppend(id){
    return apiInterface.route + "/" + id;
}
