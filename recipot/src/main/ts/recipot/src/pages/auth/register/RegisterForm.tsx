import { Col, Form, Row } from 'react-bootstrap';
import './styles.scss';
import { useTranslation } from 'react-i18next';
import MyInput from '../../../components/basicUi/MyInput';
import MyButton from '../../../components/basicUi/MyButton';
import { useReducer } from 'react';
import { checkIfAllValid, getEmptyForm, getNewState, inputAttributes, preventFurtherAction } from '../../../utils/FormInputUtils';
import MyTextarea from "../../../components/basicUi/MyTextarea";
import { validateEmail } from '../../../utils/RegexUtils';

function RegisterForm({ formSave }: { formSave: object }) {
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
        <Form noValidate validated={true} onSubmit={(e) => handleSubmit(e)}>
            <Col className="main-column">
                <Row className="row">
                    <MyInput
                        required={true}
                        label={t('p.username')}
                        placeholder="Input test 1"
                        {...inputAttributes("login", myForm, dispatchForm)} />
                    <MyInput
                        required={true}
                        label={t('p.mail')}
                        placeholder="Input test 1"
                        {...inputAttributes("email", myForm, dispatchForm)} />
                    <MyInput
                        type="password"
                        required={true}
                        label={t('p.password')}
                        placeholder="Input test 1"
                        {...inputAttributes("password", myForm, dispatchForm)} />
                    <MyInput
                        type="password"
                        required={true}
                        label={t('p.passwordRepeat')}
                        placeholder="Input test 1"
                        {...inputAttributes("matchingPassword", myForm, dispatchForm)} />
                </Row>
                <hr></hr>
                <Row className="row">
                    <MyInput
                        label={t('p.avatar')}
                        placeholder="Input test 1"
                        {...inputAttributes("avatarImageSrc", myForm, dispatchForm)} />
                    <MyTextarea
                        label={t('p.profileDescription')}
                        placeholder={t('p.writeAboutYourself')}
                        rows={5}
                        {...inputAttributes("selfDescription", myForm, dispatchForm)} />
                </Row>
            </Col>

            <MyButton.Primary onClick={handleSubmit} className="button-400">
                {t('p.register')}
            </MyButton.Primary>
        </Form>
    )
}

export default RegisterForm;