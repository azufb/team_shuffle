import { ItemActionType } from ".";
import { MemberInfoType } from "../shuffle/Shuffle";

export type TableBodyPropsType = {
  items: (MemberInfoType & ItemActionType)[];
};

export const TableBody = ({ items }: TableBodyPropsType) => {
  return (
    <>
      <tbody>
        {items.map((item) => (
          <tr>
            <td>{item.id}</td>
            <td>{item.memberName}</td>
            {item.action !== null && <td>{item.action}</td>}
          </tr>
        ))}
      </tbody>
    </>
  );
};
