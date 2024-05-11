import { SHUFFLE_RESULT_TABLE_HEADERS } from "../../CONST";
import { MemberInfoType } from "../shuffle/Shuffle";
import { Table } from "../table";

type PropsType = {
  allMembers: MemberInfoType[];
};

export const MembersList = ({ allMembers }: PropsType) => {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-white font-bold">メンバーの登録状況</p>
      <Table headers={SHUFFLE_RESULT_TABLE_HEADERS} items={allMembers} />
      <p className="text-white">合計：{allMembers.length}人</p>
    </div>
  );
};
