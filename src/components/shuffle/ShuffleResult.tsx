import { ShuffleResultTableHeaders } from "../../CONST";
import { Table } from "../table";
import { MemberInfoType } from "./Shuffle";

type PropsType = {
  teams: MemberInfoType[][];
};

export const ShuffleResult = ({ teams }: PropsType) => {
  return (
    <div>
      <h2 className="text-white font-bold">シャッフル結果</h2>
      <div className="flex flex-col gap-4">
        {teams.map((team, index) => (
          <div key={index}>
            <p className="text-white mb-2">チーム{index + 1}</p>
            <Table headers={ShuffleResultTableHeaders} items={team} />
          </div>
        ))}
      </div>
    </div>
  );
};
