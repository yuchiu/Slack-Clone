import { APIV1 } from "./API";

export default {
  createChannel: async channelFormInfo => {
    const response = await APIV1().post(`/channels`, channelFormInfo);
    return response;
  }
};
