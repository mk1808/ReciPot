import { FormEvent, useReducer } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import './styles.scss';
import { useTranslation } from 'react-i18next';

import MyButton from '../../../components/basicUi/MyButton';
import MyInput from '../../../components/basicUi/MyInput';
import { UserLoginDto } from '../../../data/types';
import { FormAction, FormSave, MyForm } from '../../../data/utilTypes';
import { checkIfAllValid, checkInputValidity, initEmptyForm, getNewFormState, preventFurtherAction, inputAttrs } from '../../../utils/FormInputUtils';

type Props = {
    formSave: FormSave<UserLoginDto>
};

function LoginForm({
    formSave
}: Props) {

    const { t } = useTranslation();
    const [myForm, dispatchForm]: [MyForm, Function] = useReducer(formReducer, initEmptyForm());

    function formReducer(state: any, action: FormAction) {
        return getNewFormState(state, action, checkInputValidity);
    }

    function onSubmit(event: FormEvent) {
        if (checkIfAllValid(event, myForm)) {
            formSave.onSubmit(myForm.formValue);
        }
        preventFurtherAction(event);
    };

    return (
        <Form noValidate validated onSubmit={onSubmit}>
            <Col className="main-column">
                <Row className="row">
                    {renderInputs()}
                </Row>
            </Col>

            <MyButton.Primary className="button-400" type="submit">
                {t('p.login')}
            </MyButton.Primary>
        </Form>
    )

    function renderInputs() {
        return (
            <>
                <MyInput
                    label={t('p.username')}
                    placeholder={t('p.username')}
                    required
                    {...inputAttrs({ name: "username", myForm, dispatchForm })} />
                <MyInput
                    type="password"
                    label={t('p.password')}
                    placeholder={t('p.password')}
                    required
                    {...inputAttrs({ name: "password", myForm, dispatchForm })} />
            </>
        )
    }
}

export default LoginForm;
