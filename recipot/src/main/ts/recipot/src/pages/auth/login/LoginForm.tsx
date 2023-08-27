import { Col, Form, Row, Stack } from 'react-bootstrap';
import './styles.scss';
import MyHeader from '../../../components/basicUi/MyHeader';
import { useTranslation } from 'react-i18next';
import MyInput from '../../../components/basicUi/MyInput';
import MyButton from '../../../components/basicUi/MyButton';
import { useEffect, useReducer, useState } from 'react';
import { checkIfAllValid, checkInputValidity, getEmptyForm, getNewState, inputAttributes, preventFurtherAction } from '../../../utils/FormInputUtils';
import { MyForm } from '../../../data/utilTypes';
import { initAs } from '../../../utils/ObjectUtils';
import LoginFormLogic from './LoginFormLogic';

function LoginForm() {
    const { t } = useTranslation();
    const [myForm, dispatchForm]: [any, Function] = useReducer(formReducer, getEmptyForm());

    function handleSubmit(event: any) {
        const form = myForm;
        console.log(form)

        if (checkIfAllValid(event, myForm)) {
            console.log('valid')
        } else {
            console.log('invalid')
        }
        preventFurtherAction(event);
    };

    function formReducer(state: any, action: any) {
        return getNewState(state, action, action.value, checkInputValidity);
    }

    return (
        <Form noValidate validated={true} onSubmit={(e) => handleSubmit(e)}>
            <Col className="main-column">
                <Row className="row">
                    <MyInput
                        label={t('p.username')}
                        placeholder="Input test 1"
                        required
                        {...inputAttributes("username", myForm, dispatchForm)} />
                    <MyInput
                        type="password"
                        label={t('p.password')}
                        placeholder="Input test 1"
                        required
                        {...inputAttributes("password", myForm, dispatchForm)} />
                </Row>
            </Col>

            <MyButton.Primary onClick={handleSubmit} className="button-400">
                {t('p.login')}
            </MyButton.Primary>
        </Form>
    )
}

export default LoginForm;
