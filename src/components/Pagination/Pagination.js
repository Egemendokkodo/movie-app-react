import React from 'react';
import './Pagination.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    
    const pageNumbers = () => {
        const pages = [];
        const startPage = Math.max(0, currentPage - 2); // Önceki 2 sayfa
        const endPage = Math.min(totalPages - 1, startPage + 4); // Sonraki 2 sayfa

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
        return pages;
    };

    return (
        <div className='pagination'>
            <button 
                onClick={() => onPageChange(Math.max(0, currentPage - 1))} 
                style={{ display: currentPage === 0 ? 'none' : 'inline-block' }} // 1. sayfada görünmez
            >
                Previous
            </button>

            {pageNumbers().map((page) => (
                <button 
                    key={page} 
                    onClick={() => onPageChange(page)} 
                    className={currentPage === page ? 'active' : ''}
                >
                    {page + 1}
                </button>
            ))}

            <button 
                onClick={() => onPageChange(Math.min(totalPages - 1, currentPage + 1))} 
                disabled={currentPage >= totalPages - 1}
            >
                Next
            </button>

            {/* Eğer son sayfadaysak, "İlk Sayfa" butonunu göster */}
            {currentPage === totalPages - 1 ? (
                <button 
                    onClick={() => onPageChange(0)} // İlk sayfaya git
                >
                    First Page
                </button>
            ) : (
                <button 
                    onClick={() => onPageChange(totalPages - 1)} // Son sayfaya git
                >
                  Last Page
                </button>
            )}
        </div>
    );
};

export default Pagination;
