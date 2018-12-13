import { Selector } from "redux-testkit";

import emptyState from "./emptyState";
import { teamSelector } from "@/selectors/";

const state = {
  teamReducer: {
    teamList: [
      {
        id: "9f1589291bbf4ae6b0cd172eeb85fb82",
        name: "Demo Team",
        brief_description: "New users join this team for demo purposes",
        updated_at: "2018-12-13T18:08:15.143Z",
        created_at: "2018-12-13T18:08:15.143Z",
        admin: false
      }
    ],
    currentTeam: {
      id: "9f1589291bbf4ae6b0cd172eeb85fb82",
      name: "Demo Team",
      brief_description: "New users join this team for demo purposes",
      updated_at: "2018-12-13T18:08:15.143Z",
      created_at: "2018-12-13T18:08:15.143Z",
      admin: false
    },
    currentTeamMemberList: [
      {
        id: "6ebe6250221d4519aad4bff92c8acd2c",
        username: "admin",
        email: "admin@email.com",
        avatarurl: "https://i.imgur.com/RrMFWtA.png",
        online: false,
        brief_description: "Aloha World!",
        detail_description:
          "about myself, I am not a person who likes to fish. I write code when I don't fish",
        created_at: "2018-12-13T18:08:15.161Z",
        admin: true
      }
    ],
    isLoading: false
  }
};

describe("team.selectors", () => {
  it("shouldgetTeamIsLoading", () => {
    const result = false;
    Selector(teamSelector.getTeamIsLoading)
      .expect(emptyState)
      .toReturn(result);
  });

  it("should getCurrentTeamMemberList", () => {
    const result = [
      {
        id: "6ebe6250221d4519aad4bff92c8acd2c",
        username: "admin",
        email: "admin@email.com",
        avatarurl: "https://i.imgur.com/RrMFWtA.png",
        online: false,
        brief_description: "Aloha World!",
        detail_description:
          "about myself, I am not a person who likes to fish. I write code when I don't fish",
        created_at: "2018-12-13T18:08:15.161Z",
        admin: true
      }
    ];
    Selector(teamSelector.getCurrentTeamMemberList)
      .expect(state)
      .toReturn(result);
  });

  it("should getCurrentTeam", () => {
    const result = {
      id: "9f1589291bbf4ae6b0cd172eeb85fb82",
      name: "Demo Team",
      brief_description: "New users join this team for demo purposes",
      updated_at: "2018-12-13T18:08:15.143Z",
      created_at: "2018-12-13T18:08:15.143Z",
      admin: false
    };
    Selector(teamSelector.getCurrentTeam)
      .expect(state)
      .toReturn(result);
  });

  it("should getTeamList", () => {
    const result = [
      {
        id: "9f1589291bbf4ae6b0cd172eeb85fb82",
        name: "Demo Team",
        initials: "DT",
        brief_description: "New users join this team for demo purposes",
        updated_at: "2018-12-13T18:08:15.143Z",
        created_at: "2018-12-13T18:08:15.143Z",
        admin: false
      }
    ];
    Selector(teamSelector.getTeamList)
      .expect(state)
      .toReturn(result);
  });
});
