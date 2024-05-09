type PropsType = {
  teams: string[][];
};

export const ShuffleResult = ({ teams }: PropsType) => {
  return (
    <div>
      <h2>シャッフル結果</h2>
      <div>
        {teams.map((team) => (
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>名前</th>
              </tr>
            </thead>
            <tbody>
              {team.map((member, index) => (
                <tr>
                  <td>{index}</td>
                  <td>{member}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ))}
      </div>
    </div>
  );
};
