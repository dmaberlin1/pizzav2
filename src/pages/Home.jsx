import React, {useEffect, useState} from 'react';
import Categories from "../components/categories/Categories";
import Sort from "../components/sort/Sort";
import PizzaSkeleton from "../components/pizzaBlock/PizzaSkeleton";
import PizzaBlock from "../components/pizzaBlock/PizzaBlock";

const Home = () => {

    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [sortType, setSortType] = useState({
        name:'популярности',sortProperty:'title'
    });
    const [categoryActiveIndex, setCategoryActiveIndex] = useState(0);
    ;



    useEffect(() => {
        setIsLoading(true)
        fetch(`https://63e3cb3cc919fe386c0f157c.mockapi.io/items?${
            categoryActiveIndex>0 
          ? `category=${categoryActiveIndex}`:''
        }&sortBy`)
        // https://63e3cb3cc919fe386c0f157c.mockapi.io/items?sortBy=price&order=desc
          .then((res) => res.json())
          .then((arr) => {
              setItems(arr)
              setIsLoading(false)
          })
        window.scrollTo(0,0)
    }, [categoryActiveIndex,]);

    return (
      <div className={'container'}>
          <div className="content__top">
              <Categories
                activeIndex={categoryActiveIndex}
                HandlerCategory={(index)=>setCategoryActiveIndex(index)}
              ></Categories>
              <Sort
                sortType={sortType}
                HandlerSortType={(index)=>setSortType(index)}
              ></Sort>
          </div>

          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
              {
                  isLoading ? [...new Array(6)].map((_,index)=> <PizzaSkeleton key={index}></PizzaSkeleton>)
                    : items.map((item)=>(<PizzaBlock
                      key={item.id}
                      {...item}
                    ></PizzaBlock>))
              }
          </div>
      </div>
    );
};

export default Home;
