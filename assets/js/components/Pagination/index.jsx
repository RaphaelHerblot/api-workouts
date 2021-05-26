import React from 'react';

import './style.scss';

const Pagination = ({ currentPage, itemsPerPage, length, onPageChanged }) => {
    const pagesCount = Math.ceil(length / itemsPerPage);
    const pages = [];

    // Pushing the number of pages in a array to map around it in the render section
    for(let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    return ( 
        <ul className="pagination pagination-sm">
            <li className={"page-item" + (currentPage === 1 && " disabled")}>
                <button className="page-link arrow-left" onClick={() => onPageChanged(currentPage-1)}>
                    <img src={require("/assets/images/icons/arrow-right.svg")} />
                </button>
            </li>
            {pages.map(page =>                
                <li key={page} className={"page-item" + (currentPage === page && " active")}>
                    <button className="page-link" onClick={() => onPageChanged(page)}>
                        {page}
                    </button>
                </li>
            )}
            <li className={"page-item" + (currentPage === pagesCount && " disabled")}>
                <button className="page-link arrow-right"  onClick={() => onPageChanged(currentPage+1)}>
                    <img src={require("/assets/images/icons/arrow-left.svg")} />
                </button>
            </li>
        </ul>
    );
}

Pagination.getData = (items, currentPage, itemsPerPage) => {
    const start = currentPage * itemsPerPage - itemsPerPage; 
    return items.slice(start, start + itemsPerPage)
}
 
export default Pagination;