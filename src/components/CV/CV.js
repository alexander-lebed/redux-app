// @flow
import React from 'react';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import BasicInfo from './BasicInfo';
import ListItem from './ListItem';
import Section from './Section';
import Skill from './Skill';
import Experience from './Experience';
import type {Translation} from '../../types';


type Props = {
    translation: Translation,
}

class CV extends React.Component<Props, void>{

    render() {
        return (
            <Container fluid id='cv' className='cv-container'>
                <Row>
                    <Col md={{span: 8, offset: 2}} className='paper'>
                        {
                            this.renderBasicInfo()
                        }
                        {
                            this.renderContacts()
                        }
                        {
                            this.renderSkills()
                        }
                        {
                            this.renderExperience()
                        }
                    </Col>
                </Row>
            </Container>
        );
    }

    renderBasicInfo = () => <BasicInfo/>;
    renderExperience = () => <Experience />;

    renderContacts = () => {
        return (
            <Section title={this.props.translation.CV.CONTACTS} opened={false}>
                <ListGroup variant='flush'>
                    <ListItem
                        title='+38 096 926 9048'
                        faIcon='fas fa-mobile-alt'
                    />
                    <ListItem
                        title='lebed.alexander90@gmail.com'
                        faIcon='fas fa-at'
                        url='mailto:lebed.alexander90@gmail.com'
                    />
                    <ListItem
                        title='alexander1234'
                        faIcon='fab fa-linkedin'
                        url='https://www.linkedin.com/in/alexander1234/'
                    />
                    <ListItem
                        title='alexander-lebed'
                        faIcon='fab fa-skype'
                        url='skype:alexander-lebed?chat'
                    />
                    <ListItem
                        title='alexander-lebed'
                        faIcon='fab fa-github'
                        url='https://github.com/alexander-lebed'
                    />
                </ListGroup>
            </Section>
        )
    };

    renderSkills = () => {
        return (
            <Section title={this.props.translation.CV.SKILLS}>
                <div className='skills-container'>
                    <Skill title='JavaScript' />
                    <Skill title='HTML5' />
                    <Skill title='CSS3' />

                    <Skill title='React' />
                    <Skill title='Flow' />
                    <Skill title='Redux' />
                    <Skill title='Angular' />
                    <Skill title='TypeScript' />
                    <Skill title='SASS' />
                    <Skill title='Bootstrap' />

                    <Skill title='NodeJS' />
                    <Skill title='Webpack' />
                    <Skill title='Babel' />
                    <Skill title='MongoDB' />

                    <Skill title='Java' />
                    <Skill title='SQL' />
                    <Skill title='PostgreSQL' />

                    <Skill title='Git' />
                    <Skill title='Mercurial' />
                    <Skill title='Intellij' />
                </div>
            </Section>
        )
    };
}

export default connect(
    (state) => ({
        translation: state.translation
    })
)(CV);