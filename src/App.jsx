import React from "react";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";

const App = () => {
  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <Home />
      </main>
      <Footer />
    </div>
  );
};

export default App;
