import React from 'react';
import Header from "../components/header/Header";
import {Outlet} from "react-router-dom";

const MainLayout = () => {
    return (
      <div className={'wrapper'}>
          <Header></Header>
          <div className="content">
              <Outlet/>
              {/*Outlet аналог children в компонентах, но для рендера роутов , нужен для больших вложенных роутов,*/}
          </div>
      </div>
    );
};

export default MainLayout;
