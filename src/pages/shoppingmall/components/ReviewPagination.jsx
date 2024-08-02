import React from 'react';
import { Button } from '@mui/material';

// 후기글 페이지네이션
const ReviewPagination = ({ currentPage, totalPages, handlePageChange, styled}) => {
  const renderPageNumbers = () => {
    const pageNumbers = [];
    let startPage = Math.max(currentPage - 2, 1);
    let endPage = Math.min(startPage + 4, totalPages);

    if (endPage - startPage < 4)  {
      startPage = Math.max(endPage - 4, 1);
    }

    for (let i = startPage; i <= endPage; i++)  {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  return (
    <div className={styled.pagination}>
      <Button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>{"<"}
      </Button>
      {renderPageNumbers().map((number) => (
        <Button
        key={number}
        onClick={() => handlePageChange(number)}
        style={{ fontweight: currentPage === number ? 'bold' : 'normal'}}>
          {number}
        </Button>
      ))}
      <Button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>{">"}
      </Button>
    </div>
  );
};

export default ReviewPagination;