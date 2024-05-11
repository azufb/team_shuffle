import { useState } from "react";
import { ShuffleResult } from "./ShuffleResult";
import { LOCAL_STORAGE_ALL_MEMBERS_KEY } from "../../CONST";

export type MemberInfoType = {
  id: number;
  memberName: string;
  isInclude: boolean;
};

export const Shuffle = () => {
  const [membersCount, setMembersCount] = useState<string>("1");
  const [teamsInfo, setTeamsInfo] = useState<MemberInfoType[][]>([]);
  const allMembersJson = localStorage.getItem(LOCAL_STORAGE_ALL_MEMBERS_KEY);
  const [allMembers, setAllMembers] = useState<MemberInfoType[]>(
    allMembersJson != null ? JSON.parse(allMembersJson) : []
  );

  const handleShuffle = () => {
    let slicedMembers: MemberInfoType[] = allMembers.slice();
    // isIncludeがfalseのものは省く
    slicedMembers = slicedMembers.filter((member) => member.isInclude === true);
    const teamsCount: number = allMembers.length / Number(membersCount);
    let teams: MemberInfoType[][] = [];

    for (let i = 0; i < teamsCount; i++) {
      let members: MemberInfoType[] = [];
      for (let j = 0; j < Number(membersCount); j++) {
        const result: number = Math.floor(Math.random() * slicedMembers.length);
        members = [...members, slicedMembers[result]];
        slicedMembers = slicedMembers.filter(
          (member) => member !== slicedMembers[result]
        );
      }

      members = members.filter((member) => member !== undefined);

      teams = [...teams, members];
    }
    setTeamsInfo(teams);
  };

  const deleteData = () => {
    localStorage.removeItem(LOCAL_STORAGE_ALL_MEMBERS_KEY);
    setAllMembers([]);
    setMembersCount("0");
  };

  const handleChangeIsInclude = (targetIndex: number) => {
    const before = allMembers.slice(0, targetIndex);
    const after = allMembers.slice(targetIndex + 1);
    const updated: MemberInfoType[] = [
      ...before,
      {
        ...allMembers[targetIndex],
        isInclude: !allMembers[targetIndex].isInclude,
      },
      ...after,
    ];
    setAllMembers(updated);
    const jsonUpdated = JSON.stringify(updated);
    localStorage.setItem(LOCAL_STORAGE_ALL_MEMBERS_KEY, jsonUpdated);
  };

  return (
    <div>
      <div>
        <table>
          <thead>
            <tr>
              <th>No.</th>
              <th>名前</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {allMembers.map((member, index) => (
              <tr key={index}>
                <td>{member.id}</td>
                <td>{member.memberName}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={member.isInclude}
                    onChange={() => handleChangeIsInclude(index)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <label>1チームの人数</label>
        <input
          type="number"
          value={membersCount}
          onChange={(e) => setMembersCount(e.target.value)}
          className="shadow appearance-none border rounded focus:outline-none focus:shadow-outline"
        />
        <span>人</span>
      </div>

      <button onClick={deleteData}>データ削除</button>

      <div>
        <button onClick={handleShuffle}>Shuffle</button>
      </div>

      <ShuffleResult teams={teamsInfo} />
    </div>
  );
};
