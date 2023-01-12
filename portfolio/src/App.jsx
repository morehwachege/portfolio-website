import { useState } from "react";
import "./App.css";
import Footer from "./components/Footer";
import Hero from "./components/Hero/Hero";
import NavBar from "./components/NavBar";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <NavBar />
      <Hero />
      {/* <Footer /> */}
    </div>
  );
}

export default App;
