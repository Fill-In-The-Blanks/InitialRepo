import React from 'react';

const Pagination = ({ nPages, currentPage, setCurrentPage }) => {
  // holds all the page numbers from 1 to nPages
  const pageNumbers = [...Array(nPages + 1).keys()].slice(1);

  // moves to next page if current page isn't the last page
  const nextPage = () => {
    if (currentPage !== nPages) setCurrentPage(currentPage + 1);
  };
  // moves to the previous page if current page isn't in the first page
  const prevPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };
  return (
    <div className='center-text'>
      <ul className='pagination'>
        {/* button to move to previous page */}
        <li className=''>
          <a className='' onClick={prevPage} href='#'>
            Previous
          </a>
        </li>
        {/* render the pages as buttons */}
        {pageNumbers.map((pgNumber) => (
          <li
            key={pgNumber}
            className={` ${currentPage == pgNumber ? 'active' : ''} `}
          >
            <a onClick={() => setCurrentPage(pgNumber)} className='' href='#'>
              {pgNumber}
            </a>
          </li>
        ))}
        {/* button to move to next page */}
        <li className=''>
          <a className='' onClick={nextPage} href='#'>
            Next
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
