import React from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";

const FullPizza:React.FC = () => {
    const [pizza,setPizza]=React.useState<{
        imageUrl:string;
        title:string;
        price:number;
    }>()
    const params=useParams()
    const navigate=useNavigate()

    React.useEffect(()=>{
        async function fetchPizza(){
            try{
                const {data}=await axios.get("https://63e3cb3cc919fe386c0f157c.mockapi.io/items"+params.id);
                setPizza(data)
            }catch (e){
            alert('ошибка при получении пиццы')
                navigate('/')
            }
        }
    },[])

    if(!pizza){
        return <>Загрузка ...</>
    }

    return (
      <div className={'container'}>
          <img src={pizza.imageUrl} alt="pizza"/>
          <h2>{pizza.title}</h2>
          <h4>{pizza.price}₴</h4>
      </div>
    );
};

export default FullPizza;
