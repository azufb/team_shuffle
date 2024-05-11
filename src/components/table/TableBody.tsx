import { ItemActionType } from ".";
import { MemberInfoType } from "../shuffle/Shuffle";

export type TableBodyPropsType = {
  items: (MemberInfoType & ItemActionType)[];
};

export const TableBody = ({ items }: TableBodyPropsType) => {
  return (
    <>
      <tbody className="text-white">
        {items.map((item) => (
          <tr>
            <td className="border-2 border-sky text-center px-1 py-1.5">
              {item.id}
            </td>
            <td className="border-2 border-sky px-1 py-1.5">
              {item.memberName}
            </td>
            {item.action != null && (
              <td className="border-2 border-sky text-center px-1 py-1.5">
                {item.action}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </>
  );
};
