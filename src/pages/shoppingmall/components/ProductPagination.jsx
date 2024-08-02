import React from 'react';
import { Button } from '@mui/material';

// 상품페이지 페이지네이션
const ProductPagination = ({ currentCardPage, totalPages, handleCardPageChange, styled }) => {
  const renderPageNumbers = () => {
    const pageNumbers = [];
    let startPage = Math.max(currentCardPage - 2, 1);
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
      <Button onClick={() => handleCardPageChange(currentCardPage - 1)} disabled={currentCardPage === 1}>{"<"}
      </Button>
      {renderPageNumbers().map((number) => (
        <Button
        key={number}
        onClick={() => handleCardPageChange(number)}
        style={{ fontweight: currentCardPage === number ? 'bold' : 'normal'}}>
          {number}
        </Button>
      ))}
      <Button onClick={() => handleCardPageChange(currentCardPage + 1)} disabled={currentCardPage === totalPages}>{">"}
      </Button>
    </div>
  );
};

export default ProductPagination;