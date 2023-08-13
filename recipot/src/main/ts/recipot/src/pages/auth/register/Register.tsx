import { Stack } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import MyHeader from "../../../components/basicUi/MyHeader";

function Register() {
    const { t } = useTranslation();
    return (
        <Stack className="justify-content-center py-5 register-page full-height-page" direction="horizontal">
            <div className="p-4 mb-2 basic-container">
                <MyHeader title={t('p.registerHeader')}></MyHeader>
                {renderForm()}
            </div>
        </Stack>
    );

    function renderForm() {
        return (
            <div>
                <h6 className="display-6">Wpisz dane poniżej, aby założyć konto.</h6>
                <input type="text" className="my-2"></input> <br></br>
                <input type="text" className="my-2"></input>  <br></br>
                <button className="my-2">somebutton</button>  <br></br>
            </div>
        )
    }
}

export default Register;