// @flow
import React, { useState } from 'react';
import Collapse from 'react-bootstrap/Collapse';
import Button from 'react-bootstrap/Button';

export const Left = React.Fragment, Middle = React.Fragment, Right = React.Fragment; // just for readability

type Props = {
    title?: string,
    opened?: boolean,
    rows?: number,
    cols?: number,
    children: React.Node // [left?, middle, right?]
}

const Section = (props: Props) => {
    const {title, opened = true, rows = 1, cols = 2} = props;
    const [open, setOpen] = useState(opened);

    const sectionRows: Array<{left?: any, middle: any, right?: any}> = [];

    if (rows === 1) {
        if (props.children.length > 3) {
            console.log(`--- You should specify number of rows for ${String(title)} section`);
        }

        let left, middle, right;
        const childrenLength = props.children.length;
        if (!childrenLength || childrenLength === 1) {
            middle = props.children;
        } else if (childrenLength === 2) {
            [
                left,
                middle
            ] = props.children;
        } else if (childrenLength === 3) {
            [
                left,
                middle,
                right
            ] = props.children;
        }
        sectionRows[0] = {left, middle, right};
    } else {
        let elements = [...props.children];

        if (rows >= 2 && elements.length > 1) {
            let left, middle, right;
            if (elements.length === 2) {
                for (let i = 0; elements.length !== 0; i++) {
                    [ middle ] = elements;
                    sectionRows[i] = {middle};
                    elements = elements.splice(1);
                }
            } else if (cols === 2 && elements.length >= 4) {
                for (let i = 0; elements.length !== 0; i++) {
                    [ left, middle ] = elements;
                    sectionRows[i] = {left, middle};
                    elements = elements.splice(2);
                }
            } else if (cols === 3 && elements.length >= 6) {
                for (let i = 0; elements.length !== 0; i++) {
                    [ left, middle, right ] = elements;
                    sectionRows[i] = {left, middle, right};
                    elements = elements.splice(3);
                }
            }
        }
    }
    return (
        <>
            {title &&
            <div className='flex-container'>
                <div className='flex-left-column' />
                <div className='flex-middle-column'>
                    <Button
                        block
                        variant='outline-secondary'
                        size='sm'
                        aria-controls='collapse-text'
                        aria-expanded={open}
                        className='section-title'
                        onClick={() => setOpen(!open)}
                    >
                        <i className={`section-title-icon fas fa-angle-${open ? 'down' : 'right'} fa-lg`} />
                        {title.toUpperCase()}
                    </Button>
                </div>
                <div className='flex-right-column' />
            </div>
            }

            <Collapse in={open}>
                <div>
                    {sectionRows.map((row, index) => (
                        <div key={index} className='flex-container'>
                            <div className='flex-left-column'>
                                {row.left}
                            </div>
                            <div className='flex-middle-column'>
                                {row.middle}
                            </div>
                            <div className='flex-right-column'>
                                {row.right}
                            </div>
                        </div>
                    ))}
                </div>
            </Collapse>
        </>
    )
};

export default Section;