import { Routes, Route } from "react-router-dom";
import { RegisterForm } from "./components/register/RegisterForm";
import { Shuffle } from "./components/shuffle/Shuffle";
import { Layout } from "./Layout";

export const Routing = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<RegisterForm />} />
          <Route path="/shuffle" element={<Shuffle />} />
        </Route>
      </Routes>
    </>
  );
};
