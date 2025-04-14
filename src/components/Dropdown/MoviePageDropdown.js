

import { FaChevronDown, FaChevronUp, FaSearch } from 'react-icons/fa';
import '../Dropdown/MoviePageDropdown.css'

export const MoviePageDropdown = ({ icon: Icon = FaSearch, title = "Content", selectedText = "Movie" }) => {
    return (
        <div className='allDropdownRows'>
            <div className='dropdown'>
                <div className='dropdownOuterRow'>
                    <div className='dropdownColumn'>
                        <div className='dropdownRow'>
                            <Icon color='#a1a1aa' />
                            <p className='dropdownTitle'>{title}</p>
                        </div>
                        <p className='dropdownSelectedTextStyle'>{selectedText}</p>
                    </div>

                    <div className='chevronContainer'>
                        <FaChevronDown color='#a1a1aa' />
                    </div>
                </div>
            </div>
        </div>
    );
};