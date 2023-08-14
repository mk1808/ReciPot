
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

function UserDetails() {
    const { t } = useTranslation();

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
                <div className='col-3'><StatisticCircle value="12" size={150} ringSize={30} label={t('p.createdRecipesCount')} /></div>
                <div className='col-3'><StatisticCircle value="10" size={150} ringSize={30} label={t('p.commentedRecipesCount')} /></div>
                <div className='col-3'><StatisticCircle value="53" size={150} ringSize={30} label={t('p.ratedRecipesCount')} /></div>
                <div className='col-3'><StatisticCircle value="7" size={150} ringSize={30} label={t('p.userRecipeCollectionsCount')} /></div>
                <div className='col-3'><StatisticCircle value="42" size={150} ringSize={30} label={t('p.recipesInUserRecipeCollectionsCount')} /></div>
            </Stack>
        );
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

            <MyInput name="avatarImageSrc" label={t('p.avatarInputLabel')} placeholder={t('p.avatarInputPlaceholder')} onChange={(value: string) => console.log(value)} />
            <MyTextarea name="selfDescription" label={t('p.selfDescriptionInputLabel')} placeholder={t('p.selfDescriptionInputPlaceholder')} onChange={(value: string) => console.log(value)} />
        </>)
    }

    function renderButtonsRow() {
        return (
            <Row>
                <Col></Col>
                <Col md={1}>
                    <MyButton.Secondary onClick={() => { }}>{t('p.cancel')} </MyButton.Secondary>
                </Col>
                <Col md={1}>
                    <MyButton.Primary onClick={() => { }}>{t('p.save')} </MyButton.Primary>
                </Col>
                <Col md={1}>
                    <MyButton.Primary onClick={() => { }}>{t('p.edit')} </MyButton.Primary>
                </Col>
                <Col></Col>
            </Row>
        )
    }

}

export default UserDetails;