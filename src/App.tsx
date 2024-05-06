import "./App.css";
import { RegisterForm } from "./components/register/RegisterForm";
import { Shuffle } from "./components/shuffle/Shuffle";

function App() {
  return (
    <>
      <h1>チームシャッフル</h1>
      <RegisterForm />
      <Shuffle />
    </>
  );
}

export default App;
