import React, { useState, useEffect, useRef } from 'react';
import { FaChevronDown, FaChevronUp, FaSpinner } from 'react-icons/fa';
import './MoviePageDropdown.css';

export const MoviePageDropdown = ({ 
    icon: Icon = null, 
    title = "Content", 
    selectedText = "All", 
    options = ["Option 1", "Option 2", "Option 3"],
    onSelect = () => {},
    isMultiSelect = false,
    maxSelect = 1,
    isLoading = false,
    isTagDropdown = false
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const dropdownRef = useRef(null);

    // Dropdown dışına tıklanınca kapanması için
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleDropdown = () => {
        setIsOpen(prev => !prev);
    };

    const handleSelect = (option) => {
        // Tag dropdown için özel işlem
        if (isTagDropdown) {
            if (option.tagId === -1) { // "All" seçeneği
                setSelectedOptions([]);
                onSelect("All");
                setIsOpen(false);
                return;
            }

            if (isMultiSelect) {
                let newSelectedOptions = [...selectedOptions];
                const optionIndex = newSelectedOptions.findIndex(item => item.tagId === option.tagId);
                
                if (optionIndex !== -1) {
                    // Seçili bir öğeyi kaldır
                    newSelectedOptions.splice(optionIndex, 1);
                } else {
                    // Max seçim kontrolü
                    if (newSelectedOptions.length >= maxSelect) {
                        // Maksimum seçim sayısına ulaşılmışsa, kullanıcıya bildir
                        alert(`En fazla ${maxSelect} tag seçebilirsiniz`);
                        return;
                    }
                    // Yeni seçimi ekle
                    newSelectedOptions.push(option);
                }
                
                setSelectedOptions(newSelectedOptions);
                onSelect(newSelectedOptions);
                
                if (newSelectedOptions.length === 0) {
                    onSelect("All");
                }
            } else {
                setSelectedOptions([option]);
                onSelect(option);
                setIsOpen(false);
            }
        } else {
            // Normal string options için işlem
            if (option === "All") {
                setSelectedOptions([]);
                onSelect("All");
                setIsOpen(false);
                return;
            }

            if (isMultiSelect) {
                let newSelectedOptions = [...selectedOptions];
                
                if (newSelectedOptions.includes(option)) {
                    // Seçili bir öğeyi kaldır
                    newSelectedOptions = newSelectedOptions.filter(item => item !== option);
                } else {
                    // Max seçim kontrolü
                    if (newSelectedOptions.length >= maxSelect) {
                        alert(`En fazla ${maxSelect} öğe seçebilirsiniz`);
                        return;
                    }
                    // Yeni seçimi ekle
                    newSelectedOptions.push(option);
                }
                
                setSelectedOptions(newSelectedOptions);
                onSelect(newSelectedOptions.length > 0 ? newSelectedOptions : "All");
            } else {
                setSelectedOptions([option]);
                onSelect(option);
                setIsOpen(false);
            }
        }
    };

    // Seçili option kontrolü
    const isSelected = (option) => {
        if (isTagDropdown) {
            return selectedOptions.some(item => item.tagId === option.tagId);
        }
        return selectedOptions.includes(option);
    };

    return (
        <div className='allDropdownRows' ref={dropdownRef}>
            <div className='dropdown' onClick={toggleDropdown}>
                <div className='dropdownOuterRow'>
                    <div className='dropdownColumn'>
                        <div className='dropdownRow'>
                            {Icon && <Icon color='#a1a1aa' />}
                            <p className='dropdownTitle'>{title}</p>
                        </div>
                        <p className='dropdownSelectedTextStyle'>
                            {selectedText}
                        </p>
                    </div>

                    <div className='chevronContainer'>
                        {isLoading ? (
                            <FaSpinner className="spinner" color='#a1a1aa' />
                        ) : isOpen ? (
                            <FaChevronUp color='#a1a1aa' />
                        ) : (
                            <FaChevronDown color='#a1a1aa' />
                        )}
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className='dropdownMenu'>
                    {isLoading ? (
                        <div className='dropdownMenuItem loading'>
                            <FaSpinner className="spinner" /> Yükleniyor...
                        </div>
                    ) : isTagDropdown ? (
                        options.map((option, index) => {
                            const isItemSelected = isSelected(option);
                            return (
                                <div 
                                    key={index} 
                                    className={`dropdownMenuItem ${isItemSelected ? 'selected' : ''}`}
                                    onClick={() => handleSelect(option)}
                                >
                                    {option.name}
                                </div>
                            );
                        })
                    ) : (
                        options.map((option, index) => {
                            const isItemSelected = isSelected(option);
                            return (
                                <div 
                                    key={index} 
                                    className={`dropdownMenuItem ${isItemSelected ? 'selected' : ''}`}
                                    onClick={() => handleSelect(option)}
                                >
                                    {option}
                                </div>
                            );
                        })
                    )}
                </div>
            )}
        </div>
    );
};