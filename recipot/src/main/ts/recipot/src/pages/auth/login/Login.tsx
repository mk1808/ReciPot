import { Col, Row, Stack } from 'react-bootstrap';
import './styles.scss';
import MyHeader from '../../../components/basicUi/MyHeader';
import { useTranslation } from 'react-i18next';
import MyInput from '../../../components/basicUi/MyInput';
import MyButton from '../../../components/basicUi/MyButton';

function Login() {
    const { t } = useTranslation();
    function handleSubmit() {

    }
    return (
        <Stack className="justify-content-center py-5 login-page full-height-page" direction="horizontal">
            <div className="p-4 mb-2 basic-container basic-container-border">
                <MyHeader title={t('p.loginHeader')}></MyHeader>
                {renderForm()}
            </div>
        </Stack>
    );

    function renderForm() {
        return (
            <div>
                <h6 className="display-6">Wpisz dane poniżej, aby się zalogować.</h6>
                <Col className="main-column">
                    <Row className="row">
                        <MyInput
                            isValid={true}
                            name="test1"
                            label={t('p.username')}
                            placeholder="Input test 1"
                            onChange={(value: string) => console.log(value)} />
                        <MyInput
                            type="password"
                            isValid={true}
                            name="test1"
                            label={t('p.password')}
                            placeholder="Input test 1"
                            onChange={(value: string) => console.log(value)} />
                    </Row>
                </Col>

                <MyButton.Primary onClick={handleSubmit} className="button-400">
                    {t('p.login')}
                </MyButton.Primary>
            </div>
        )
    }
}

export default Login;