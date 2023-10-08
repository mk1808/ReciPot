import { Col, Form, Row } from 'react-bootstrap';
import './styles.scss';
import { useTranslation } from 'react-i18next';
import MyInput from '../../../components/basicUi/MyInput';
import MyButton from '../../../components/basicUi/MyButton';
import { useReducer } from 'react';
import { checkIfAllValid, checkInputValidity, initEmptyForm, getNewState, inputAttributes, preventFurtherAction } from '../../../utils/FormInputUtils';
import { FormSave, MyForm } from '../../../data/utilTypes';
import { UserLoginDto } from '../../../data/types';

function LoginForm({ formSave }: { formSave: FormSave<UserLoginDto> }) {
    const { t } = useTranslation();
    const [myForm, dispatchForm]: [MyForm, Function] = useReducer(formReducer, initEmptyForm());

    function formReducer(state: any, action: any) {
        return getNewState(state, action, action.value, checkInputValidity);
    }

    function handleSubmit(event: any) {
        if (checkIfAllValid(event, myForm)) {
            formSave.onSubmit(myForm.formValue);
        }
        preventFurtherAction(event);
    };

    return (
        <Form noValidate validated={true} onSubmit={handleSubmit}>
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
                    {...inputAttributes("username", myForm, dispatchForm)} />
                <MyInput
                    type="password"
                    label={t('p.password')}
                    placeholder={t('p.password')}
                    required
                    {...inputAttributes("password", myForm, dispatchForm)} />
            </>
        )
    }
}

export default LoginForm;
