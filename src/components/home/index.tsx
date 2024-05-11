import { NavigateFunction, useNavigate } from "react-router-dom";
import { LOCAL_STORAGE_ALL_MEMBERS_KEY } from "../../CONST";
import { MembersList } from "../membersList/MembersList";
import { MemberInfoType } from "../shuffle/Shuffle";
import { pathsObj } from "../../pathsObj";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons/faTrashCan";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../buttons/Button";

export const Home = () => {
  const navigate: NavigateFunction = useNavigate();
  const allMembersJson: string | null = localStorage.getItem(
    LOCAL_STORAGE_ALL_MEMBERS_KEY
  );
  const parsedAllMembers: MemberInfoType[] =
    allMembersJson != null ? JSON.parse(allMembersJson) : [];
  const [allMemebers, setAllMembers] =
    useState<MemberInfoType[]>(parsedAllMembers);

  const deleteData = (): void => {
    localStorage.removeItem(LOCAL_STORAGE_ALL_MEMBERS_KEY);
    setAllMembers([]);
  };

  const navigatePage = (path: string): void => {
    navigate(path);
  };

  return (
    <div className="w-full md:w-1/2 py-8">
      {allMemebers.length === 0 ? (
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
      ) : (
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <MembersList allMembers={allMemebers} />
            <Button
              onClick={deleteData}
              className="flex gap-2 justify-center items-center bg-red rounded-md text-white"
            >
              <>
                <FontAwesomeIcon icon={faTrashCan} />
                <span>データ削除</span>
              </>
            </Button>
          </div>

          <Button
            type="button"
            onClick={() => navigatePage(pathsObj.shuffle)}
            className="flex gap-2 justify-center items-center bg-blue rounded-md text-white"
          >
            <>
              <span>シャッフルする</span>
              <FontAwesomeIcon icon={faAngleRight} />
            </>
          </Button>
        </div>
      )}
    </div>
  );
};
