import { APIV1 } from "./API";

export default {
  getChannelMessageList: async channelId => {
    const response = await APIV1().get(`/channel-messages/${channelId}`);
    return response;
  }
};
