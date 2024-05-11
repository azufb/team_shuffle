import { MemberInfoType } from "../shuffle/Shuffle";

type PropsType = {
  allMembers: MemberInfoType[];
};

export const MembersList = ({ allMembers }: PropsType) => {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-white font-bold">メンバーの登録状況</p>
      <ul className="text-white list-disc list-inside">
        {allMembers.map((member) => (
          <li key={member.id}>{member.memberName}</li>
        ))}
      </ul>
      <p className="text-white">合計：{allMembers.length}人</p>
    </div>
  );
};
