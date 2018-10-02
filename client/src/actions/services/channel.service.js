import { APIV1 } from "./API";

export default {
  fetchGetChannelAssociatedList: async channelId => {
    const response = await APIV1().get(`/channels/${channelId}`);
    return response;
  },

  fetchCreateChannel: async channelFormInfo => {
    const response = await APIV1().post(`/channels`, channelFormInfo);
    return response;
  }
};
