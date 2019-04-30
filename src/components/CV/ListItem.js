// @flow
import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

type Props = {
    title: string,
    faIcon: string,
    url?: string
}
export default (props: Props) => {
    const {faIcon, title, url} = props;
    const clickable = !!url;
    let click;
    if (clickable) {
        click = () => {
            const win = window.open(url, '_blank');
            win.focus();
        };
    }
    return (
        <ListGroup.Item
            action={clickable}
            className={`contact-item ${clickable ? 'contact-item-clickable' : ''}`}
            onClick={click}
        >
            <i className={`${faIcon} contact-item-icon fa-lg mr-2`} /> {title}
        </ListGroup.Item>
    )
};