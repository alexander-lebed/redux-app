// @flow
import React from 'react';
import { connect } from 'react-redux';
import Section, { Left, Middle } from './Section';
import Badge from 'react-bootstrap/Badge';


export default connect(
    (state) => ({
        translation: state.translation
    })
)((props: Props) => {
    const TECH = (props: {children: React.Node}) => (
        <Badge
            variant='success'
            className='stack-item'
        >
            {props.children}
        </Badge>
    );
    const renderStack = (technologies: Array<string>) => {
        return (
            <>
                {technologies.map(e => (
                    <TECH key={e}>{e}</TECH>
                ))}
            </>
        )
    };
    return (
        <Section title={props.translation.CV.EXPERIENCE} rows={4} cols={2}>
            <Left>
                <div className='timeline-container'>
                    <div className='timeline'>
                        <div className='duration-container'>
                            <div className='duration-end'>Now</div>
                            <div className='duration-start'>9/2017</div>
                        </div>
                    </div>
                </div>
            </Left>
            <Middle>
                <div className='mobile-text font-weight-bold'>
                    Frontend developer at
                    {' '}
                    <a href='https://ab-soft.net/' target='_blank' rel='noopener noreferrer'>AB Soft</a>
                </div>
                <div className='mobile-text'>
                    Built and maintained a template manager for email, SMS, Glip notifications. Completely redesigned an
                    application to use common React components.
                </div>
                <div>
                    <div className='tech-font'>STACK:</div>
                    {renderStack([
                        'JavaScript', 'React', 'Redux', 'Flow', 'Bootstrap', 'Handlebars',
                        'ESLint', 'Lodash', 'Git', 'Mercurial',
                    ])}
                </div>
            </Middle>

            <Left>
                <div className='timeline-container'>
                    <div className='timeline'>
                        <div className='duration-container'>
                            <div className='duration-end'>9/2017</div>
                            <div className='duration-start'>1/2016</div>
                        </div>
                    </div>
                </div>
            </Left>
            <Middle>
                <div className='font-weight-bold'>
                    Full-stack developer at
                    {' '}
                    <a href='https://ukraine.intersog.com/' target='_blank' rel='noopener noreferrer'>Intersog</a>
                </div>
                <div><a href='https://www.home.neustar/resources/videos/platformone-marketing-technology-video' target='_blank' rel='noopener noreferrer'>Neustar PlatformOne</a> (personalized marketing solutions).
                    Mostly I worked on UI features and web services.</div>
                <div>
                    <div className='tech-font'>STACK:</div>
                    {renderStack([
                        'Java', 'PostgreSQL', 'Angular 1.x', 'React', 'Flow', 'Redux', 'Jest', 'Lodash', 'Immutable.js',
                        'Bootstrap', 'Git'
                    ])}
                </div>
            </Middle>

            <Left>
                <div className='timeline-container'>
                    <div className='timeline'>
                        <div className='duration-container'>
                            <div className='duration-end'>1/2016</div>
                            <div className='duration-start'>7/2014</div>
                        </div>
                    </div>
                </div>
            </Left>
            <Middle>
                <div className='mobile-text font-weight-bold'>
                    Java developer at
                    {' '}
                    <a href='https://www.lohika.com.ua/' target='_blank' rel='noopener noreferrer'>Lohika</a>
                </div>
                <div className='mobile-text'>
                    HP SiteScope (agentless monitoring software). I improved the functionality of some monitors and solved many
                    customer issues. Interacted directly with customer.
                </div>
                <div>
                    <div className='tech-font'>STACK:</div>
                    {renderStack([
                        'Java', 'REST', 'JUnit', 'JConsole', 'SVN'
                    ])}
                </div>
            </Middle>

            <Left>
                <div className='timeline-container'>
                    <div className='timeline'>
                        <div className='duration-container'>
                            <div className='duration-end'>7/2014</div>
                            <div className='duration-start'>7/2013</div>
                        </div>
                    </div>
                </div>
            </Left>
            <Middle>
                <div className='mobile-text font-weight-bold'>
                    Java developer at Ampyx
                </div>
                <div className='mobile-text'>
                    Participated in development of Electronic Payment Solutions and have developed the following:
                    <ul style={{margin: 0}}>
                        <li>web simulator of credit card Terminal and Cash Register machine which are communicated via Payment Management System (PMS).</li>
                        <li>ability to view the Terminals on the world map and it’s communication with PMS in real time.</li>
                    </ul>
                </div>
                <div>
                    <div className='tech-font'>STACK:</div>
                    {renderStack([
                        'Java', 'PostgreSQL', 'Spring MVC', 'Hibernate', 'JMX', 'HTML', 'JavaScript',
                        'jQuery', 'Google Maps API v3', 'Bootstrap', 'SVN',
                    ])}
                </div>
            </Middle>
        </Section>
    )
});