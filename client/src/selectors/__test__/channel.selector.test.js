import { Selector } from "redux-testkit";

import { channelSelector } from "@/selectors/";

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
    }
  },
  channelReducer: {
    channelList: [
      {
        id: "40a65590604e4619ade33ba0811fc6e7",
        name: "RainmanSyc, test3, admin",
        public: false,
        message_group: true,
        brief_description: "",
        detail_description: "",
        created_at: "2018-12-13T22:48:36.556Z",
        updated_at: "2018-12-13T22:48:36.556Z",
        team_id: "9f1589291bbf4ae6b0cd172eeb85fb82"
      },

      {
        id: "726ad26141a2464f8d155ddb4ef3a75f",
        name: "RainmanSyc, admin, test3, test2, test",
        public: false,
        message_group: true,
        brief_description: "",
        detail_description: "",
        created_at: "2018-12-13T22:48:53.139Z",
        updated_at: "2018-12-13T22:48:53.139Z",
        team_id: "9f1589291bbf4ae6b0cd172eeb85fb82"
      },
      {
        id: "acd5b59b635d478690670e8abb0e6e3b",
        name: "random",
        public: true,
        message_group: false,
        brief_description: "heyyoAaaasa",
        detail_description: "",
        created_at: "2018-12-13T20:13:15.578Z",
        updated_at: "2018-12-13T20:23:56.524Z",
        team_id: "9f1589291bbf4ae6b0cd172eeb85fb82"
      },
      {
        id: "ad5b6363a53f4852b882e518633ab425",
        name: "RainmanSyc, admin",
        public: false,
        message_group: true,
        brief_description: "",
        detail_description: "",
        created_at: "2018-12-13T22:48:56.168Z",
        updated_at: "2018-12-13T22:48:56.168Z",
        team_id: "9f1589291bbf4ae6b0cd172eeb85fb82"
      },
      {
        id: "b822784333074605a0bd79da4fc874af",
        name: "general",
        public: true,
        message_group: false,
        brief_description: "Company-wide announcements and work-based matters",
        detail_description:
          "This channel is for workspace-wide communication and announcements. All members are in this channel.",
        created_at: "2018-12-13T18:08:15.152Z",
        updated_at: "2018-12-13T18:08:15.152Z",
        team_id: "9f1589291bbf4ae6b0cd172eeb85fb82"
      },
      {
        id: "d6155154da824f9db60f8926f6f7b92d",
        name: "heyhey",
        public: false,
        message_group: false,
        brief_description: "",
        detail_description: "",
        created_at: "2018-12-13T22:48:47.834Z",
        updated_at: "2018-12-13T22:48:47.834Z",
        team_id: "9f1589291bbf4ae6b0cd172eeb85fb82"
      }
    ],
    currentChannel: {
      id: "ad5b6363a53f4852b882e518633ab425",
      brief_description: "",
      detail_description: "",
      name: "RainmanSyc, admin",
      public: false,
      message_group: true,
      team_id: "9f1589291bbf4ae6b0cd172eeb85fb82",
      updated_at: "2018-12-13T22:48:56.168Z",
      created_at: "2018-12-13T22:48:56.168Z"
    },
    currentChannelMemberList: [
      {
        id: "6ebe6250221d4519aad4bff92c8acd2c",
        username: "admin",
        email: "admin@email.com",
        avatarurl: "https://i.imgur.com/RrMFWtA.png",
        online: false,
        brief_description: "Aloha World!",
        detail_description:
          "about myself, I am not a person who likes to fish. I write code when I don't fish",
        created_at: "2018-12-13T22:48:56.170Z",
        channel_id: "ad5b6363a53f4852b882e518633ab425"
      },

      {
        id: "cf1c6dee7bac4823a67333c6e21009a6",
        username: "RainmanSyc",
        email: "steven2002yc@gmail.com",
        avatarurl:
          "https://lh3.googleusercontent.com/-VK-5u1KZS2Y/AAAAAAAAAAI/AAAAAAAAD9E/6_VUtgx-NXI/s96-c/photo.jpg",
        online: false,
        brief_description: "",
        detail_description: "",
        created_at: "2018-12-13T22:48:56.170Z",
        channel_id: "ad5b6363a53f4852b882e518633ab425"
      }
    ],
    isLoading: false
  }
};

describe("channel.selectors", () => {
  it("should getChannelIsLoading", () => {
    const result = false;
    Selector(channelSelector.getChannelIsLoading)
      .expect(state)
      .toReturn(result);
  });

  it("should getCurrentChannel", () => {
    const result = {
      id: "ad5b6363a53f4852b882e518633ab425",
      brief_description: "",
      detail_description: "",
      name: "RainmanSyc, admin",
      public: false,
      message_group: true,
      team_id: "9f1589291bbf4ae6b0cd172eeb85fb82",
      updated_at: "2018-12-13T22:48:56.168Z",
      created_at: "2018-12-13T22:48:56.168Z"
    };
    Selector(channelSelector.getCurrentChannel)
      .expect(state)
      .toReturn(result);
  });

  it("should getCurrentChannelMemberList", () => {
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
        created_at: "2018-12-13T22:48:56.170Z",
        channel_id: "ad5b6363a53f4852b882e518633ab425"
      },

      {
        id: "cf1c6dee7bac4823a67333c6e21009a6",
        username: "RainmanSyc",
        email: "steven2002yc@gmail.com",
        avatarurl:
          "https://lh3.googleusercontent.com/-VK-5u1KZS2Y/AAAAAAAAAAI/AAAAAAAAD9E/6_VUtgx-NXI/s96-c/photo.jpg",
        online: false,
        brief_description: "",
        detail_description: "",
        created_at: "2018-12-13T22:48:56.170Z",
        channel_id: "ad5b6363a53f4852b882e518633ab425"
      }
    ];
    Selector(channelSelector.getCurrentChannelMemberList)
      .expect(state)
      .toReturn(result);
  });

  it("should getChannelList", () => {
    const result = [
      {
        id: "b822784333074605a0bd79da4fc874af",
        name: "general",
        public: true,
        message_group: false,
        brief_description: "Company-wide announcements and work-based matters",
        detail_description:
          "This channel is for workspace-wide communication and announcements. All members are in this channel.",
        created_at: "2018-12-13T18:08:15.152Z",
        updated_at: "2018-12-13T18:08:15.152Z",
        team_id: "9f1589291bbf4ae6b0cd172eeb85fb82"
      },
      {
        id: "acd5b59b635d478690670e8abb0e6e3b",
        name: "random",
        public: true,
        message_group: false,
        brief_description: "heyyoAaaasa",
        detail_description: "",
        created_at: "2018-12-13T20:13:15.578Z",
        updated_at: "2018-12-13T20:23:56.524Z",
        team_id: "9f1589291bbf4ae6b0cd172eeb85fb82"
      },
      {
        id: "d6155154da824f9db60f8926f6f7b92d",
        name: "heyhey",
        public: false,
        message_group: false,
        brief_description: "",
        detail_description: "",
        created_at: "2018-12-13T22:48:47.834Z",
        updated_at: "2018-12-13T22:48:47.834Z",
        team_id: "9f1589291bbf4ae6b0cd172eeb85fb82"
      }
    ];
    Selector(channelSelector.getChannelList)
      .expect(state)
      .toReturn(result);
  });

  it("should getMessageGroupList", () => {
    const result = [
      {
        id: "ad5b6363a53f4852b882e518633ab425",
        name: "admin",
        public: false,
        message_group: true,
        brief_description: "",
        detail_description: "",
        memberNumber: 1,
        directMessage: true,
        created_at: "2018-12-13T22:48:56.168Z",
        updated_at: "2018-12-13T22:48:56.168Z",
        team_id: "9f1589291bbf4ae6b0cd172eeb85fb82"
      },

      {
        id: "726ad26141a2464f8d155ddb4ef3a75f",
        name: "admin, test3, test2, test",
        public: false,
        message_group: true,
        brief_description: "",
        detail_description: "",
        memberNumber: 4,
        directMessage: false,
        created_at: "2018-12-13T22:48:53.139Z",
        updated_at: "2018-12-13T22:48:53.139Z",
        team_id: "9f1589291bbf4ae6b0cd172eeb85fb82"
      },
      {
        id: "40a65590604e4619ade33ba0811fc6e7",
        name: "test3, admin",
        public: false,
        message_group: true,
        brief_description: "",
        detail_description: "",
        memberNumber: 2,
        directMessage: false,
        created_at: "2018-12-13T22:48:36.556Z",
        updated_at: "2018-12-13T22:48:36.556Z",
        team_id: "9f1589291bbf4ae6b0cd172eeb85fb82"
      }
    ];
    Selector(channelSelector.getMessageGroupList)
      .expect(state)
      .toReturn(result);
  });

  it("should getMessageGroupName", () => {
    const result = "admin";
    Selector(channelSelector.getMessageGroupName)
      .expect(state)
      .toReturn(result);
  });

  it("should getMessageGroupMemberList", () => {
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
        created_at: "2018-12-13T22:48:56.170Z",
        channel_id: "ad5b6363a53f4852b882e518633ab425"
      }
    ];
    Selector(channelSelector.getMessageGroupMemberList)
      .expect(state)
      .toReturn(result);
  });
});
