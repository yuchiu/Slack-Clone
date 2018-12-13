import { Selector } from "redux-testkit";

import emptyState from "./emptyState";
import { userSelector } from "@/selectors";

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
  }
};

describe("user.selectors", () => {
  it("should getUserIsLoading", () => {
    const result = false;
    Selector(userSelector.getUserIsLoading)
      .expect(state)
      .toReturn(result);
  });

  it("should getCurrentUser", () => {
    const result = {
      avatarurl:
        "https://lh3.googleusercontent.com/-VK-5u1KZS2Y/AAAAAAAAAAI/AAAAAAAAD9E/6_VUtgx-NXI/s96-c/photo.jpg",
      brief_description: "",
      detail_description: "",
      email: "steven2002yc@gmail.com",
      id: "cf1c6dee7bac4823a67333c6e21009a6",
      provider: "google",
      username: "RainmanSyc"
    };
    Selector(userSelector.getCurrentUser)
      .expect(state)
      .toReturn(result);
  });

  it("should getUsername", () => {
    const result = "RainmanSyc";
    Selector(userSelector.getUsername)
      .expect(state)
      .toReturn(result);
  });
});
