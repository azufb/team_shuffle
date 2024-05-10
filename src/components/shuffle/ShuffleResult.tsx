import { MemberInfoType } from "./Shuffle";

type PropsType = {
  teams: MemberInfoType[][];
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
                <tr key={index}>
                  <td>{member.id}</td>
                  <td>{member.memberName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ))}
      </div>
    </div>
  );
};
