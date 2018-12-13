import { Thunk } from "redux-testkit";
import actionTypes from "@/actionTypes";
import { channelAction } from "@/actions";
import { channelService } from "@/actions/services";

jest.mock("@/actions/services/channel.service");

describe("channel.action", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  it("channelAction.switchChannel - should switchChannel", async () => {
    const dispatches = await Thunk(channelAction.switchChannel).execute(31);
    expect(dispatches.length).toBe(1);
    expect(dispatches[0].getAction()).toEqual({
      type: actionTypes.CHANNEL_SWITCH,
      payload: 31
    });
  });

  it("channelAction.fetchCreateChannel - should fetch create channel from server", async () => {
    channelService.fetchCreateChannel.mockReturnValueOnce({
      data: {
        channelList: [],
        channelMemberList: [],
        channel: {
          brief_description: "",
          created_at: "2018-12-13T20:13:15.578Z",
          detail_description: "",
          id: "acd5b59b635d478690670e8abb0e6e3b",
          message_group: false,
          name: "random",
          public: true,
          team_id: "9f1589291bbf4ae6b0cd172eeb85fb82",
          updated_at: "2018-12-13T20:13:15.578Z"
        }
      }
    });
    const dispatches = await Thunk(channelAction.fetchCreateChannel).execute();
    expect(dispatches.length).toBe(2);
    expect(dispatches[0].getAction()).toEqual({
      type: actionTypes.CHANNEL_FETCH_CREATE
    });
    expect(dispatches[1].getAction()).toEqual({
      type: actionTypes.CHANNEL_FETCH_CREATE_SUCCESS,
      payload: {
        channelList: [],
        channelMemberList: [],
        channel: {
          brief_description: "",
          created_at: "2018-12-13T20:13:15.578Z",
          detail_description: "",
          id: "acd5b59b635d478690670e8abb0e6e3b",
          message_group: false,
          name: "random",
          public: true,
          team_id: "9f1589291bbf4ae6b0cd172eeb85fb82",
          updated_at: "2018-12-13T20:13:15.578Z"
        }
      }
    });
  });

  it("channelAction.fetchGetChannelAssociatedList - should fetch channel associated list from server", async () => {
    channelService.fetchGetChannelAssociatedList.mockReturnValueOnce({
      data: {
        channelList: [],
        channelMemberList: []
      }
    });
    const dispatches = await Thunk(
      channelAction.fetchGetChannelAssociatedList
    ).execute();
    expect(dispatches.length).toBe(2);
    expect(dispatches[0].isPlainObject()).toBe(true);
    expect(dispatches[0].getAction()).toEqual({
      type: actionTypes.CHANNEL_FETCH_ASSOCIATED_LIST
    });
    expect(dispatches[1].isPlainObject()).toBe(true);
    expect(dispatches[1].getAction()).toEqual({
      type: actionTypes.CHANNEL_FETCH_ASSOCIATED_LIST_SUCCESS,
      payload: {
        channelList: [],
        channelMemberList: []
      }
    });
  });

  it("channelAction.fetchEditChannel - should fetch edit channel from server", async () => {
    channelService.fetchEditChannel.mockReturnValueOnce({
      data: {
        channelList: [],
        channel: {
          brief_description: "",
          created_at: "2018-12-13T20:13:15.578Z",
          detail_description: "",
          id: "acd5b59b635d478690670e8abb0e6e3b",
          message_group: false,
          name: "random",
          public: true,
          team_id: "9f1589291bbf4ae6b0cd172eeb85fb82",
          updated_at: "2018-12-13T20:13:15.578Z"
        }
      }
    });
    const dispatches = await Thunk(channelAction.fetchEditChannel).execute();
    expect(dispatches.length).toBe(2);
    expect(dispatches[0].getAction()).toEqual({
      type: actionTypes.CHANNEL_FETCH_EDIT
    });
    expect(dispatches[1].getAction()).toEqual({
      type: actionTypes.CHANNEL_FETCH_EDIT_SUCCESS,
      payload: {
        channelList: [],
        channel: {
          brief_description: "",
          created_at: "2018-12-13T20:13:15.578Z",
          detail_description: "",
          id: "acd5b59b635d478690670e8abb0e6e3b",
          message_group: false,
          name: "random",
          public: true,
          team_id: "9f1589291bbf4ae6b0cd172eeb85fb82",
          updated_at: "2018-12-13T20:13:15.578Z"
        }
      }
    });
  });
});
