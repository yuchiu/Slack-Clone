import { apiV1 } from "./API";

export default {
  fetchGetChannelAssociatedList: async channelId => {
    const response = await apiV1().get(`/channels/${channelId}`);
    return response;
  },

  fetchCreateChannel: async channelFormInfo => {
    const response = await apiV1().post(`/channels`, channelFormInfo);
    return response;
  },

  fetchEditChannel: async editChannelData => {
    const response = await apiV1().put(`/channels`, editChannelData);
    return response;
  }
};
