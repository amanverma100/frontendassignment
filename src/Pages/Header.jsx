import React, { useState, useEffect, useRef } from 'react';
import './Header.css';
import { ReactComponent as Display } from '../assets/Display.svg';
import { ReactComponent as Down} from '../assets/down.svg';

const Header = ({ group, order, onGroupChange, onOrderChange }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsDropdownOpen(prevState => !prevState);

  const clickOutsideHandler = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  const selectChangeHandler = (callback) => (event) => {
    callback(event.target.value);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', clickOutsideHandler);
    return () => {
      document.removeEventListener('mousedown', clickOutsideHandler);
    };
  }, []);

  return (
    <div className="header">
      <div className="drop-container">
        <button className="drop-toggle" onClick={toggleDropdown}>
          <Display className="icon" />
          Display
          <Down className="icon" />
        </button>
        {isDropdownOpen && (
          <div className="drop-menu" ref={dropdownRef}>
            <div className="drop-item">
              <span>Grouping</span>
              <select 
                value={group} 
                onChange={selectChangeHandler(onGroupChange)}
              >
                <option value="status">Status</option>
                <option value="user">User</option>
                <option value="priority">Priority</option>
              </select>
            </div>
            <div className="drop-item">
              <span>Ordering</span>
              <select 
                value={order} 
                onChange={selectChangeHandler(onOrderChange)}
              >
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;