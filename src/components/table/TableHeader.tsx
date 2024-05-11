export type TableHeaderPropsType = {
  headers: string[];
};

export const TableHeader = ({ headers }: TableHeaderPropsType) => {
  return (
    <>
      <thead>
        <tr>
          {headers.map((header) => (
            <th>{header}</th>
          ))}
        </tr>
      </thead>
    </>
  );
};
