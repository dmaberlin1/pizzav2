import React from 'react';
import ReactPaginate from "react-paginate";
import styles from './Pagination.module.scss'
const Pagination = (props) => {
    const {onChangePage}=props
    return (
      <ReactPaginate
        className={styles.root}
        breakLabel="..."
        nextLabel="⇢"
        onPageChange={(event)=>onChangePage(event.selected+1)}
        pageRangeDisplayed={5}
        pageCount={2}
        previousLabel="⇠"
        renderOnZeroPageCount={null}
      />
    );
};

export default Pagination;
