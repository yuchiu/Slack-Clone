import { APIV1 } from "./API";
import socket from "./socket";
import { teamAction } from "@/actions";

export default {
  fetchCreateTeam: async teamFormInfo => {
    const response = await APIV1().post(`/teams`, teamFormInfo);
    return response;
  },
  fetchTeamAssociatedList: async teamId => {
    const response = await APIV1().get(`/teams/${teamId}`);
    return response;
  },

  emitSocketAddTeamMember: addMemberData => {
    socket.emit("team-new-member", addMemberData);
  },

  /* dispatch dispatchReceivedChannel when new data is received */
  receiveSocketNewTeamMember: dispatch => {
    socket.on("team-receive-new-member", async data => {
      if (data) dispatch(teamAction.dispatchReceivedTeamMemberl(data));
    });
  }
};
