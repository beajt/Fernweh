import "./App.css";
// components
import SignIn from "./Components/SignIn";
import Header from "./Components/Header";
import Main from "./Components/Main";

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
