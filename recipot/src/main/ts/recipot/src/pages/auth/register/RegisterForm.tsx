import { Col, Form, Row } from 'react-bootstrap';
import './styles.scss';
import { useTranslation } from 'react-i18next';
import MyInput from '../../../components/basicUi/MyInput';
import MyButton from '../../../components/basicUi/MyButton';
import { useReducer, FormEvent } from 'react';
import { checkIfAllValid, initEmptyForm, getNewFormState, preventFurtherAction, inputAttrs } from '../../../utils/FormInputUtils';
import { validateEmail } from '../../../utils/RegexUtils';
import { FormAction, FormSave, MyForm } from '../../../data/utilTypes';
import { UserRegisterDto } from '../../../data/types';

type Props = {
    formSave: FormSave<UserRegisterDto>
};

function RegisterForm({
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

    function checkInputValidity(action: FormAction, state?: any) {
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
                    {...inputAttrs({ name: "login", myForm, dispatchForm })} />
                <MyInput
                    required
                    label={t('p.mail')}
                    placeholder={t('p.mail')}
                    {...inputAttrs({ name: "email", myForm, dispatchForm })} />
                <MyInput
                    type="password"
                    required
                    label={t('p.password')}
                    placeholder={t('p.password')}
                    {...inputAttrs({ name: "password", myForm, dispatchForm })} />
                <MyInput
                    type="password"
                    required
                    label={t('p.passwordRepeat')}
                    placeholder={t('p.passwordRepeat')}
                    {...inputAttrs({ name: "matchingPassword", myForm, dispatchForm })} />
            </>
        )
    }
}

export default RegisterForm;