import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";

export const Layout = () => {
  return (
    <div>
      <h1>チームシャッフル！</h1>

      {/* ナビゲーションメニュー */}
      <Navigation />

      <Outlet />
    </div>
  );
};
