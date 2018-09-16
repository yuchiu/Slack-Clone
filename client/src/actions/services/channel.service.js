import { APIV1 } from "./API";

export default {
  getChannelAssociatedList: async channelId => {
    const response = await APIV1().get(`/channels/${channelId}`);
    return response;
  },

  createChannel: async channelFormInfo => {
    const response = await APIV1().post(`/channels`, channelFormInfo);
    return response;
  }
};
