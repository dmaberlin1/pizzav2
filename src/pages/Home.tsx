import React, {useEffect, useRef, useState} from 'react';
import Categories from "../components/categories/Categories";
import Sort, {list} from "../components/sort/Sort";
import PizzaSkeleton from "../components/pizzaBlock/PizzaSkeleton";
import PizzaBlock from "../components/pizzaBlock/PizzaBlock";
import Pagination from "../components/pagination/Pagination";
import {SearchContext} from "../App";
import {useSelector, useDispatch} from "react-redux"
import {selectFilter, setCategoryActiveIndex, setCurrentPage, setFilters,} from "../redux/slices/filterSlice";

import axios from "axios";
import qs from "qs";
import {Link, useNavigate, useSearchParams} from "react-router-dom";
import {fetchPizzas, selectPizzasData} from "../redux/slices/pizzasSlice";
import cartEmpty from "../assets/img/empty-cart.png";




const Home = (props) => {
    const dispatch = useDispatch()
    const navigate=useNavigate()
    const isSearch=useRef(false)
    const isMounted = useRef(false);
    const {categoryActiveIndex,sortType,currentPage,searchValue}=useSelector(selectFilter)
    const {items,status}=useSelector(selectPizzasData)
    // const{categoryActiveIndex,sortType}=useSelector(state=>state.filter)



    // const [sortType, setSortType] = useState({
    //     name: 'популярности', sortProperty: 'title'
    // });
    // const [categoryActiveIndex, setCategoryActiveIndex] = useState(0);
    // const [currentPage, setCurrentPage] = useState(1);
    const HandlerCategoryIndex=(id)=>{
        dispatch(setCategoryActiveIndex(id))
    }

    const onChangePage=number=>{
        dispatch(setCurrentPage(number));
    }

    const getPizzas= async ()=>{

        const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
        const sortBy = sortType.sortProperty.replace('-', '')
        const category = categoryActiveIndex > 0 ? `category=${categoryActiveIndex}` : '';
        const search = searchValue ? `search=${searchValue}` : '';



        dispatch(
          fetchPizzas({
              sortBy,
              order,
              category,
              search,
              currentPage,
          })
        );
        window.scrollTo(0, 0)

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



    //если был первый рендер то запрашиваем пиццы
    useEffect(() => {
        window.scrollTo(0, 0);

        if(!isSearch.current){
            getPizzas()
        }
        isSearch.current=false

    }, [categoryActiveIndex, sortType.sortProperty, searchValue, currentPage]);


    
    
    



    // const pizzas = items
    //   .filter((item) => {
    //       return item.title.toLowerCase().includes(searchValue.toLowerCase());
    //       //     сократили if else одной строкой
    //       //return item.title.toLowerCase().includes(searchValue);
    //       //если верно- вернёт тру, если нет- фолс
    //   })
    //   .map((item) => (<PizzaBlock
    //     key={item.id}
    //     {...item}
    //   ></PizzaBlock>))


    const pizzas=items.map((obj)=>(
      <Link key={obj.id} to={`/pizza/${obj.id}`}>
          <PizzaBlock  {...obj}></PizzaBlock>
      </Link>
    ))


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
          {
              status==='error'?
                <div className={'content__error-info'}>    <h2>Произошла ошибка <icon>😕</icon></h2>
                  <p>
                      Вероятней всего, ошибка на сервере.<br/>
                      Для того, чтобы заказать пиццу, перейди на главную страницу.
                  </p>
                  <img src={cartEmpty} alt="Empty cart"/>
                  <Link to="/" className="button button--black"/>
                  <span>Вернуться назад</span></div>:''
          }
          <div className="content__items">
              {
                  status==='loading'
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


// fetch(`https://63e3cb3cc919fe386c0f157c.mockapi.io/items?page=${currentPage}&limit=5&${category}&sortBy=${sortBy}&order=${order}${search}`)
//   // https://63e3cb3cc919fe386c0f157c.mockapi.io/items?sortBy=price&order=desc
//   .then((res) => res.json())
//   .then((arr) => {
//       setItems(arr)
//       setIsLoading(false)
//   })

// await axios.get(`https://63e3cb3cc919fe386c0f157c.mockapi.io/items?page=
// ${currentPage}&limit=5&${category}&sortBy=${sortBy}&order=${order}${search}`)
//   .then(res=>{
//       setItems(res.data)
//       setIsLoading(false)
//   })



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

// window.scrollTo(0, 0)