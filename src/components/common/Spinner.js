import React from 'react';
import 'font-awesome/css/font-awesome.min.css';

const Spinner = () => (
    <div className='center-page text-center'>
        <i className="fa fa-spinner spin-icon" />
        <div style={{paddingLeft: 10}}>Loading...</div>
    </div>
);

export default Spinner;