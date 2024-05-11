import { MemberInfoType } from "../shuffle/Shuffle";
import { TableBody } from "./TableBody";
import { TableHeader } from "./TableHeader";

export type ItemActionType = {
  action?: JSX.Element;
};

type PropsType = {
  headers: string[];
  items: (MemberInfoType & ItemActionType)[];
};

export const Table = ({ headers, items }: PropsType) => {
  return (
    <table>
      <TableHeader headers={headers} />
      <TableBody items={items} />
    </table>
  );
};
