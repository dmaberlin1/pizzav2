import './scss/app.scss'
import Header from "./components/header/Header";
import Categories from "./components/categories/Categories";
import Sort from "./components/sort/Sort";
import PizzaBlock from "./components/pizzaBlock/PizzaBlock";
import pizzas from './assets/pizzas.json'
import {useEffect, useState} from "react";
import PizzaSkeleton from "./components/pizzaBlock/PizzaSkeleton";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import {Route, Routes} from "react-router-dom";
import Cart from "./pages/Cart";

function App() {


    return (
      <div className="wrapper">
          <Header></Header>
          <div className="content">
                <Routes>
                    <Route path={'/'} element={<Home/>}></Route>
                    <Route path={'/cart'} element={<Cart/>}></Route>
                    <Route path={'*'} element={<NotFound/>}></Route>

                </Routes>

          </div>
      </div>

    );
}

export default App;
