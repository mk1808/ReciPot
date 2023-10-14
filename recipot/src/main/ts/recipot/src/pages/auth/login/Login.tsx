import { useContext, useEffect } from 'react';
import { Stack } from 'react-bootstrap';
import './styles.scss';
import { useTranslation } from 'react-i18next';

import LoginForm from './LoginForm';
import authApi from '../../../api/AuthApi';
import MyHeader from '../../../components/basicUi/MyHeader';
import { UserContextType, UsersContext, UsersDispatchContext } from '../../../context/UserContext';
import { Response, UserLoginDto } from '../../../data/types';
import useAlerts from '../../../hooks/useAlerts';
import useMyNav from '../../../hooks/useMyNav';
import { initFormSave } from '../../../utils/FormInputUtils';

function Login() {
    const { t } = useTranslation();
    const usersDispatchContext = useContext(UsersDispatchContext);
    const user = useContext(UsersContext);
    const nav = useMyNav();
    const alerts = useAlerts();
    const formSave = initFormSave<UserLoginDto>();

    useEffect(() => {
        if (user != null) {
            nav.toUser();
        }
    }, [user])

    formSave.onSubmit = function (formValue: UserLoginDto) {
        authApi.login(formValue, formSave.onSuccess, formSave.onError);
    }

    formSave.onSuccess = function (response: Response<any>) {
        usersDispatchContext({ type: UserContextType.Refresh });
    }

    formSave.onError = function (response: Response<any>) {
        alerts.onShowAlertOnErrorResponse(response);
    }

    return (
        <Stack className="justify-content-center align-items-stretch py-5 login-page full-height-page" direction="horizontal">
            <div className="p-4 mb-2 basic-container-border">
                <MyHeader title={t('p.loginHeader')} />
                {renderForm()}
            </div>
        </Stack>
    );

    function renderForm() {
        return (
            <>
                <h6 className="display-6">{t('p.fillLoginPageInfo')}</h6>
                <LoginForm formSave={formSave} />
            </>
        )
    }
}

export default Login;