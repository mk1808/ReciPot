import { Stack } from 'react-bootstrap';
import './styles.scss';
import MyHeader from '../../../components/basicUi/MyHeader';
import { useTranslation } from 'react-i18next';
import LoginForm from './LoginForm';
import { FormSave } from '../../../data/utilTypes';
import { getEmptyFormSave } from '../../../utils/FormInputUtils';
import { useContext, useEffect } from 'react';
import { UsersContext, UsersDispatchContext } from '../../../context/UserContext';
import authApi from '../../../api/AuthApi';
import { useNavigate } from 'react-router-dom';
import useAlerts from '../../../hooks/useAlerts';

function Login() {
    const { t } = useTranslation();
    const navigate = useNavigate();    
    const usersDispatchContext = useContext(UsersDispatchContext);
    const user = useContext(UsersContext);
    const alerts = useAlerts();    
    const formSave: FormSave = getEmptyFormSave();

    useEffect(() => {
        if (user != null) {
            navigate('/user');
        }
    }, [user])

    formSave.onSubmit = function (formValue: any) {
        authApi.login(formValue, formSave.onSuccess, formSave.onError);

    }
    formSave.onSuccess = function (response: any) {
        usersDispatchContext({ type: "refresh" });
    }
    formSave.onError = function (response: any) {
        alerts.onShowAlertOnErrorResponse(response);
    }

    return (
        <Stack className="justify-content-center align-items-stretch py-5 mx-2 login-page full-height-page" direction="horizontal">
            <div className="p-4 mb-2 basic-container-border">
                <MyHeader title={t('p.loginHeader')}></MyHeader>
                {renderForm()}
            </div>
        </Stack>
    );

    function renderForm() {
        return (
            <div>
                <h6 className="display-6">{t('p.fillLoginPageInfo')}</h6>
                <LoginForm formSave={formSave}></LoginForm>
            </div>
        )
    }
}

export default Login;