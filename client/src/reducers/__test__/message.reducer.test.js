import { Reducer } from "redux-testkit";
import actionTypes from "@/actionTypes";
import { messageReducer } from "@/reducers";

const initialState = {
  messageList: [],
  hasMoreMessage: true,
  isLoading: false
};

describe("message.reducer initial state", () => {
  it("should have initial state", () => {
    expect(messageReducer(initialState, {})).toEqual(initialState);
  });

  it("should handle CHANNEL_FETCH_ASSOCIATED_LIST_SUCCESS action on initial state", () => {
    const action = {
      type: actionTypes.CHANNEL_FETCH_ASSOCIATED_LIST_SUCCESS,
      payload: {
        messageList: [
          {
            avatarurl:
              "https://lh3.googleusercontent.com/-VK-5u1KZS2Y/AAAAAAAAAAI/AAAAAAAAD9E/6_VUtgx-NXI/s96-c/photo.jpg",
            channel_id: "acd5b59b635d478690670e8abb0e6e3b",
            created_at: "2018-12-13T21:35:27.616Z",
            filetype: "",
            id: "8044303378964b95b945cbe22b66279f",
            text: "dasfasdfasf",
            updated_at: "2018-12-13T21:35:27.616Z",
            url: "",
            user_id: "cf1c6dee7bac4823a67333c6e21009a6",
            username: "RainmanSyc"
          }
        ]
      }
    };
    const state = initialState;
    const result = {
      messageList: [
        {
          avatarurl:
            "https://lh3.googleusercontent.com/-VK-5u1KZS2Y/AAAAAAAAAAI/AAAAAAAAD9E/6_VUtgx-NXI/s96-c/photo.jpg",
          channel_id: "acd5b59b635d478690670e8abb0e6e3b",
          created_at: "2018-12-13T21:35:27.616Z",
          filetype: "",
          id: "8044303378964b95b945cbe22b66279f",
          text: "dasfasdfasf",
          updated_at: "2018-12-13T21:35:27.616Z",
          url: "",
          user_id: "cf1c6dee7bac4823a67333c6e21009a6",
          username: "RainmanSyc"
        }
      ],
      hasMoreMessage: true,
      isLoading: false
    };
    Reducer(messageReducer)
      .withState(state)
      .expect(action)
      .toReturnState(result);
  });

  it("should handle MESSAGE_SOCKET_RECEIVE action on initial state", () => {
    const action = {
      type: actionTypes.MESSAGE_SOCKET_RECEIVE,
      payload: {
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
        message: {
          avatarurl:
            "https://lh3.googleusercontent.com/-VK-5u1KZS2Y/AAAAAAAAAAI/AAAAAAAAD9E/6_VUtgx-NXI/s96-c/photo.jpg",
          channel_id: "acd5b59b635d478690670e8abb0e6e3b",
          created_at: "2018-12-13T21:35:27.616Z",
          filetype: "",
          id: "8044303378964b95b945cbe22b66279f",
          text: "dasfasdfasf",
          updated_at: "2018-12-13T21:35:27.616Z",
          url: "",
          user_id: "cf1c6dee7bac4823a67333c6e21009a6",
          username: "RainmanSyc"
        }
      }
    };
    const state = initialState;
    const result = {
      messageList: [
        {
          avatarurl:
            "https://lh3.googleusercontent.com/-VK-5u1KZS2Y/AAAAAAAAAAI/AAAAAAAAD9E/6_VUtgx-NXI/s96-c/photo.jpg",
          channel_id: "acd5b59b635d478690670e8abb0e6e3b",
          created_at: "2018-12-13T21:35:27.616Z",
          filetype: "",
          id: "8044303378964b95b945cbe22b66279f",
          text: "dasfasdfasf",
          updated_at: "2018-12-13T21:35:27.616Z",
          url: "",
          user_id: "cf1c6dee7bac4823a67333c6e21009a6",
          username: "RainmanSyc"
        }
      ],
      hasMoreMessage: true,
      isLoading: false
    };
    Reducer(messageReducer)
      .withState(state)
      .expect(action)
      .toReturnState(result);
  });
  it("should handle MESSAGE_SOCKET_RECEIVE action on existing state", () => {
    const action = {
      type: actionTypes.GLOBAL_SOCKET_CONNECTION_CLEAR
    };
    const state = {
      messageList: [
        {
          avatarurl:
            "https://lh3.googleusercontent.com/-VK-5u1KZS2Y/AAAAAAAAAAI/AAAAAAAAD9E/6_VUtgx-NXI/s96-c/photo.jpg",
          channel_id: "acd5b59b635d478690670e8abb0e6e3b",
          created_at: "2018-12-13T21:35:27.616Z",
          filetype: "",
          id: "8044303378964b95b945cbe22b66279f",
          text: "dasfasdfasf",
          updated_at: "2018-12-13T21:35:27.616Z",
          url: "",
          user_id: "cf1c6dee7bac4823a67333c6e21009a6",
          username: "RainmanSyc"
        }
      ],
      hasMoreMessage: true,
      isLoading: false
    };
    const result = {
      messageList: [],
      hasMoreMessage: true,
      isLoading: false
    };
    Reducer(messageReducer)
      .withState(state)
      .expect(action)
      .toReturnState(result);
  });

  it("should handle MESSAGE_FETCH_MORE action on initial state", () => {
    const action = {
      type: actionTypes.MESSAGE_FETCH_MORE
    };
    const state = initialState;
    const result = {
      messageList: [],
      hasMoreMessage: true,
      isLoading: true
    };
    Reducer(messageReducer)
      .withState(state)
      .expect(action)
      .toReturnState(result);
  });

  it("should handle MESSAGE_FETCH_MORE_SUCCESS action on existing state", () => {
    const action = {
      type: actionTypes.MESSAGE_FETCH_MORE_SUCCESS,
      payload: {
        messageList: [
          {
            avatarurl:
              "https://lh3.googleusercontent.com/-VK-5u1KZS2Y/AAAAAAAAAAI/AAAAAAAAD9E/6_VUtgx-NXI/s96-c/photo.jpg",
            channel_id: "acd5b59b635d478690670e8abb0e6e3b",
            created_at: "2018-12-13T21:35:27.616Z",
            filetype: "",
            id: "8044303378964b95b945cbe22b66279f",
            text: "dasfasdfasf",
            updated_at: "2018-12-13T21:35:27.616Z",
            url: "",
            user_id: "cf1c6dee7bac4823a67333c6e21009a6",
            username: "RainmanSyc"
          }
        ]
      }
    };
    const state = {
      messageList: [
        {
          avatarurl:
            "https://lh3.googleusercontent.com/-VK-5u1KZS2Y/AAAAAAAAAAI/AAAAAAAAD9E/6_VUtgx-NXI/s96-c/photo.jpg",
          channel_id: "acd5b59b635d478690670e8abb0e6e3b",
          created_at: "2018-12-13T21:35:27.616Z",
          filetype: "",
          id: "8044303378964b95b945cbe22b66279f",
          text: "dasfasdfasf",
          updated_at: "2018-12-13T21:35:27.616Z",
          url: "",
          user_id: "cf1c6dee7bac4823a67333c6e21009a6",
          username: "RainmanSyc"
        }
      ],
      hasMoreMessage: true,
      isLoading: true
    };
    const result = {
      messageList: [
        {
          avatarurl:
            "https://lh3.googleusercontent.com/-VK-5u1KZS2Y/AAAAAAAAAAI/AAAAAAAAD9E/6_VUtgx-NXI/s96-c/photo.jpg",
          channel_id: "acd5b59b635d478690670e8abb0e6e3b",
          created_at: "2018-12-13T21:35:27.616Z",
          filetype: "",
          id: "8044303378964b95b945cbe22b66279f",
          text: "dasfasdfasf",
          updated_at: "2018-12-13T21:35:27.616Z",
          url: "",
          user_id: "cf1c6dee7bac4823a67333c6e21009a6",
          username: "RainmanSyc"
        },
        {
          avatarurl:
            "https://lh3.googleusercontent.com/-VK-5u1KZS2Y/AAAAAAAAAAI/AAAAAAAAD9E/6_VUtgx-NXI/s96-c/photo.jpg",
          channel_id: "acd5b59b635d478690670e8abb0e6e3b",
          created_at: "2018-12-13T21:35:27.616Z",
          filetype: "",
          id: "8044303378964b95b945cbe22b66279f",
          text: "dasfasdfasf",
          updated_at: "2018-12-13T21:35:27.616Z",
          url: "",
          user_id: "cf1c6dee7bac4823a67333c6e21009a6",
          username: "RainmanSyc"
        }
      ],
      hasMoreMessage: false,
      isLoading: false
    };
    Reducer(messageReducer)
      .withState(state)
      .expect(action)
      .toReturnState(result);
  });

  it("should handle ERROR_MESSAGE action on initial state", () => {
    const action = {
      type: actionTypes.ERROR_MESSAGE
    };
    const state = {
      messageList: [],
      hasMoreMessage: true,
      isLoading: true
    };
    const result = {
      messageList: [],
      hasMoreMessage: true,
      isLoading: false
    };
    Reducer(messageReducer)
      .withState(state)
      .expect(action)
      .toReturnState(result);
  });
  it("should handle USER_FETCH_SIGNOUT action on initial state", () => {
    const action = {
      type: actionTypes.USER_FETCH_SIGNOUT
    };
    const state = initialState;
    const result = initialState;
    Reducer(messageReducer)
      .withState(state)
      .expect(action)
      .toReturnState(result);
  });
});
