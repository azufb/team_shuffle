import { atom, selector } from "recoil";

export const teamMembersAtom = atom<string[]>({
  key: "teamMembers",
  default: [],
});

// ランダム
// const randomFunc = (length: number): number => {
//   const result: number = Math.floor(Math.random() * length);
//   return result;
// };

export const addMembersSelector = selector<string[]>({
  key: "addMembersSelector",
  get: ({ get }) => {
    return get(teamMembersAtom);
  },
  set: ({ set }, memberNames) => {
    set(teamMembersAtom, memberNames);
  },
});

// export const shuffleSelector = selector({
//   key: "shuffleSelector",
//   get: ({ get }) => {
//     return get(teamMembersAtom);
//   },
//   set: ({ get }) => {
//     // const allMembers: string[] = get(teamMembersAtom);
//     // const allMembersCount: number = allMembers.length;
//     // const randomResult: number = randomFunc(allMembersCount);
//     // const member: string = allMembers[randomResult];
//   },
// });
