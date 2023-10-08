import { Stack } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import MyHeader from "../../../components/basicUi/MyHeader";
import './styles.scss';
import RegisterForm from "./RegisterForm";
import authApi from "../../../api/AuthApi";
import { AppUser, Response, UserRegisterDto } from "../../../data/types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAlerts from "../../../hooks/useAlerts";
import { initFormSave } from "../../../utils/FormInputUtils";

function Register() {
    const { t } = useTranslation();
    const alerts = useAlerts();
    const formSave = initFormSave<UserRegisterDto>();
    const [defaultValue, setDefaultValue] = useState<string>("");
    const navigate = useNavigate();

    formSave.onSubmit = function (formValue: any) {
        authApi.register(formValue, formSave.onSuccess, formSave.onError);
    }
    formSave.onSuccess = function (response: Response<AppUser>) {
        setDefaultValue(" ");
        setTimeout(() => { setDefaultValue(""); }, 100)
        alerts.showSuccessAlert(t('p.userRegisterCorrect'));
        navigate('/login');
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
                <RegisterForm formSave={formSave} defaultValue={defaultValue}/>
            </div>
        )
    }
}

export default Register;