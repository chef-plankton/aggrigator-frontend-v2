import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
function App() {console.log(process.env.REACT_APP_INFURA_KEY);

  return (
    <>
      <Header />
      <Main />
    </>
  );
}

export default App;
