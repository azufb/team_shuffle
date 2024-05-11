import { MemberInfoType } from "../shuffle/Shuffle";
import { TableBody } from "./TableBody";
import { TableHeader } from "./TableHeader";

export type ItemActionType = {
  action?: JSX.Element;
};

type PropsType = {
  headers: string[];
  items: (MemberInfoType & ItemActionType)[];
  caption?: string;
};

export const Table = ({ headers, items, caption }: PropsType) => {
  return (
    <table className="w-full border border-collapse">
      <caption className="text-sm text-white">{caption}</caption>
      <TableHeader headers={headers} />
      <TableBody items={items} />
    </table>
  );
};
