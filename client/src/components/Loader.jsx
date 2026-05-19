import React from 'react';
import './Loader.css';


const Loader = () => {
  return (
    <div className="loader" aria-hidden="true">
      <div className="loader__stack">
        <div className="loader__layer loader__layer--top-bun" />
        <div className="loader__layer loader__layer--lettuce" />
        <div className="loader__layer loader__layer--patty" />
        <div className="loader__layer loader__layer--bottom-bun" />
      </div>
    </div>
  );
};

export default Loader;
