// @flow
import React, { useState } from 'react';
import { connect } from 'react-redux';
import moment from 'moment/moment';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Section, {Left, Middle, Right} from './Section';
import type {Translation} from '../../types';

type Props = {
    translation: Translation,
}

export default connect(
    (state) => ({
        translation: state.translation
    })
)((props: Props) => {
    const BASIC_INFO = props.translation.CV.BASIC_INFO;
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
            <Left>
                <Image
                    className='user-picture'
                    src='https://i.imgur.com/1Eo3q13.jpg'
                />
                <OverlayTrigger
                    placement='left'
                    trigger='hover'
                    overlay={
                        <Tooltip>{BASIC_INFO.SHOW_BIRTHDAY}</Tooltip>
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
                            `${moment().diff(birthday, 'years')} ${BASIC_INFO.YEARS}`
                        }
                    </Button>
                </OverlayTrigger>
                <OverlayTrigger
                    placement='left'
                    trigger='hover'
                    overlay={
                        <Tooltip>{BASIC_INFO.SHOW_ON_MAP}</Tooltip>
                    }
                >
                    <Button
                        block
                        variant='outline-secondary'
                        size='sm'
                        className='cv-btn mt-1'
                        onClick={() => goto('https://www.google.com.ua/maps/@46.4751149,30.7362336,14z')}
                    >
                        {BASIC_INFO.ADDRESS}
                    </Button>
                </OverlayTrigger>
            </Left>

            <Middle>
                <h1 className='cv-username text-center text-md-left'>{BASIC_INFO.NAME}</h1>
                <h3 className='cv-title text-center text-md-left'>{BASIC_INFO.POSITION}</h3>
                <p className='cv-about-me mobile-text'>
                    {BASIC_INFO.ABOUT_ME}
                </p>
                <div className='cv-about-me mobile-text'>
                    {BASIC_INFO.PERSONAL_SKILLS}
                </div>
            </Middle>

            <Right>
                <Button
                    block
                    variant='outline-secondary'
                    size='sm'
                    className='cv-btn'
                    onClick={printCV}
                >
                    {BASIC_INFO.PRINT}
                </Button>
            </Right>
        </Section>
    )
});