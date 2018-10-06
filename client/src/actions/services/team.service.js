import { apiV1, socket } from "./API";
import { teamAction } from "@/actions";

export default {
  fetchCreateTeam: async teamFormInfo => {
    const response = await apiV1().post(`/teams`, teamFormInfo);
    return response;
  },
  fetchTeamAssociatedList: async teamId => {
    const response = await apiV1().get(`/teams/${teamId}`);
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
