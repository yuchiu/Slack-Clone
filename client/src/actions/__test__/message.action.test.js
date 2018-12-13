import { Thunk } from "redux-testkit";
import actionTypes from "@/actionTypes";
import { messageAction } from "@/actions";
import { messageService } from "@/actions/services";

jest.mock("@/actions/services/message.service");

describe("message.action", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  it("messageAction.fetchMoreMessage - should fetch message list from server", async () => {
    messageService.fetchMoreMessage.mockReturnValueOnce({
      data: {
        messageList: []
      }
    });
    const dispatches = await Thunk(messageAction.fetchMoreMessage).execute({
      data: {
        aloha: ""
      }
    });
    expect(dispatches.length).toBe(2);
    expect(dispatches[0].isPlainObject()).toBe(true);
    expect(dispatches[0].getAction()).toEqual({
      type: actionTypes.MESSAGE_FETCH_MORE
    });
    expect(dispatches[1].isPlainObject()).toBe(true);
    expect(dispatches[1].getAction()).toEqual({
      type: actionTypes.MESSAGE_FETCH_MORE_SUCCESS,
      payload: {
        messageList: []
      }
    });
  });
});
