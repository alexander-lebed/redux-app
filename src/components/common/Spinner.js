// @flow
import React from 'react';
import { connect } from 'react-redux';
import type { Translation } from '../../types';
import 'font-awesome/css/font-awesome.min.css';

type Props = {
    translation: Translation
}

const Spinner = (props: Props) => (
    <div className='center-page text-center'>
        <i className="fa fa-spinner spin-icon" />
        <div style={{paddingLeft: 10}}>{props.translation.COMMON.LOADING}</div>
    </div>
);

export default connect(
    state => ({
        translation: state.translation
    }),
    { }
)(Spinner);