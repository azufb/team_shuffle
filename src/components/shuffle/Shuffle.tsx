import { useState } from "react";
import { ShuffleResult } from "./ShuffleResult";
import { LOCAL_STORAGE_ALL_MEMBERS_KEY } from "../../CONST";

export const Shuffle = () => {
  const [membersCount, setMembersCount] = useState<string>("0");
  const [teamsInfo, setTeamsInfo] = useState<string[][]>([]);
  const allMembersJson = localStorage.getItem(LOCAL_STORAGE_ALL_MEMBERS_KEY);
  const [allMembers, setAllMembers] = useState<string[]>(
    allMembersJson != null ? JSON.parse(allMembersJson) : []
  );

  const handleShuffle = () => {
    let slicedMembers: string[] = allMembers.slice();
    const teamsCount: number = allMembers.length / Number(membersCount);
    let teams: string[][] = [];

    for (let i = 0; i < teamsCount; i++) {
      let members: string[] = [];
      for (let j = 0; j < Number(membersCount); j++) {
        const result: number = Math.floor(Math.random() * slicedMembers.length);
        members = [...members, slicedMembers[result]];
        slicedMembers = slicedMembers.filter(
          (member) => member !== slicedMembers[result]
        );
      }

      teams = [...teams, members];
    }
    setTeamsInfo(teams);
  };

  const deleteData = () => {
    localStorage.removeItem(LOCAL_STORAGE_ALL_MEMBERS_KEY);
    setAllMembers([]);
  };

  return (
    <div>
      <div>
        <table>
          <thead>
            <tr>
              <th>No.</th>
              <th>名前</th>
            </tr>
          </thead>
          <tbody>
            {allMembers.map((member, index) => (
              <tr key={index}>
                <td>{index}</td>
                <td>{member}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <label>1チームの人数</label>
        <input
          type="number"
          onChange={(e) => setMembersCount(e.target.value)}
        />
      </div>

      <button onClick={deleteData}>データ削除</button>

      <div>
        <button onClick={handleShuffle}>Shuffle</button>
      </div>

      <ShuffleResult teams={teamsInfo} />
    </div>
  );
};
