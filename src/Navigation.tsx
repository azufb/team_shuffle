import { Link, useLocation } from "react-router-dom";
import { pathsObj } from "./pathsObj";

export const Navigation = () => {
  const location = useLocation();
  const currentPathName: string = location.pathname;
  const currentLinkStyle: string = "text-blue font-bold";

  return (
    <div className="pt-8">
      <ul className="flex gap-4 text-white">
        <li>
          <Link
            to={pathsObj.home}
            className={
              currentPathName === pathsObj.home ? currentLinkStyle : ""
            }
          >
            HOME
          </Link>
        </li>
        <li>
          <Link
            to={pathsObj.register}
            className={
              currentPathName === pathsObj.register ? currentLinkStyle : ""
            }
          >
            メンバー登録
          </Link>
        </li>
        <li>
          <Link
            to={pathsObj.shuffle}
            className={
              currentPathName === pathsObj.shuffle ? currentLinkStyle : ""
            }
          >
            シャッフル
          </Link>
        </li>
      </ul>
    </div>
  );
};
