import { useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import About from "./components/About/About";
function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <NavBar />
      <About />
    </div>
  );
}

export default App;
