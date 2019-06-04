// @flow
import React from 'react';
import Image from "react-bootstrap/Image";

type Props = {
    title: string
}

export default (props: Props) => {
    const {title} = props;
    const imageSrc = `/images/skills/${title.toLowerCase()}.jpg`.replace(' ', '_');
    return (
        <div className='skill-item'>
            <div>
                <Image
                    className='skill-image'
                    src={imageSrc}
                />
            </div>
            <div className='skill-title'>{title}</div>
        </div>
    )
}