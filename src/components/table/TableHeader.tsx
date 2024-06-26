export type TableHeaderPropsType = {
  headers: string[];
};

export const TableHeader = ({ headers }: TableHeaderPropsType) => {
  return (
    <>
      <thead className="text-white">
        <tr>
          {headers.map((header, index) => (
            <th key={index} className="border-2 border-sky bg-sky">
              {header}
            </th>
          ))}
        </tr>
      </thead>
    </>
  );
};
