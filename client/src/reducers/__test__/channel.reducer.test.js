import { Reducer } from "redux-testkit";

import actionTypes from "@/actionTypes";
import channelReducer from "@/reducers/channel.reducer";

const initialState = {
  channelList: [],
  currentChannel: {},
  currentChannelMemberList: [],
  isLoading: false
};

describe("channel.reducer initial state", () => {
  it("should have initial state", () => {
    expect(channelReducer(initialState, {})).toEqual(initialState);
  });

  it("should handle CHANNEL_SWITCH action on existing state", () => {
    const action = {
      type: actionTypes.CHANNEL_SWITCH,
      payload: "acd5b59b635d478690670e8abb0e6e3b"
    };
    const state = {
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
      currentChannel: {},
      currentChannelMemberList: [],
      isLoading: false
    };
    const result = {
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
      currentChannel: {
        brief_description: "heyyoAaaasa",
        created_at: "2018-12-13T20:13:15.578Z",
        detail_description: "",
        id: "acd5b59b635d478690670e8abb0e6e3b",
        message_group: false,
        name: "random",
        public: true,
        team_id: "9f1589291bbf4ae6b0cd172eeb85fb82",
        updated_at: "2018-12-13T20:23:56.524Z"
      },
      currentChannelMemberList: [],
      isLoading: false
    };
    Reducer(channelReducer)
      .withState(state)
      .expect(action)
      .toReturnState(result);
  });

  it("should handle TEAM_FETCH_ASSOCIATED_LIST_SUCCESS action on initial state", () => {
    const action = {
      type: actionTypes.TEAM_FETCH_ASSOCIATED_LIST_SUCCESS,
      payload: {
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
        ]
      }
    };
    const state = initialState;
    const result = {
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
      currentChannel: {
        brief_description: "heyyoAaaasa",
        created_at: "2018-12-13T20:13:15.578Z",
        detail_description: "",
        id: "acd5b59b635d478690670e8abb0e6e3b",
        message_group: false,
        name: "random",
        public: true,
        team_id: "9f1589291bbf4ae6b0cd172eeb85fb82",
        updated_at: "2018-12-13T20:23:56.524Z"
      },
      currentChannelMemberList: [],
      isLoading: false
    };
    Reducer(channelReducer)
      .withState(state)
      .expect(action)
      .toReturnState(result);
  });

  it("should handle CHANNEL_SWITCH action on initial state", () => {
    const action = {
      type: actionTypes.CHANNEL_FETCH_CREATE
    };
    const state = initialState;
    const result = {
      channelList: [],
      currentChannel: {},
      currentChannelMemberList: [],
      isLoading: true
    };
    Reducer(channelReducer)
      .withState(state)
      .expect(action)
      .toReturnState(result);
  });

  it("should handle CHANNEL_FETCH_CREATE_SUCCESS action on initial state", () => {
    const action = {
      type: actionTypes.CHANNEL_FETCH_CREATE_SUCCESS,
      payload: {
        channelList: [{ id: "somechannleid" }],
        channel: { id: "somechannleid" },
        channelMemberList: [{ id: "somememberid" }]
      }
    };
    const state = initialState;
    const result = {
      channelList: [{ id: "somechannleid" }],
      currentChannel: { id: "somechannleid" },
      currentChannelMemberList: [{ id: "somememberid" }],
      isLoading: false
    };
    Reducer(channelReducer)
      .withState(state)
      .expect(action)
      .toReturnState(result);
  });

  it("should handle CHANNEL_FETCH_EDIT action on initial state", () => {
    const action = {
      type: actionTypes.CHANNEL_FETCH_EDIT
    };
    const state = initialState;
    const result = {
      channelList: [],
      currentChannel: {},
      currentChannelMemberList: [],
      isLoading: true
    };
    Reducer(channelReducer)
      .withState(state)
      .expect(action)
      .toReturnState(result);
  });

  it("should handle CHANNEL_FETCH_ASSOCIATED_LIST_SUCCESS action on initial state", () => {
    const action = {
      type: actionTypes.CHANNEL_FETCH_ASSOCIATED_LIST_SUCCESS,
      payload: {
        channelMemberList: [
          {
            id: "somememberid"
          }
        ]
      }
    };
    const state = initialState;
    const result = {
      channelList: [],
      currentChannel: {},
      currentChannelMemberList: [
        {
          id: "somememberid"
        }
      ],
      isLoading: false
    };
    Reducer(channelReducer)
      .withState(state)
      .expect(action)
      .toReturnState(result);
  });

  it("should handle ERROR_CHANNEL action on existing state", () => {
    const action = {
      type: actionTypes.ERROR_CHANNEL
    };
    const state = {
      channelList: [],
      currentChannel: {},
      currentChannelMemberList: [],
      isLoading: true
    };
    const result = {
      channelList: [],
      currentChannel: {},
      currentChannelMemberList: [],
      isLoading: false
    };
    Reducer(channelReducer)
      .withState(state)
      .expect(action)
      .toReturnState(result);
  });

  it("should handle USER_FETCH_SIGNOUT action on existing state", () => {
    const action = {
      type: actionTypes.USER_FETCH_SIGNOUT
    };
    const state = {
      channelList: [{ id: "somechnanelid" }],
      currentChannel: {},
      currentChannelMemberList: [],
      isLoading: false
    };
    const result = initialState;
    Reducer(channelReducer)
      .withState(state)
      .expect(action)
      .toReturnState(result);
  });
});
