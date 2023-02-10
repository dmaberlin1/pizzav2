import React, {useEffect, useState} from 'react';
import Categories from "../components/categories/Categories";
import Sort from "../components/sort/Sort";
import PizzaSkeleton from "../components/pizzaBlock/PizzaSkeleton";
import PizzaBlock from "../components/pizzaBlock/PizzaBlock";
import Pagination from "../components/pagination/Pagination";
import {SearchContext} from "../App";
import {useSelector, useDispatch} from "react-redux"
import {setCategoryActiveIndex,setSortType} from "../redux/slices/filterSlice";

const Home = (props) => {
    const categoryActiveIndex = useSelector(state => state.filter.categoryActiveIndex)
    const sortType=useSelector(state=>state.filter.sortType)
    const dispatch = useDispatch()


    const {searchValue} = React.useContext(SearchContext)
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    // const [sortType, setSortType] = useState({
    //     name: 'популярности', sortProperty: 'title'
    // });
    // const [categoryActiveIndex, setCategoryActiveIndex] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const HandlerCategoryIndex=(id)=>{
        dispatch(setCategoryActiveIndex(id))
    }

    useEffect(() => {
        setIsLoading(true)

        const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
        const sortBy = sortType.sortProperty.replace('-', '')
        const category = categoryActiveIndex > 0 ? `category=${categoryActiveIndex}` : '';
        const search = searchValue ? `search=${searchValue}` : '';


        fetch(`https://63e3cb3cc919fe386c0f157c.mockapi.io/items?page=${currentPage}&limit=5&${category}&sortBy=${sortBy}&order=${order}${search}`)
          // https://63e3cb3cc919fe386c0f157c.mockapi.io/items?sortBy=price&order=desc
          .then((res) => res.json())
          .then((arr) => {
              setItems(arr)
              setIsLoading(false)
          })
        window.scrollTo(0, 0)
    }, [categoryActiveIndex, sortType, searchValue, currentPage]);

    // const pizzas = items
    //   .filter((item) => {
    //       return item.title.toLowerCase().includes(searchValue.toLowerCase());
    //   //     сократили if else одной строкой
    //       //return item.title.toLowerCase().includes(searchValue);
    //       //если верно- вернёт тру, если нет- фолс
    //   })
    //   .map((item) => (<PizzaBlock
    //     key={item.id}
    //     {...item}
    //   ></PizzaBlock>))


    const pizzas = items
      .filter((item) => {
          return item.title.toLowerCase().includes(searchValue.toLowerCase());
          //     сократили if else одной строкой
          //return item.title.toLowerCase().includes(searchValue);
          //если верно- вернёт тру, если нет- фолс
      })
      .map((item) => (<PizzaBlock
        key={item.id}
        {...item}
      ></PizzaBlock>))


    const skeletons = [...new Array(6)].map((_, index) =>
      <PizzaSkeleton key={index}></PizzaSkeleton>)

    return (
      <div className={'container'}>
          <div className="content__top">
              <Categories
                activeIndex={categoryActiveIndex}
                HandlerCategory={(index) => HandlerCategoryIndex(index)}
              ></Categories>
              <Sort></Sort>
          </div>

          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
              {
                  isLoading
                    ? skeletons
                    : pizzas
              }
          </div>
          <Pagination onChangePage={(number) => setCurrentPage(number)}
          ></Pagination>
      </div>

    );
};

export default Home;
