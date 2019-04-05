// @flow
import React from 'react';
import BSpinner from 'react-bootstrap/Spinner';

const Spinner = () => (
    <div className='centered'>
        <BSpinner animation='border' variant='dark'>
            <span className="sr-only">Loading...</span>
        </BSpinner>
    </div>
);

export default Spinner;