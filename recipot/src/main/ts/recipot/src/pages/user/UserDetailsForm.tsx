import './styles.scss';
import { useReducer, useState } from 'react';
import { Form, Stack } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useTranslation } from 'react-i18next';

import defaultUserAvatar from '../../assets/images/default_user_avatar.png';
import MyButton from '../../components/basicUi/MyButton';
import MyFileInput from '../../components/basicUi/MyFileInput';
import MyImage from '../../components/basicUi/MyImage';
import MyInput from '../../components/basicUi/MyInput';
import MyTextarea from '../../components/basicUi/MyTextarea';
import { AppUser } from '../../data/types';
import { MyForm, FormSave, FormAction } from '../../data/utilTypes';
import { checkIfAllValid, checkInputValidity, initEmptyForm, getNewFormState, preventFurtherAction, inputAttrs } from '../../utils/FormInputUtils';

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

    function formReducer(state: any, action: FormAction) {
        return getNewFormState(state, action, checkInputValidity);
    }

    function handleSubmit(event: any) {
        if (checkIfAllValid(event, myForm)) {
            formSave.onSubmit(myForm.formValue)
            setEditMode(false);
        }
        preventFurtherAction(event);
    };

    function onEdit() {
        setEditMode(true);
    };

    function onCancel() {
        setEditMode(false);
    };

    function onFileSelect(file: any) {
        dispatchForm({ type: "avatarImage", value: file });
        dispatchForm({ type: "avatarImageSrc", value: URL.createObjectURL(file) });
    }

    return (
        <Form noValidate validated onSubmit={handleSubmit} className='px-lg-5 edit-form'>
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
        return <MyImage src={myForm.formValue.avatarImageSrc || user.avatarImageSrc || defaultUserAvatar} />
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
                {...inputAttrs({ name: "email", myForm, dispatchForm })}
                label={t('p.emailInputLabel')}
                placeholder={t('p.emailInputPlaceholder')}
                defaultValue={user.email}
                disabled
            />);
    }

    function renderLoginInput() {
        return (
            <MyInput
                {...inputAttrs({ name: "login", myForm, dispatchForm })}
                label={t('p.loginInputLabel')}
                placeholder={t('p.loginInputPlaceholder')}
                defaultValue={user.login}
                disabled
            />
        );
    }

    function renderAvatarImageInput() {
        return (
            <MyFileInput
                {...inputAttrs({ name: "avatarImage", myForm, dispatchForm })}
                label={t('p.avatarInputLabel')}
                placeholder={t('p.avatarInputPlaceholder')}
                disabled={!isEditMode}
                onChange={onFileSelect}
                isValid={true}
            />
        );
    }

    function renderSelfDescriptionInput() {
        return (
            <MyTextarea
                {...inputAttrs({ name: "selfDescription", myForm, dispatchForm })}
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
        return (
            <Button onClick={onClick} type={type}>
                {t(label)}
            </Button>
        )
    }
}

export default UserDetailsForm;