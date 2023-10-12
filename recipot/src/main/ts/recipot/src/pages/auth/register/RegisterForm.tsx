import { Col, Form, Row } from 'react-bootstrap';
import './styles.scss';
import { useTranslation } from 'react-i18next';
import MyInput from '../../../components/basicUi/MyInput';
import MyButton from '../../../components/basicUi/MyButton';
import { useReducer } from 'react';
import { checkIfAllValid, initEmptyForm, getNewState, inputAttributes, preventFurtherAction } from '../../../utils/FormInputUtils';
import { validateEmail } from '../../../utils/RegexUtils';
import { FormSave, MyForm } from '../../../data/utilTypes';
import { UserRegisterDto } from '../../../data/types';

type Props = {
    formSave: FormSave<UserRegisterDto>,
    defaultValue: string
};

function RegisterForm({
    formSave,
    defaultValue
}: Props) {

    const { t } = useTranslation();
    const [myForm, dispatchForm]: [MyForm, Function] = useReducer(formReducer, initEmptyForm());

    function formReducer(state: any, action: any) {
        return getNewState(state, action, action.value, checkInputValidity);
    }

    function onSubmit(event: any) {
        if (checkIfAllValid(event, myForm)) {
            formSave.onSubmit(myForm.formValue);
        }
        preventFurtherAction(event);
    };

    function checkInputValidity(action: any, state?: any) {
        switch (action.type) {
            case 'login': {
                return action.value && action.value.length > 3;
            }
            case 'email': {
                return validateEmail(action.value);
            }
            case 'password': {
                return action.value && action.value.length > 3;
            }
            case 'matchingPassword': {
                return action.value && action.value.length > 3 && action.value === state.formValue.password;
            }
            default: {
                return true;
            }
        }
    }

    return (
        <Form noValidate validated onSubmit={onSubmit}>
            <Col className="main-column">
                <Row className="row">
                    {renderInputs()}
                </Row>
            </Col>

            <MyButton.Primary className="button-400" type="submit">
                {t('p.register')}
            </MyButton.Primary>
        </Form>
    )

    function renderInputs() {
        return (
            <>
                <MyInput
                    required
                    label={t('p.username')}
                    placeholder={t('p.username')}
                    defaultValue={defaultValue}
                    {...inputAttributes("login", myForm, dispatchForm)} />
                <MyInput
                    required
                    label={t('p.mail')}
                    placeholder={t('p.mail')}
                    defaultValue={defaultValue}
                    {...inputAttributes("email", myForm, dispatchForm)} />
                <MyInput
                    type="password"
                    required
                    label={t('p.password')}
                    placeholder={t('p.password')}
                    defaultValue={defaultValue}
                    {...inputAttributes("password", myForm, dispatchForm)} />
                <MyInput
                    type="password"
                    required
                    label={t('p.passwordRepeat')}
                    placeholder={t('p.passwordRepeat')}
                    defaultValue={defaultValue}
                    {...inputAttributes("matchingPassword", myForm, dispatchForm)} />
            </>
        )
    }
}

export default RegisterForm;