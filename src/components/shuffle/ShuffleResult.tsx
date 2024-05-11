import { ShuffleResultTableHeaders } from "../../CONST";
import { Table } from "../table";
import { MemberInfoType } from "./Shuffle";

type PropsType = {
  teams: MemberInfoType[][];
};

export const ShuffleResult = ({ teams }: PropsType) => {
  return (
    <div>
      <h2>シャッフル結果</h2>
      <div>
        {teams.map((team, index) => (
          <>
            <p>チーム{index + 1}</p>
            <Table headers={ShuffleResultTableHeaders} items={team} />
          </>
        ))}
      </div>
    </div>
  );
};
