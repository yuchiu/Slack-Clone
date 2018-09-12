import { APIV1 } from "./API";

export default {
  createChannel: async channelId => {
    const response = await APIV1().get(`/channel-messages/${channelId}`);
    return response;
  }
};
