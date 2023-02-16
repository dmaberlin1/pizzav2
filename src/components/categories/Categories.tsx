import React, {useState} from 'react';

const Categories = (props) => {
 const {activeIndex,HandlerCategory}=props
    const categories = [
        'Все',
        'Мясные',
        'Вегетарианские',
        'Гриль',
        'Острые',
        'Закрытые',
    ]




    return (
      <div className="categories">
          <ul>
              {
                  categories.map((item,index)=>{
                      return (
                        <li key={index} onClick={()=>HandlerCategory(index)}
                            className={activeIndex===index? 'active':''}
                        >
                            {item}
                        </li>
                      )
                  })
              }

          </ul>
      </div>

    );
};

export default Categories;
