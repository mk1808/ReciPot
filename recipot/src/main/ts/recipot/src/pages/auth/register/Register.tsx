import { Col, Row, Stack } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import MyHeader from "../../../components/basicUi/MyHeader";
import MyInput from "../../../components/basicUi/MyInput";
import MyButton from "../../../components/basicUi/MyButton";
import './styles.scss';
import MyTextarea from "../../../components/basicUi/MyTextarea";
import RegisterForm from "./RegisterForm";
import { FormSave } from "../../../data/utilTypes";
import { getEmptyFormSave } from "../../../utils/FormInputUtils";
import authApi from "../../../api/AuthApi";
import { AppUser, Response } from "../../../data/types";
import { showErrorAlert, showSuccessAlert } from "../../../utils/RestUtils";
import { useContext } from "react";
import { AlertsDispatchContext } from "../../../context/AlertContext";

function Register() {
    const { t } = useTranslation();
    const formSave: FormSave = getEmptyFormSave();
    const alertDispatch = useContext(AlertsDispatchContext);
    formSave.onSubmit = function (formValue: any) {
        console.log(formValue);
        authApi.register(formValue, formSave.onSuccess, formSave.onError);
    }
    formSave.onSuccess = function (response: Response<AppUser>) {
        showSuccessAlert(t('userRegisterCorrect'), alertDispatch);
    }
    formSave.onError = function (response: any) {
        showErrorAlert(t(response.message), alertDispatch);
    }
    return (
        <Stack className="justify-content-center py-5 full-height-page register-page" direction="horizontal">
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
                <RegisterForm formSave={formSave}></RegisterForm>
            </div>
        )
    }
}

export default Register;