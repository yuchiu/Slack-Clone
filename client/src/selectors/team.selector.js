import { createSelector } from "reselect";

/* state selectors */
const getStateTeamList = state => state.teamReducer.teamList;

export const getCurrentTeam = state => state.teamReducer.currentTeam;

export const getCurrentTeamMemberList = state =>
  state.teamReducer.currentTeamMemberList;

export const getTeamIsLoading = state => state.teamReducer.isLoading;

/* derived data selectors */
export const getTeamList = createSelector(getStateTeamList, teamList =>
  teamList.map(team => {
    const newTeam = { ...team };
    newTeam.initials = team.name
      .split(" ")
      .map(n => n[0])
      .join("")
      .slice(0, 2);
    return newTeam;
  })
);
