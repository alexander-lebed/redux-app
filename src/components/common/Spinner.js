import React from 'react';
import { Glyphicon } from 'react-bootstrap';

const Spinner = () => (
    <div className='center-page text-center'>
        <Glyphicon glyph="cog" className='glyphicon-spin' />
        <div>loading...</div>
    </div>
);

export default Spinner;