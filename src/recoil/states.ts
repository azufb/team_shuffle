import { atom, selector } from "recoil";

const teamMembersAtom = atom<string[]>({
  key: "teamMembers",
  default: [],
});

export const addMembersSelector = selector<string[]>({
  key: "addMembersSelector",
  get: ({ get }) => {
    return get(teamMembersAtom);
  },
  set: ({ set }, memberNames) => {
    set(teamMembersAtom, memberNames);
  },
});
