import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";

export const Layout = () => {
  return (
    <div className="w-full flex flex-col items-center px-4 py-8">
      <h1 className="text-2xl font-bold text-white">チームシャッフル！</h1>

      {/* ナビゲーションメニュー */}
      <Navigation />

      <Outlet />
    </div>
  );
};
