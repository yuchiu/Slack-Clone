import { APIV1 } from "./API";

export default {
  createMessageGroup: async messageGroupFormInfo => {
    const response = await APIV1().post(
      `/message-groups`,
      messageGroupFormInfo
    );
    return response;
  }
};
