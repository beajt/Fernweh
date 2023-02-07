import "./App.css";
// components
import Header from "./Components/Header";
import Main from "./Components/Main";
import SignIn from "./Components/SignIn";

function App() {
  return (
    <div className="background">
      <SignIn />
      <div className="box1">
        <Header />
        <Main />
      </div>
    </div>
  );
}

export default App;
