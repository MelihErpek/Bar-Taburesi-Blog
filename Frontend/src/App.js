import React, { useState, useEffect } from "react";
import Header from './Components/PartialPages/Header'
import Footer from './Components/PartialPages/Footer'
import Home from './Components/Pages/Home'
import Profil from './Components/Pages/Profil'
import Yazı from './Components/Pages/Yazi'
import YazarEkle from './Components/Pages/YazarEkle'
import YaziEkle from './Components/Pages/YaziEkle'
import Kategoriler from './Components/Pages/Kategoriler'
import EntelDantel from './Components/Pages/EntelDantel'
import SoyunmaOdası from './Components/Pages/SoyunmaOdası'
import AdminGiris from './Components/Pages/AdminGiris'
import AdminContext from "./Context/AdminContext";
import './App.css';
import Axios from 'axios'


import {
  BrowserRouter as Router,
  Switch,
  Route

} from "react-router-dom";

function App() {
  const [adminData, setAdminData] = useState({
    user: undefined,
  });

  useEffect(() => {
    const login = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === '') {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      else if (token === '60ae832e8d9f614a0443dc87') {
        const auth = await Axios.get("https://meliherpek-backend.herokuapp.com/Auth");
        setAdminData({
          user:auth
        })
      }
    }
    login();
  },[])
  return (
    <Router>
      <AdminContext.Provider value={{ adminData, setAdminData }}>
        <div>
          <Header />
          <div className="App" >
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/Yazar/:Ad" component={Profil} />
              <Route path="/Yazı/:Baslik" component={Yazı} />
              <Route path="/admin" component={AdminGiris} />
              <Route path="/YazarEkle" component={YazarEkle} />
              <Route path="/YazıEkle" component={YaziEkle} />
              <Route path="/tozlu raflar" component={Kategoriler} />
              <Route path="/entel dantel" component={EntelDantel} />
              <Route path="/soyunma odası" component={SoyunmaOdası} />
            </Switch>
          </div>
          <Footer />
        </div>
      </AdminContext.Provider>
    </Router>
  );
}

export default App;



