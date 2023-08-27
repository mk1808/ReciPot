import { Col, Row, Stack } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import MyHeader from "../../../components/basicUi/MyHeader";
import MyInput from "../../../components/basicUi/MyInput";
import MyButton from "../../../components/basicUi/MyButton";
import './styles.scss';
import MyTextarea from "../../../components/basicUi/MyTextarea";

function Register() {
    const { t } = useTranslation();
    function handleSubmit() {

    }
    return (
        <Stack className="justify-content-center py-5 register-page" direction="horizontal">
            <div className="p-4 mb-2 basic-container basic-container-border">
                <MyHeader title={t('p.registerHeader')}></MyHeader>
                {renderForm()}
            </div>
        </Stack>
    );

    function renderForm() {
        return (
            <div>
                <h6 className="display-6">Wpisz dane poniżej, aby założyć konto.</h6>
                <Col className="main-column">
                    <Row className="row">
                        <MyInput
                            isValid={true}
                            name="test1"
                            label={t('p.username')}
                            placeholder="Input test 1"
                            onChange={(value: string) => console.log(value)} />
                        <MyInput
                            isValid={true}
                            name="test1"
                            label={t('p.mail')}
                            placeholder="Input test 1"
                            onChange={(value: string) => console.log(value)} />
                        <MyInput
                            type="password"
                            isValid={true}
                            name="test1"
                            label={t('p.password')}
                            placeholder="Input test 1"
                            onChange={(value: string) => console.log(value)} />
                        <MyInput
                            type="password"
                            isValid={true}
                            name="test1"
                            label={t('p.passwordRepeat')}
                            placeholder="Input test 1"
                            onChange={(value: string) => console.log(value)} />
                    </Row>
                    <hr></hr>
                    <Row className="row">
                        <MyInput
                            isValid={true}
                            name="test1"
                            label={t('p.avatar')}
                            placeholder="Input test 1"
                            onChange={(value: string) => console.log(value)} />
                        <MyTextarea
                            required={true}
                            isValid={true}
                            name="test4"
                            label={t('p.profileDescription')}
                            placeholder={t('p.writeAboutYourself')}
                            rows={5}
                            onChange={(value: string) => console.log(value)} />
                    </Row>
                </Col>

                <MyButton.Primary onClick={handleSubmit} className="button-400">
                    {t('p.register')}
                </MyButton.Primary>
            </div>
        )
    }
}

export default Register;