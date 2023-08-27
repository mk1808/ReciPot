import './styles.scss';
import { useTranslation } from 'react-i18next';
import { Form } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MyImage from '../../components/basicUi/MyImage';
import MyInput from '../../components/basicUi/MyInput';
import MyTextarea from '../../components/basicUi/MyTextarea';
import MyButton from '../../components/basicUi/MyButton';
import { useReducer, useState } from 'react';
import { checkIfAllValid, checkInputValidity, getEmptyForm, getNewState, inputAttributes, preventFurtherAction } from '../../utils/FormInputUtils';
import { MyForm, FormSave } from '../../data/utilTypes';

function UserDetailsForm({ formSave }: { formSave: FormSave }) {
    const { t } = useTranslation();

    const [isEditMode, setEditMode] = useState(false);
    const [myForm, dispatchForm]: [MyForm, Function] = useReducer(formReducer, getEmptyForm());

    function handleSubmit(event: any) {
        if (checkIfAllValid(event, myForm)) {
            formSave.onSubmit(myForm.formValue)
            setEditMode(false);
        }
        preventFurtherAction(event);
    };

    function formReducer(state: any, action: any) {
        return getNewState(state, action, action.value, checkInputValidity);
    }

    function onEdit() {
        setEditMode(true);
    };

    function onCancel() {
        setEditMode(false);
    };

    return (
        <Form noValidate validated={true} onSubmit={handleSubmit}>
            <Container className='edit-form'>
                <Row>
                    <Col className='d-flex align-items-center justify-content-center'>
                        {renderAvatar()}
                    </Col>
                    <Col>
                        {renderUserForm()}
                    </Col>
                </Row>
                {renderButtonsRow()}
            </Container>
        </Form>
    );

    function renderAvatar() {
        return <MyImage src={"https://cdn-icons-png.flaticon.com/512/1077/1077114.png"} height={200} />
    }

    function renderUserForm() {
        return (<>
            {renderEmailInput()}
            {renderLoginInput()}

            {renderAvatarImageInput()}
            {renderSelfDescriptionInput()}
        </>)
    }

    function renderEmailInput() {
        return (
            <MyInput
                {...inputAttributes("email", myForm, dispatchForm)}
                label={t('p.emailInputLabel')}
                placeholder={t('p.emailInputPlaceholder')}
                defaultValue={"example@email.com"}
                disabled={true}
            />);
    }

    function renderLoginInput() {
        return (
            <MyInput
                {...inputAttributes("login", myForm, dispatchForm)}
                label={t('p.loginInputLabel')}
                placeholder={t('p.loginInputPlaceholder')}
                defaultValue={"userLogin"}
                disabled={true}
            />);
    }

    function renderAvatarImageInput() {
        return (
            <MyInput
                {...inputAttributes("avatarImageSrc", myForm, dispatchForm)}
                label={t('p.avatarInputLabel')}
                placeholder={t('p.avatarInputPlaceholder')}
                disabled={!isEditMode}
            />);
    }

    function renderSelfDescriptionInput() {
        return (
            <MyTextarea
                {...inputAttributes("selfDescription", myForm, dispatchForm)}
                label={t('p.selfDescriptionInputLabel')}
                placeholder={t('p.selfDescriptionInputPlaceholder')}
                disabled={!isEditMode}
            />);
    }

    function renderButtonsRow() {
        return (
            <Row>
                <Col></Col>
                {renderCancelButton()}
                {renderSaveButton()}
                {renderEditButton()}
                <Col></Col>
            </Row>
        )
    }

    function renderCancelButton() {
        return isEditMode && renderButton(MyButton.Secondary, onCancel, 'p.cancel');
    }

    function renderSaveButton() {
        return isEditMode && renderButton(MyButton.Primary, () => { }, 'p.save', "submit");
    }

    function renderEditButton() {
        return !isEditMode && renderButton(MyButton.Primary, onEdit, 'p.edit');
    }

    function renderButton(Button: any, onClick: any, label: string, type?: string) {
        return (
            <Col md={3}>
                <Button onClick={onClick} type={type}>{t(label)} </Button>
            </Col>
        )
    }
}

export default UserDetailsForm;