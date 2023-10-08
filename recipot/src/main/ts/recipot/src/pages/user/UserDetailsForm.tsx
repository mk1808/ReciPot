import './styles.scss';
import { useTranslation } from 'react-i18next';
import { Form, Stack } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MyImage from '../../components/basicUi/MyImage';
import MyInput from '../../components/basicUi/MyInput';
import MyTextarea from '../../components/basicUi/MyTextarea';
import MyButton from '../../components/basicUi/MyButton';
import { useReducer, useState } from 'react';
import { checkIfAllValid, checkInputValidity, initEmptyForm, getNewState, inputAttributes, preventFurtherAction } from '../../utils/FormInputUtils';
import { MyForm, FormSave } from '../../data/utilTypes';
import { AppUser } from '../../data/types';

type Props = {
    formSave: FormSave<AppUser>,
    user: any
};

function UserDetailsForm({
    formSave,
    user
}: Props) {

    const { t } = useTranslation();

    const [isEditMode, setEditMode] = useState(false);
    const [myForm, dispatchForm]: [MyForm, Function] = useReducer(formReducer, initEmptyForm());

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
        <Form noValidate validated={true} onSubmit={handleSubmit} className='px-lg-5 edit-form'>
            <Row>
                <Col md={6} className='d-flex align-items-center justify-content-center'>
                    {renderAvatar()}
                </Col>
                <Col md={6}>
                    {renderUserForm()}
                </Col>
            </Row>
            {renderButtonsRow()}
        </Form>
    );

    function renderAvatar() {
        return <MyImage src={user.avatarImageSrc || "https://cdn-icons-png.flaticon.com/512/1077/1077114.png"} />
    }

    function renderUserForm() {
        return (
            <>
                {renderEmailInput()}
                {renderLoginInput()}

                {renderAvatarImageInput()}
                {renderSelfDescriptionInput()}
            </>
        )
    }

    function renderEmailInput() {
        return (
            <MyInput
                {...inputAttributes("email", myForm, dispatchForm)}
                label={t('p.emailInputLabel')}
                placeholder={t('p.emailInputPlaceholder')}
                defaultValue={user.email}
                disabled={true}
            />);
    }

    function renderLoginInput() {
        return (
            <MyInput
                {...inputAttributes("login", myForm, dispatchForm)}
                label={t('p.loginInputLabel')}
                placeholder={t('p.loginInputPlaceholder')}
                defaultValue={user.login}
                disabled={true}
            />
        );
    }

    function renderAvatarImageInput() {
        return (
            <MyInput
                {...inputAttributes("avatarImageSrc", myForm, dispatchForm)}
                label={t('p.avatarInputLabel')}
                placeholder={t('p.avatarInputPlaceholder')}
                disabled={!isEditMode}
                defaultValue={user.avatarImageSrc}
            />
        );
    }

    function renderSelfDescriptionInput() {
        return (
            <MyTextarea
                {...inputAttributes("selfDescription", myForm, dispatchForm)}
                label={t('p.selfDescriptionInputLabel')}
                placeholder={t('p.selfDescriptionInputPlaceholder')}
                defaultValue={user.selfDescription}
                disabled={!isEditMode}
            />
        );
    }

    function renderButtonsRow() {
        return (
            <Stack direction='horizontal' className='justify-content-center'>
                {renderCancelButton()}
                {renderSaveButton()}
                {renderEditButton()}
            </Stack>
        )
    }

    function renderCancelButton() {
        return isEditMode && renderButton(MyButton.Secondary, onCancel, 'p.cancel');
    }

    function renderSaveButton() {
        return isEditMode && renderButton(MyButton.Primary, handleSubmit, 'p.save', "submit");
    }

    function renderEditButton() {
        return !isEditMode && renderButton(MyButton.Primary, onEdit, 'p.edit');
    }

    function renderButton(Button: any, onClick: any, label: string, type?: string) {
        return <Button onClick={onClick} type={type}>{t(label)} </Button>
    }
}

export default UserDetailsForm;