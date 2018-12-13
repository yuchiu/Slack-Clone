import { Reducer } from "redux-testkit";
import actionTypes from "@/actionTypes";
import { teamReducer } from "@/reducers";

const initialState = {
  teamList: [],
  currentTeam: {},
  currentTeamMemberList: [],
  isLoading: false
};

describe("team.reducer initial state", () => {
  it("should have initial state", () => {
    expect(teamReducer(initialState, {})).toEqual(initialState);
  });

  it("should handle USER_FETCH_TRY_AUTO_SIGNIN action on initial state", () => {
    const action = {
      type: actionTypes.USER_FETCH_TRY_AUTO_SIGNIN,
      payload: {
        teamList: [
          {
            brief_description: "",
            created_at: "2018-12-13T20:42:04.804Z",
            id: "d8a645f2290844579455d8a9a5a286e3",
            name: "AAATeam",
            updated_at: "2018-12-13T20:42:04.804Z"
          }
        ]
      }
    };
    const state = initialState;
    const result = {
      teamList: [
        {
          brief_description: "",
          created_at: "2018-12-13T20:42:04.804Z",
          id: "d8a645f2290844579455d8a9a5a286e3",
          name: "AAATeam",
          updated_at: "2018-12-13T20:42:04.804Z"
        }
      ],
      currentTeam: {
        brief_description: "",
        created_at: "2018-12-13T20:42:04.804Z",
        id: "d8a645f2290844579455d8a9a5a286e3",
        name: "AAATeam",
        updated_at: "2018-12-13T20:42:04.804Z"
      },
      currentTeamMemberList: [],
      isLoading: false
    };
    Reducer(teamReducer)
      .withState(state)
      .expect(action)
      .toReturnState(result);
  });

  it("should handle USER_FETCH_SIGNIN_SUCCESS action on initial state", () => {
    const action = {
      type: actionTypes.USER_FETCH_SIGNIN_SUCCESS,
      payload: {
        teamList: [
          {
            brief_description: "",
            created_at: "2018-12-13T20:42:04.804Z",
            id: "d8a645f2290844579455d8a9a5a286e3",
            name: "AAATeam",
            updated_at: "2018-12-13T20:42:04.804Z"
          }
        ]
      }
    };
    const state = initialState;
    const result = {
      teamList: [
        {
          brief_description: "",
          created_at: "2018-12-13T20:42:04.804Z",
          id: "d8a645f2290844579455d8a9a5a286e3",
          name: "AAATeam",
          updated_at: "2018-12-13T20:42:04.804Z"
        }
      ],
      currentTeam: {
        brief_description: "",
        created_at: "2018-12-13T20:42:04.804Z",
        id: "d8a645f2290844579455d8a9a5a286e3",
        name: "AAATeam",
        updated_at: "2018-12-13T20:42:04.804Z"
      },
      currentTeamMemberList: [],
      isLoading: false
    };
    Reducer(teamReducer)
      .withState(state)
      .expect(action)
      .toReturnState(result);
  });

  it("should handle TEAM_FETCH_CREATE action on initial state", () => {
    const action = {
      type: actionTypes.TEAM_FETCH_CREATE
    };
    const state = initialState;
    const result = {
      teamList: [],
      currentTeam: {},
      currentTeamMemberList: [],
      isLoading: true
    };
    Reducer(teamReducer)
      .withState(state)
      .expect(action)
      .toReturnState(result);
  });

  it("should handle TEAM_FETCH_CREATE_SUCCESS action on existing state", () => {
    const action = {
      type: actionTypes.TEAM_FETCH_CREATE_SUCCESS,
      payload: {
        teamList: [
          {
            brief_description: "",
            created_at: "2018-12-13T20:42:04.804Z",
            id: "d8a645f2290844579455d8a9a5a286e3",
            name: "AAATeam",
            updated_at: "2018-12-13T20:42:04.804Z"
          }
        ],
        team: {
          brief_description: "",
          created_at: "2018-12-13T20:42:04.804Z",
          id: "d8a645f2290844579455d8a9a5a286e3",
          name: "AAATeam",
          updated_at: "2018-12-13T20:42:04.804Z"
        },
        currentTeamMemberList: []
      }
    };
    const state = {
      teamList: [],
      currentTeam: {},
      currentTeamMemberList: [],
      isLoading: true
    };
    const result = {
      teamList: [
        {
          brief_description: "",
          created_at: "2018-12-13T20:42:04.804Z",
          id: "d8a645f2290844579455d8a9a5a286e3",
          name: "AAATeam",
          updated_at: "2018-12-13T20:42:04.804Z"
        }
      ],
      currentTeam: {
        brief_description: "",
        created_at: "2018-12-13T20:42:04.804Z",
        id: "d8a645f2290844579455d8a9a5a286e3",
        name: "AAATeam",
        updated_at: "2018-12-13T20:42:04.804Z"
      },
      currentTeamMemberList: [],
      isLoading: false
    };
    Reducer(teamReducer)
      .withState(state)
      .expect(action)
      .toReturnState(result);
  });

  it("should handle TEAM_SWITCH action on existing state", () => {
    const action = {
      type: actionTypes.TEAM_SWITCH,
      payload: "d8a645f2290844579455d8a9a5a286e3"
    };
    const state = {
      teamList: [
        {
          brief_description: "",
          created_at: "2018-12-13T20:42:04.804Z",
          id: "d8a645f2290844579455d8a9a5a286e3",
          name: "AAATeam",
          updated_at: "2018-12-13T20:42:04.804Z"
        }
      ],
      currentTeam: {},
      currentTeamMemberList: [],
      isLoading: false
    };
    const result = {
      teamList: [
        {
          brief_description: "",
          created_at: "2018-12-13T20:42:04.804Z",
          id: "d8a645f2290844579455d8a9a5a286e3",
          name: "AAATeam",
          updated_at: "2018-12-13T20:42:04.804Z"
        }
      ],
      currentTeam: {
        brief_description: "",
        created_at: "2018-12-13T20:42:04.804Z",
        id: "d8a645f2290844579455d8a9a5a286e3",
        name: "AAATeam",
        updated_at: "2018-12-13T20:42:04.804Z"
      },
      currentTeamMemberList: [],
      isLoading: false
    };
    Reducer(teamReducer)
      .withState(state)
      .expect(action)
      .toReturnState(result);
  });

  it("should handle TEAM_FETCH_EDIT action on initial state", () => {
    const action = {
      type: actionTypes.TEAM_FETCH_EDIT
    };
    const state = initialState;
    const result = {
      teamList: [],
      currentTeam: {},
      currentTeamMemberList: [],
      isLoading: true
    };
    Reducer(teamReducer)
      .withState(state)
      .expect(action)
      .toReturnState(result);
  });

  it("should handle TEAM_FETCH_EDIT_SUCCESS action on existing state", () => {
    const action = {
      type: actionTypes.TEAM_FETCH_EDIT_SUCCESS,
      payload: {
        teamList: [
          {
            brief_description: "",
            created_at: "2018-12-13T20:42:04.804Z",
            id: "d8a645f2290844579455d8a9a5a286e3",
            name: "AAATeam",
            updated_at: "2018-12-13T20:42:04.804Z"
          }
        ],
        team: {
          brief_description: "",
          created_at: "2018-12-13T20:42:04.804Z",
          id: "d8a645f2290844579455d8a9a5a286e3",
          name: "AAATeam",
          updated_at: "2018-12-13T20:42:04.804Z"
        },
        currentTeamMemberList: []
      }
    };
    const state = {
      teamList: [],
      currentTeam: {},
      currentTeamMemberList: [],
      isLoading: true
    };
    const result = {
      teamList: [],
      currentTeam: {
        brief_description: "",
        created_at: "2018-12-13T20:42:04.804Z",
        id: "d8a645f2290844579455d8a9a5a286e3",
        name: "AAATeam",
        updated_at: "2018-12-13T20:42:04.804Z"
      },
      currentTeamMemberList: [],
      isLoading: false
    };
    Reducer(teamReducer)
      .withState(state)
      .expect(action)
      .toReturnState(result);
  });

  it("should handle TEAM_FETCH_ASSOCIATED_LIST action on initial state", () => {
    const action = {
      type: actionTypes.TEAM_FETCH_ASSOCIATED_LIST
    };
    const state = initialState;
    const result = {
      teamList: [],
      currentTeam: {},
      currentTeamMemberList: [],
      isLoading: true
    };
    Reducer(teamReducer)
      .withState(state)
      .expect(action)
      .toReturnState(result);
  });

  it("should handle TEAM_FETCH_ASSOCIATED_LIST_SUCCESS action on existing state", () => {
    const action = {
      type: actionTypes.TEAM_FETCH_ASSOCIATED_LIST_SUCCESS,
      payload: {
        teamMemberList: [
          {
            admin: true,
            avatarurl: "https://i.imgur.com/RrMFWtA.png",
            brief_description: "Aloha World!",
            created_at: "2018-12-13T18:08:15.161Z",
            detail_description:
              "about myself, I am not a person who likes to fish. I write code when I don't fish",
            email: "admin@email.com",
            id: "6ebe6250221d4519aad4bff92c8acd2c",
            online: false,
            username: "admin"
          }
        ],
        channelList: [
          {
            brief_description: "heyyoAaaasa",
            created_at: "2018-12-13T20:13:15.578Z",
            detail_description: "",
            id: "acd5b59b635d478690670e8abb0e6e3b",
            message_group: false,
            name: "random",
            public: true,
            team_id: "9f1589291bbf4ae6b0cd172eeb85fb82",
            updated_at: "2018-12-13T20:23:56.524Z"
          }
        ],
        currentTeamMemberList: []
      }
    };
    const state = {
      teamList: [],
      currentTeam: {},
      currentTeamMemberList: [],
      isLoading: true
    };
    const result = {
      teamList: [],
      currentTeam: {},
      currentTeamMemberList: [
        {
          admin: true,
          avatarurl: "https://i.imgur.com/RrMFWtA.png",
          brief_description: "Aloha World!",
          created_at: "2018-12-13T18:08:15.161Z",
          detail_description:
            "about myself, I am not a person who likes to fish. I write code when I don't fish",
          email: "admin@email.com",
          id: "6ebe6250221d4519aad4bff92c8acd2c",
          online: false,
          username: "admin"
        }
      ],
      isLoading: false
    };
    Reducer(teamReducer)
      .withState(state)
      .expect(action)
      .toReturnState(result);
  });
  it("should handle TEAM_SOCKET_RECEIVE_NEW_MEMBER action on initialState state", () => {
    const action = {
      type: actionTypes.TEAM_SOCKET_RECEIVE_NEW_MEMBER,
      payload: {
        teamMemberList: [
          {
            admin: true,
            avatarurl: "https://i.imgur.com/RrMFWtA.png",
            brief_description: "Aloha World!",
            created_at: "2018-12-13T18:08:15.161Z",
            detail_description:
              "about myself, I am not a person who likes to fish. I write code when I don't fish",
            email: "admin@email.com",
            id: "6ebe6250221d4519aad4bff92c8acd2c",
            online: false,
            username: "admin"
          }
        ]
      }
    };
    const state = initialState;
    const result = {
      teamList: [],
      currentTeam: {},
      currentTeamMemberList: [
        {
          admin: true,
          avatarurl: "https://i.imgur.com/RrMFWtA.png",
          brief_description: "Aloha World!",
          created_at: "2018-12-13T18:08:15.161Z",
          detail_description:
            "about myself, I am not a person who likes to fish. I write code when I don't fish",
          email: "admin@email.com",
          id: "6ebe6250221d4519aad4bff92c8acd2c",
          online: false,
          username: "admin"
        }
      ],
      isLoading: false
    };
    Reducer(teamReducer)
      .withState(state)
      .expect(action)
      .toReturnState(result);
  });

  it("should handle ERROR_TEAM action on initialState state", () => {
    const action = {
      type: actionTypes.ERROR_TEAM
    };
    const state = initialState;
    const result = {
      teamList: [],
      currentTeam: {},
      currentTeamMemberList: [],
      isLoading: false
    };
    Reducer(teamReducer)
      .withState(state)
      .expect(action)
      .toReturnState(result);
  });

  it("should handle USER_FETCH_SIGNOUT action on existing state", () => {
    const action = {
      type: actionTypes.USER_FETCH_SIGNOUT
    };
    const state = {
      teamList: [],
      currentTeam: {},
      currentTeamMemberList: [],
      isLoading: false
    };
    const result = {
      teamList: [],
      currentTeam: {},
      currentTeamMemberList: [],
      isLoading: false
    };
    Reducer(teamReducer)
      .withState(state)
      .expect(action)
      .toReturnState(result);
  });
});
