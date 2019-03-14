// @flow
import React from 'react';
import { DotLoader } from 'react-spinners';
import { MAIN_COLOR } from '../../constants';

const Spinner = () => (
    <div className='center-vertical-horizontal'>
        <DotLoader color={MAIN_COLOR} />
    </div>
);

export default Spinner;