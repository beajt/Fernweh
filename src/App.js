import "./App.css";
// components
import SignIn from "./Components/SignIn";
import Header from "./Components/Header";
import Main from "./Components/Main";
import Footer from "./Components/Footer";

function App() {
  return (
    <>
      <div className="background wrapper">
        <div>
          <SignIn />
          <div className="box1 scroll">
            <Header />
            <Main />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
