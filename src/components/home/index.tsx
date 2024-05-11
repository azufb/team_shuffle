import { NavigateFunction, useNavigate } from "react-router-dom";
import { LOCAL_STORAGE_ALL_MEMBERS_KEY } from "../../CONST";
import { MembersList } from "../membersList/MembersList";
import { MemberInfoType } from "../shuffle/Shuffle";
import { pathsObj } from "../../pathsObj";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons/faTrashCan";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

export const Home = () => {
  const navigate: NavigateFunction = useNavigate();
  const allMembersJson: string | null = localStorage.getItem(
    LOCAL_STORAGE_ALL_MEMBERS_KEY
  );
  const parsedAllMembers: MemberInfoType[] =
    allMembersJson != null ? JSON.parse(allMembersJson) : [];
  const [allMemebers, setAllMembers] =
    useState<MemberInfoType[]>(parsedAllMembers);

  const navigateRegisterPage = (): void => {
    navigate(pathsObj.register);
  };

  const deleteData = (): void => {
    localStorage.removeItem(LOCAL_STORAGE_ALL_MEMBERS_KEY);
    setAllMembers([]);
  };

  return (
    <div className="py-8">
      {allMemebers.length === 0 ? (
        <div className="flex flex-col gap-4">
          <p className="text-white">
            メンバーが登録されていません。
            <br />
            まずは、メンバーを登録してください。
          </p>
          <button
            type="button"
            onClick={navigateRegisterPage}
            className="flex gap-2 justify-center items-center bg-blue rounded-md text-white"
          >
            <span>メンバー登録</span>
            <FontAwesomeIcon icon={faAngleRight} />
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <MembersList allMembers={allMemebers} />
          <button
            onClick={deleteData}
            className="flex gap-2 justify-center items-center bg-red rounded-md text-white"
          >
            <FontAwesomeIcon icon={faTrashCan} />
            <span>データ削除</span>
          </button>
        </div>
      )}
    </div>
  );
};
