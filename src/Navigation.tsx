import { Link } from "react-router-dom";

export const Navigation = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">HOME</Link>
        </li>
        <li>
          <Link to="/shuffle">シャッフル</Link>
        </li>
      </ul>
    </div>
  );
};
