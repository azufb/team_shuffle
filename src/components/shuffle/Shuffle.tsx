import { useState } from "react";
import { ShuffleResult } from "./ShuffleResult";
import {
  LOCAL_STORAGE_ALL_MEMBERS_KEY,
  MEMBERS_TABLE_HEADERS,
} from "../../CONST";
import { Table } from "../table";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons/faTrashCan";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShuffle } from "@fortawesome/free-solid-svg-icons/faShuffle";
import { Button } from "../buttons/Button";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons/faAngleRight";
import { pathsObj } from "../../pathsObj";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { Modal } from "../modal/Modal";

export type MemberInfoType = {
  id: number;
  memberName: string;
  isInclude: boolean;
};

export const Shuffle = () => {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);
  const navigate: NavigateFunction = useNavigate();
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

  const openModal = (): void => {
    setIsConfirmModalOpen(true);
  };

  const deleteData = (): void => {
    localStorage.removeItem(LOCAL_STORAGE_ALL_MEMBERS_KEY);
    setAllMembers([]);
    setTeamsInfo([]);
    setMembersCount("1");
    setIsConfirmModalOpen(false);
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

  const navigatePage = (path: string): void => {
    navigate(path);
  };

  return (
    <>
      <div className="w-full md:w-1/2 py-8">
        <h2 className="text-white font-bold mb-4">シャッフル</h2>
        <div className="flex flex-col gap-8">
          {allMembers.length >= 1 ? (
            <>
              <div className="flex flex-col gap-4">
                <Table
                  headers={MEMBERS_TABLE_HEADERS}
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
                  caption="※チェックを外すと、シャッフル対象から除外できます。"
                />

                <Button
                  onClick={openModal}
                  className="flex gap-2 justify-center items-center bg-red rounded-md text-white"
                >
                  <>
                    <FontAwesomeIcon icon={faTrashCan} />
                    <span>データ削除</span>
                  </>
                </Button>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex gap-2 items-center">
                  <label className="text-white">1チーム</label>
                  <div className="flex gap-2 items-end">
                    <input
                      type="number"
                      min={1}
                      value={membersCount}
                      onChange={(e) => setMembersCount(e.target.value)}
                      className="px-1 py-1.5 text-sm rounded-md"
                    />
                    <span className="text-white">人</span>
                  </div>
                </div>

                <Button onClick={handleShuffle} className=" bg-blue">
                  <>
                    <FontAwesomeIcon icon={faShuffle} />
                    <span>シャッフル</span>
                  </>
                </Button>
              </div>
            </>
          ) : (
            <div className="flex flex-col gap-4">
              <p className="text-white">
                メンバーが登録されていません。
                <br />
                まずは、メンバーを登録してください。
              </p>
              <Button
                type="button"
                onClick={() => navigatePage(pathsObj.register)}
                className="flex gap-2 justify-center items-center bg-blue rounded-md text-white"
              >
                <>
                  <span>メンバー登録</span>
                  <FontAwesomeIcon icon={faAngleRight} />
                </>
              </Button>
            </div>
          )}

          {teamsInfo.length >= 1 && <ShuffleResult teams={teamsInfo} />}
        </div>
      </div>

      {/** 確認モーダル */}
      <Modal
        isOpen={isConfirmModalOpen}
        title="データ削除確認"
        content="データを削除しますがよろしいでしょうか？"
      >
        <Button
          onClick={deleteData}
          className="flex gap-2 justify-center items-center bg-red rounded-md text-white"
        >
          <>
            <FontAwesomeIcon icon={faTrashCan} />
            <span>データ削除</span>
          </>
        </Button>
      </Modal>
    </>
  );
};
