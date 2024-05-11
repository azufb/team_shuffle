import { Link } from "react-router-dom";

export const Navigation = () => {
  return (
    <div>
      <ul className="flex gap-4">
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
