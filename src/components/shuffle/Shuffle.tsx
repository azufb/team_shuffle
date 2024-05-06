import { useState } from "react";
import { useRecoilValue } from "recoil";
import { teamMembersAtom } from "../../recoil/states";

export const Shuffle = () => {
  const [membersCount, setMembersCount] = useState<string>("0");
  const allMembers: string[] = useRecoilValue<string[]>(teamMembersAtom);

  // ランダム
  const randomFunc = (length: number): number => {
    const result: number = Math.floor(Math.random() * length);
    return result;
  };

  const handleShuffle = () => {
    console.log(allMembers);
    const slicedMembers: string[] = allMembers.slice();
    const teamsCount: number = allMembers.length / Number(membersCount);
    let teams = new Array(teamsCount);
    let members: string[] = slicedMembers;

    for (let i = 0; i < teamsCount; i++) {
      let eachTeam: string[] = [];
      for (let j = 0; j < Number(membersCount); j++) {
        const result: number = randomFunc(allMembers.length);
        eachTeam = [...eachTeam, members[result]];
        members = members.filter((member) => member !== slicedMembers[result]);
        console.log("slicedMembers", members);
      }

      console.log(eachTeam);

      teams = [...teams, eachTeam];
    }
    console.log("teams", teams);
  };

  return (
    <div>
      <h2>チームシャッフル！</h2>

      <div>
        <label>1チームの人数</label>
        <input
          type="number"
          onChange={(e) => setMembersCount(e.target.value)}
        />
      </div>

      <div>
        <button onClick={handleShuffle}>Shuffle</button>
      </div>
    </div>
  );
};
