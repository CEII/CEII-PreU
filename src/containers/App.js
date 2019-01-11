import React, { Component } from 'react';
import './App.css';
import Header from "./Header/Header";
import Cursos from "./Cursos/Cursos";

class App extends Component {
  render() {
    return (
      <>
        <Header/>
        <Cursos/>
      </>
    );
  }
}

export default App;
