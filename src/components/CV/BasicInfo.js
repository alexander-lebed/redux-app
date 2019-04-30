// @flow
import React, { useState } from 'react';
import {connect} from 'react-redux';
import moment from 'moment/moment';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Section from './Section';
import type {Translation} from '../../types';

type Props = {
    translation: Translation,
}

export default connect(
    (state) => ({
        translation: state.translation
    })
)((props: Props) => {
    const { translation } = props;
    const [ageClicked, ageClick] = useState(false);
    const birthday = 648950400000; // 26 July 1990

    const goto = (url: string) => {
        const win = window.open(url, '_blank');
        win.focus();
    };

    const printCV = () => {
        const printContent = document.getElementById('cv').innerHTML;
        const originalContent = document.body.innerHTML;
        document.body.innerHTML = printContent;
        window.print();
        document.body.innerHTML = originalContent;
    };
    return (
        <Section>
            <>
                <Image
                    className='user-picture'
                    src='https://i.imgur.com/1Eo3q13.jpg'
                />
                <OverlayTrigger
                    placement='left'
                    trigger='hover'
                    overlay={
                        <Tooltip>Show birthday</Tooltip>
                    }
                >
                    <Button
                        block
                        variant='outline-secondary'
                        size='sm'
                        className='cv-btn'
                        onClick={() => ageClick(!ageClicked)}
                    >
                        {ageClicked ?
                            moment(birthday).format('D MMM YYYY') :
                            `${moment().diff(birthday, 'years')} years`
                        }
                    </Button>
                </OverlayTrigger>
                <OverlayTrigger
                    placement='left'
                    trigger='hover'
                    overlay={
                        <Tooltip>Show on map</Tooltip>
                    }
                >
                    <Button
                        block
                        variant='outline-secondary'
                        size='sm'
                        className='cv-btn mt-1'
                        onClick={() => goto('https://www.google.com.ua/maps/@46.4751149,30.7362336,14z')}
                    >
                        {translation.CV.ADDRESS}
                    </Button>
                </OverlayTrigger>
            </>

            <>
                <h1 className='cv-username text-center text-md-left'>{translation.CV.NAME}</h1>
                <h3 className='cv-title text-center text-md-left'>Web Developer</h3>
                <p className='mobile-text'>
                    Proactive, eye-for-details software developer with over five years of professional experience in coding.
                </p>
                <p className='mobile-text'>
                    Some story and goals go here. Some story and goals go here. Some story and goals go here. Some story and goals go here...
                    {/*Willing to relocate to Barcelona or Valencia to ...*/}
                </p>
            </>

            <>
                <Button
                    block
                    variant='outline-secondary'
                    size='sm'
                    className='cv-btn'
                    onClick={printCV}
                >
                    Print CV
                </Button>
            </>
        </Section>
    )
});