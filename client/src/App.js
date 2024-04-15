//App.js
import React from "react";
import { Route, Routes } from "react-router-dom";
import RecordList from "./components/recordList";
import Edit from "./components/edit";
import Create from "./components/create";
import SingIn from './googleSignIn/signIn'
import Signup from './googleSignIn/Signup'
import Carlos from "../pages/Carlos";

const App = () => {


  return (
    <div>
     
      <Routes>       
      <Route path="/" element={<SingIn />} />      
        <Route path="/recordList" element={<RecordList />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/create" element={<Create />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/carlos" component={Carlos} />
      </Routes>
    </div>
  );
};

export default App;
