import {
  apiDelete,
  apiGet,
  apiGetAll,
  apiInterface,
  apiInterfaceAppend,
  getPublicationDate,
  apiSave,
} from "./api-interface";
import axios from "axios";

jest.mock("axios");

const mockAllResponse = {
  data: {
    Items: [
      {
        Title: "Coffee Ground",
        PublicationDate: "Last edited at Sun Jul 31 2022 9:55:48 PM",
        Author: "B B",
        Pic: "https://picsum.photos/id/1060/500/300",
        Id: "77c59dc7-d813-4044-b08d-fb4e3175c07f",
        Body: "Give me a French press any day. They do it right. Pike Place is the best! \n\nActually, if I had to say it, I think the best coffee is the stuff you make at home. That's my opinion, anyway!",
      },
      {
        Title: "Urban Jungle",
        PublicationDate: "Sun Jul 31 2022 6:19:06 PM",
        Author: "B Blue",
        Pic: "https://picsum.photos/id/862/500/300",
        Id: "c1e19aba-0033-4b20-9a24-cb422064a698",
        Body: "If the modern city is, indeed, an urban jungle, then what precisely does that make us?",
      },
      {
        Title: "Starlight",
        PublicationDate: "Sun Jul 31 2022 12:50:38 PM",
        Author: "B Blue",
        Pic: "https://picsum.photos/id/911/500/300",
        Id: "1ec6e25e-9e55-4199-956e-00f19f5a6c54",
        Body: "At night, I look up at the stars, and wonder how long ago their light left to meet me now. ",
      },
      {
        Title: "Lighthouse",
        PublicationDate: "",
        Author: "B Blue",
        Pic: "https://picsum.photos/id/58/500/300",
        Id: "7694409f-edaf-42c5-9d72-d57583f4802a",
        Body: "You know you're supposed to AVOID lighthouses, right?",
      },
      {
        Title: "Flowers of Bermuda",
        PublicationDate: "Sun Jul 31 2022 12:18:54 PM",
        Author: "B Blue",
        Pic: "https://picsum.photos/id/360/500/300",
        Id: "849ede35-0ac6-4129-9815-6dc1c496c96f",
        Body: "He was the captain of the Nightingale, twenty-one days from Clyde in coal...",
      },
      {
        Title: "Mountains Beyond Mountains",
        PublicationDate: "Last edited at Sun Jul 31 2022 9:15:51 PM",
        Author: "B Blue",
        Pic: "https://picsum.photos/id/873/500/300",
        Id: "973a394c-fa7e-49fe-9b6a-ba045410830f",
        Body: 'They say that there are mountains beyond mountains. I always understood that to mean that "beyond mountains, there are mountains," or more precisely, that things continue more or less the same. \nAfter you solve one problem, don\'t you just proceed to solve another? \nI know I certainly feel like I do. ',
      },
      {
        Title: "Misty Grove",
        PublicationDate: "Sun Jul 31 2022 12:12:14 PM",
        Author: "B Blue",
        Pic: "https://picsum.photos/id/1021/500/300",
        Id: "5ebb5278-cd75-44f1-bd02-78335176a6bd",
        Body: "The misty groves of the PNW are some of the best vistas in the lower 48.",
      },
      {
        Title: "A Rock, An Island",
        PublicationDate: "Sun Jul 31 2022 11:38:39 AM",
        Author: "B Blue",
        Pic: "https://picsum.photos/id/913/500/300",
        Id: "ad72e505-f247-418b-a69c-b864307077ce",
        Body: "I am a rock, I am an island. And a rock never cries.",
      },
      {
        Title: "Mountain Hawk",
        PublicationDate: "",
        Author: "B Blue",
        Pic: "https://picsum.photos/id/538/500/300",
        Id: "850a0aae-8bf8-4492-8969-f6deb2e55eee",
        Body: "What does the hawk see high overhead? ",
      },
      {
        Title: "Man On Wall",
        PublicationDate: "Sun Jul 31 2022 12:09:53 PM",
        Author: "B Blue",
        Pic: "https://picsum.photos/id/665/500/300",
        Id: "989689fd-7814-46a7-a89b-a1ea02ccb342",
        Body: "I wonder what he sees. Can he see tomorrow from way up there? ",
      },
    ],
    Count: 10,
    ScannedCount: 10,
  },
  status: 200,
  statusText: "",
  headers: {
    "access-control-allow-origin": "*",
    "access-control-expose-headers": "*",
    "apigw-requestid": "WMFDChQ3iYcEPcw=",
    "content-length": "2955",
    "content-type": "text/plain; charset=utf-8",
    date: "Mon, 01 Aug 2022 14:51:38 GMT",
  },
  config: {
    transitional: {
      silentJSONParsing: true,
      forcedJSONParsing: true,
      clarifyTimeoutError: false,
    },
    transformRequest: [null],
    transformResponse: [null],
    timeout: 0,
    xsrfCookieName: "XSRF-TOKEN",
    xsrfHeaderName: "X-XSRF-TOKEN",
    maxContentLength: -1,
    maxBodyLength: -1,
    env: {
      FormData: null,
    },
    headers: {
      Accept: "application/json, text/plain, */*",
    },
    method: "get",
    url: "https://xw65wbn55b.execute-api.us-east-2.amazonaws.com/articles",
  },
  request: {},
};

const mockOneResponse = {
  data: {
    Item: {
      Title: "Coffee Ground",
      PublicationDate: "Last edited at Sun Jul 31 2022 9:55:48 PM",
      Author: "B B",
      Pic: "https://picsum.photos/id/1060/500/300",
      Id: "77c59dc7-d813-4044-b08d-fb4e3175c07f",
      Body: "Give me a French press any day. They do it right. Pike Place is the best! \n\nActually, if I had to say it, I think the best coffee is the stuff you make at home. That's my opinion, anyway!",
    },
  },
  status: 200,
  statusText: "",
  headers: {
    "access-control-allow-origin": "*",
    "access-control-expose-headers": "*",
    "apigw-requestid": "WMLlVjhbiYcEMzw=",
    "content-length": "400",
    "content-type": "text/plain; charset=utf-8",
    date: "Mon, 01 Aug 2022 15:36:15 GMT",
  },
  config: {
    transitional: {
      silentJSONParsing: true,
      forcedJSONParsing: true,
      clarifyTimeoutError: false,
    },
    transformRequest: [null],
    transformResponse: [null],
    timeout: 0,
    xsrfCookieName: "XSRF-TOKEN",
    xsrfHeaderName: "X-XSRF-TOKEN",
    maxContentLength: -1,
    maxBodyLength: -1,
    env: {
      FormData: null,
    },
    headers: {
      Accept: "application/json, text/plain, */*",
    },
    method: "get",
    url: "https://xw65wbn55b.execute-api.us-east-2.amazonaws.com/articles/77c59dc7-d813-4044-b08d-fb4e3175c07f",
  },
  request: {},
};

const mockOneItem = {
  Title: "Coffee Ground",
  PublicationDate: "Last edited at Sun Jul 31 2022 9:55:48 PM",
  Author: "B B",
  Pic: "https://picsum.photos/id/1060/500/300",
  Id: "77c59dc7-d813-4044-b08d-fb4e3175c07f",
  Body: "Give me a French press any day. They do it right. Pike Place is the best! \n\nActually, if I had to say it, I think the best coffee is the stuff you make at home. That's my opinion, anyway!",
};

const mockSaveResponse = {
  data: "Article successfully submitted!",
  status: 200,
  statusText: "",
  headers: {
    "access-control-allow-origin": "*",
    "access-control-expose-headers": "*",
    "apigw-requestid": "WMU9SiJACYcEJ1A=",
    "content-length": "33",
    "content-type": "text/plain; charset=utf-8",
    date: "Mon, 01 Aug 2022 16:40:14 GMT",
  },
  config: {
    transitional: {
      silentJSONParsing: true,
      forcedJSONParsing: true,
      clarifyTimeoutError: false,
    },
    transformRequest: [null],
    transformResponse: [null],
    timeout: 0,
    xsrfCookieName: "XSRF-TOKEN",
    xsrfHeaderName: "X-XSRF-TOKEN",
    maxContentLength: -1,
    maxBodyLength: -1,
    env: {
      FormData: null,
    },
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    method: "put",
    url: "https://xw65wbn55b.execute-api.us-east-2.amazonaws.com/articles",
    data: '{"Id":"abcb0240-519a-41ac-a609-b95002a7b0a6","Title":"Hakuna Matata","Author":"B Blue","PublicationDate":"Mon Aug 01 2022 11:39:34 AM","Body":"When I was a student teacher I learned Swahili: \\nHabari za asabui = Good morning!\\nHabari za m\'chana = Good afternoon!\\nNzuri = Good!","Pic":"https://picsum.photos/id/161/500/300"}',
  },
  request: {},
};

const mockId = "77c59dc7-d813-4044-b08d-fb4e3175c07f";

test("sends back strings", () => {
  const url = apiInterface.route;
  const appendedUrl = apiInterfaceAppend("25");
  const date = getPublicationDate();
  expect(typeof url).toBe("string");
  expect(typeof appendedUrl).toBe("string");
  expect(typeof date).toBe("string");
});

describe("apiSave", () => {
  it("should save a single article", async () => {
    // Given
    axios.put.mockResolvedValueOnce(mockSaveResponse);
    // When
    const result = await apiSave(mockOneItem);
    // Then
    expect(typeof result).toBe("number");
  });
});

describe("apiGet", () => {
  it("should get a single article", async () => {
    // Given
    axios.get.mockResolvedValueOnce(mockOneResponse);
    // When
    const result = await apiGet(mockId);
    // Then
    expect(axios.get).toHaveBeenCalledWith(`${apiInterface.route}/${mockId}`);
    expect(typeof result).toBe("object");
  });
});

describe("apiGetAll", () => {
  it("should save a user to the database", async () => {
    //Given
    axios.get.mockResolvedValueOnce(mockAllResponse);
    // When
    const result = await apiGetAll(apiInterface.route);
    // Then
    expect(axios.get).toHaveBeenCalledWith(apiInterface.route);
    expect(typeof result).toBe("object");
  });
});

describe("apiDelete", () => {
  it("should delete a post", async () => {
    //Given
    axios.delete.mockResolvedValueOnce(mockOneResponse);
    //When
    const result = await apiDelete(mockId);
    //Then
    expect(axios.delete).toHaveBeenCalledWith(
      `${apiInterface.route}/${mockId}`
    );
    expect(typeof result).toBe("number");
  });
});
