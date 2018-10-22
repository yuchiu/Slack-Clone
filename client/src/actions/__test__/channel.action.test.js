import { Thunk } from "redux-testkit";
import actionTypes from "@/actionTypes";
import { channelAction } from "@/actions";
import { channelService } from "@/actions/services";

jest.mock("@/actions/services/channel.service");

describe("channel.action", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should fetch channel associated list from server", async () => {
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
});
