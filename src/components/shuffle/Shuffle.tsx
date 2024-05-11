import { useState } from "react";
import { ShuffleResult } from "./ShuffleResult";
import {
  LOCAL_STORAGE_ALL_MEMBERS_KEY,
  MembersTableHeaders,
} from "../../CONST";
import { Table } from "../table";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons/faTrashCan";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShuffle } from "@fortawesome/free-solid-svg-icons/faShuffle";

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

  const handleShuffle = (): void => {
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

      // メンバーが足りないところはその要素削除
      members = members.filter((member) => member !== undefined);
      teams = [...teams, members];
    }
    // チームにメンバーがいないところはそのチームの要素は削除
    teams = teams.filter((team) => team.length >= 1);
    setTeamsInfo(teams);
  };

  const deleteData = (): void => {
    localStorage.removeItem(LOCAL_STORAGE_ALL_MEMBERS_KEY);
    setAllMembers([]);
    setMembersCount("1");
  };

  const handleChangeIsInclude = (targetIndex: number): void => {
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
    <div className="flex flex-col gap-8 py-8">
      <div className="flex flex-col gap-4">
        <Table
          headers={MembersTableHeaders}
          items={allMembers.map((member, index) => {
            return {
              ...member,
              action: (
                <input
                  type="checkbox"
                  checked={member.isInclude}
                  onChange={() => handleChangeIsInclude(index)}
                />
              ),
            };
          })}
          caption="※チェックを外すと、シャッフル対象から除外できます"
        />

        <button
          onClick={deleteData}
          className="flex gap-2 justify-center items-center bg-red rounded-md text-white"
        >
          <FontAwesomeIcon icon={faTrashCan} />
          <span>データ削除</span>
        </button>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex gap-2 items-center">
          <label className="text-white">1チームの人数</label>
          <div className="flex gap-2 items-end">
            <input
              type="number"
              value={membersCount}
              onChange={(e) => setMembersCount(e.target.value)}
              className="px-1 py-1.5 text-sm rounded-md"
            />
            <span className="text-white">人</span>
          </div>
        </div>

        <button
          onClick={handleShuffle}
          className="flex gap-2 justify-center items-center bg-blue rounded-md text-white"
        >
          <FontAwesomeIcon icon={faShuffle} />
          <span>シャッフル</span>
        </button>
      </div>

      {teamsInfo.length >= 1 && <ShuffleResult teams={teamsInfo} />}
    </div>
  );
};
