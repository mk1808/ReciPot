import { Stack } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import MyHeader from "../../../components/basicUi/MyHeader";
import './styles.scss';
import RegisterForm from "./RegisterForm";
import authApi from "../../../api/AuthApi";
import { AppUser, Response, UserRegisterDto } from "../../../data/types";
import useAlerts from "../../../hooks/useAlerts";
import { initFormSave } from "../../../utils/FormInputUtils";
import useMyNav from "../../../hooks/useMyNav";

function Register() {
    const { t } = useTranslation();
    const nav = useMyNav();
    const alerts = useAlerts();
    const formSave = initFormSave<UserRegisterDto>();

    formSave.onSubmit = function (formValue: UserRegisterDto) {
        authApi.register(formValue, formSave.onSuccess, formSave.onError);
    }

    formSave.onSuccess = function (response: Response<AppUser>) {
        nav.toLogin();
        alerts.showSuccessAlert(t('p.userRegisterCorrect'));
    }

    formSave.onError = function (response: any) {
        alerts.onShowAlertOnErrorResponse(response);
    }
    
    return (
        <Stack className="justify-content-center py-5 mx-2 full-height-page register-page" direction="horizontal">
            <div className="p-4 mb-2 basic-container-border">
                <MyHeader title={t('p.registerHeader')}/>
                {renderForm()}
            </div>
        </Stack>
    );

    function renderForm() {
        return (
            <div>
                <h6 className="display-6">{t('p.fillRegisterPageInfo')}</h6>
                <RegisterForm formSave={formSave}/>
            </div>
        )
    }
}

export default Register;