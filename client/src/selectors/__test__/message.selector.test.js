import { Selector } from "redux-testkit";

import { messageSelector } from "@/selectors/";

const state = {
  userReducer: {
    currentUser: {
      avatarurl:
        "https://lh3.googleusercontent.com/-VK-5u1KZS2Y/AAAAAAAAAAI/AAAAAAAAD9E/6_VUtgx-NXI/s96-c/photo.jpg",
      brief_description: "",
      detail_description: "",
      email: "steven2002yc@gmail.com",
      id: "cf1c6dee7bac4823a67333c6e21009a6",
      provider: "google",
      username: "RainmanSyc"
    },
    isLoading: false
  },
  messageReducer: {
    messageList: [
      {
        id: "8044303378964b95b945cbe22b66279f",
        username: "RainmanSyc",
        avatarurl:
          "https://lh3.googleusercontent.com/-VK-5u1KZS2Y/AAAAAAAAAAI/AAAAAAAAD9E/6_VUtgx-NXI/s96-c/photo.jpg",
        text: "dasfasdfasf",
        url: "",
        filetype: "",
        created_at: "2018-12-13T21:35:27.616Z",
        updated_at: "2018-12-13T21:35:27.616Z",
        channel_id: "acd5b59b635d478690670e8abb0e6e3b",
        user_id: "cf1c6dee7bac4823a67333c6e21009a6"
      }
    ],
    hasMoreMessage: true,
    isLoading: false
  }
};

describe("message.selectors", () => {
  it("should getMessageIsLoading", () => {
    const result = false;

    Selector(messageSelector.getMessageIsLoading)
      .expect(state)
      .toReturn(result);
  });
  it("should getMessageList", () => {
    const result = [
      {
        id: "8044303378964b95b945cbe22b66279f",
        username: "RainmanSyc",
        avatarurl:
          "https://lh3.googleusercontent.com/-VK-5u1KZS2Y/AAAAAAAAAAI/AAAAAAAAD9E/6_VUtgx-NXI/s96-c/photo.jpg",
        text: "dasfasdfasf",
        url: "",
        isCurrentUser: false,
        audioType: false,
        imageType: false,
        textType: false,
        filetype: "",
        created_at: "2018-12-13T21:35:27.616Z",
        updated_at: "2018-12-13T21:35:27.616Z",
        channel_id: "acd5b59b635d478690670e8abb0e6e3b",
        user_id: "cf1c6dee7bac4823a67333c6e21009a6"
      }
    ];

    Selector(messageSelector.getMessageList)
      .expect(state)
      .toReturn(result);
  });

  it("should getHasMoreMessage", () => {
    const result = true;
    Selector(messageSelector.getHasMoreMessage)
      .expect(state)
      .toReturn(result);
  });
});
