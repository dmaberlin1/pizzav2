import React, {useCallback, useRef, useState} from 'react';
import styles from './Search.module.scss'
import {SearchContext} from "../../App";
import debounce from 'lodash.debounce'
import {useDispatch} from "react-redux";
import {setSearchValue} from "../../redux/slices/filterSlice";



const Search = (props) => {
    const dispatch=useDispatch()
    const [value, setValue] = useState('');
    const inputRef = useRef(null);
    //реф - рефференс, ссылка,   мы взяли хук, назвали его и назначили в то место(элемент),где он будет ссылкой
    // конкретно сейчас я взял хук и сделал его ссылкой на инпут, добавил ref=inputRef в свой инпут,
    //тем самым вытащил ссылку на нужный мне дом элемент Input className={styles.input}
    //любой элемент имеет возможнсть на вытаскивание ссылки на дом элемет

    // const inputDebounce= useCallback(
    //   debounce(() => {
    //       console.log(1)
    //   },1000),
    //   [],
    // );

    const updateSearchValue=useCallback(
      debounce((str)=>{
          dispatch(setSearchValue(str))
      },300),[],
    )

    const onChangeInput=(event)=>{
        setValue(event.target.value)
        updateSearchValue(event.target.value)
    }

    const HandlerClear=()=>{
        dispatch(setSearchValue(''))
        setValue('');
        inputRef.current.focus()
    }

    return (
      <div className={styles.root}>

          <svg className={styles.icon} fill="none" height="24" stroke="currentColor"
               strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
               viewBox="0 0 24 24" width="24"
               xmlns="http://www.w3.org/2000/svg">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" x2="16.65" y1="21" y2="16.65"/>
          </svg>
          <input
            ref={inputRef}
            value={value}
            onChange={onChangeInput}
            className={styles.input}
            placeholder={'Поиск пиццы...'}/>

          {value.length > 0 ? (
            <svg onClick={HandlerClear} className={styles.clearIcon} viewBox="0 0 20 20"
                 xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"/>
            </svg>) : ''
          }
      </div>
    );
};
export default Search;
