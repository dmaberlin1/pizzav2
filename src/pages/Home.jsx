import React, {useEffect, useRef, useState} from 'react';
import Categories from "../components/categories/Categories";
import Sort, {list} from "../components/sort/Sort";
import PizzaSkeleton from "../components/pizzaBlock/PizzaSkeleton";
import PizzaBlock from "../components/pizzaBlock/PizzaBlock";
import Pagination from "../components/pagination/Pagination";
import {SearchContext} from "../App";
import {useSelector, useDispatch} from "react-redux"
import {setCategoryActiveIndex, setCurrentPage, setFilters,} from "../redux/slices/filterSlice";

import axios from "axios";
import qs from "qs";
import {useNavigate, useSearchParams} from "react-router-dom";

const Home = (props) => {
    const navigate=useNavigate()
    const isSearch=useRef(false)
    const isMounted = useRef(false);
    const categoryActiveIndex = useSelector(state => state.filter.categoryActiveIndex)
    const sortType=useSelector(state=>state.filter.sortType)
    const currentPage=useSelector(state=>state.filter.currentPage)
    // const{categoryActiveIndex,sortType}=useSelector(state=>state.filter)
    const dispatch = useDispatch()


    const {searchValue} = React.useContext(SearchContext)
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    // const [sortType, setSortType] = useState({
    //     name: 'популярности', sortProperty: 'title'
    // });
    // const [categoryActiveIndex, setCategoryActiveIndex] = useState(0);
    // const [currentPage, setCurrentPage] = useState(1);
    const HandlerCategoryIndex=(id)=>{
        dispatch(setCategoryActiveIndex(id))
    }


    const fetchPizzas=()=>{
        setIsLoading(true)

        const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
        const sortBy = sortType.sortProperty.replace('-', '')
        const category = categoryActiveIndex > 0 ? `category=${categoryActiveIndex}` : '';
        const search = searchValue ? `search=${searchValue}` : '';

        // fetch(`https://63e3cb3cc919fe386c0f157c.mockapi.io/items?page=${currentPage}&limit=5&${category}&sortBy=${sortBy}&order=${order}${search}`)
        //   // https://63e3cb3cc919fe386c0f157c.mockapi.io/items?sortBy=price&order=desc
        //   .then((res) => res.json())
        //   .then((arr) => {
        //       setItems(arr)
        //       setIsLoading(false)
        //   })
        axios.get(`https://63e3cb3cc919fe386c0f157c.mockapi.io/items?page=
        ${currentPage}&limit=5&${category}&sortBy=${sortBy}&order=${order}${search}`)
          .then(res=>{
              setItems(res.data)
              setIsLoading(false)
          })
        // window.scrollTo(0, 0)
    }
    useEffect(() => {
        //isMounted  ближе к лайвхаку,  нежели к  костылю
        //проверим если был второй рендер то уже вшиваем в строчку параметры, если параметры изменились
        if(isMounted.current){
            const queryString=qs.stringify({
                sortProperty:sortType.sortProperty,
                categoryActiveIndex:categoryActiveIndex,
                currentPage:currentPage,
            })
            navigate(`?${queryString}`)
        }
        isMounted.current=true;
    }, [categoryActiveIndex, sortType.sortProperty, currentPage]);

    //    If first render true, если был первый рендер, проверяем url параметры и сохраняем в редакс
    useEffect(() => {
        if(window.location.search){
            const params=qs.parse(window.location.search.substring(1))

            const sort=list.find(obj=>obj.sortProperty===params.sortProperty);

            dispatch(
              setFilters({
                  ...params,
                  sort,
              })
            )
            isSearch.current=true

        }
    }, []);



    useEffect(() => {
        window.scrollTo(0, 0);

        if(!isSearch.current){
            fetchPizzas()
        }
        isSearch.current=false

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


    const onChangePage=number=>{
        dispatch(setCurrentPage(number));
    }

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
          <Pagination currentPage={currentPage} onChangePage={onChangePage}
          ></Pagination>
      </div>

    );
};

export default Home;
