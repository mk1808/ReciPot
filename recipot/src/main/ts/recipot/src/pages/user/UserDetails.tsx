
import MyHeader from '../../components/basicUi/MyHeader';
import StatisticCircle from '../../components/complex/StatisticCircle';
import './styles.scss';
import { useTranslation } from 'react-i18next';
import { Stack } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MyImage from '../../components/basicUi/MyImage';
import MyInput from '../../components/basicUi/MyInput';
import MyTextarea from '../../components/basicUi/MyTextarea';
import MyButton from '../../components/basicUi/MyButton';
import { UserStatisticsDto } from '../../data/types';
import { useState } from 'react';

function UserDetails() {
    const { t } = useTranslation();

    const [isEditMode, setEditMode] = useState(false);

    const userStatistics: UserStatisticsDto = {
        commentedRecipesCount: 12,
        createdRecipesCount: 20,
        ratedRecipesCount: 40,
        recipesInUserRecipeCollectionsCount: 55,
        userRecipeCollectionsCount: 18
    };

    function onEdit() {
        setEditMode(true);
    };

    function onSave() {

    };

    function onCancel() {
        setEditMode(false);
    };

    return (
        <div className='mx-auto my-5 p-4 user-details-page basic-container basic-container-border'>
            <MyHeader title={t('p.userDetailsHeader')}></MyHeader>
            {renderUserStatistics()}
            <hr />
            {renderUserEditForm()}
        </div>
    );

    function renderUserStatistics() {
        return (
            <Stack direction="horizontal" gap={5} className='flex-wrap justify-content-center'>
                {renderStatistic(userStatistics.createdRecipesCount, 'p.createdRecipesCount')}
                {renderStatistic(userStatistics.commentedRecipesCount, 'p.commentedRecipesCount')}
                {renderStatistic(userStatistics.ratedRecipesCount, 'p.ratedRecipesCount')}
                {renderStatistic(userStatistics.userRecipeCollectionsCount, 'p.userRecipeCollectionsCount')}
                {renderStatistic(userStatistics.recipesInUserRecipeCollectionsCount, 'p.recipesInUserRecipeCollectionsCount')}
            </Stack>
        );
    }

    function renderStatistic(value: number, label: string) {
        return <div className='col-3'><StatisticCircle value={String(value)} size={150} ringSize={30} label={t(label)} /></div>
    }

    function renderUserEditForm() {
        return (
            <Container className='edit-form'>
                <Row>
                    <Col className=' d-flex align-items-center justify-content-center'>
                        {renderAvatar()}
                    </Col>
                    <Col>
                        {renderUserForm()}
                    </Col>
                </Row>
                {renderButtonsRow()}
            </Container>
        );
    }

    function renderAvatar() {
        return <MyImage src={"https://cdn-icons-png.flaticon.com/512/1077/1077114.png"} height={200} />
    }

    function renderUserForm() {
        return (<>
            <MyInput name="email" label={t('p.emailInputLabel')} placeholder={t('p.emailInputPlaceholder')} defaultValue={"example@email.com"} disabled={true} />
            <MyInput name="login" label={t('p.loginInputLabel')} placeholder={t('p.loginInputPlaceholder')} defaultValue={"userLogin"} disabled={true} />

            <MyInput name="avatarImageSrc" label={t('p.avatarInputLabel')} placeholder={t('p.avatarInputPlaceholder')} onChange={(value: string) => console.log(value)} disabled={!isEditMode} />
            <MyTextarea name="selfDescription" label={t('p.selfDescriptionInputLabel')} placeholder={t('p.selfDescriptionInputPlaceholder')} onChange={(value: string) => console.log(value)} disabled={!isEditMode} />
        </>)
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
        return isEditMode && renderButton(MyButton.Primary, onSave, 'p.save');
    }

    function renderEditButton() {
        return !isEditMode && renderButton(MyButton.Primary, onEdit, 'p.edit');
    }

    function renderButton(Button: any, onClick: any, label: string) {
        return (
            <Col md={3}>
                <Button onClick={onClick}>{t(label)} </Button>
            </Col>
        )
    }
}

export default UserDetails;