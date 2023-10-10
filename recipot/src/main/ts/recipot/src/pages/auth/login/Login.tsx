import { Stack } from 'react-bootstrap';
import './styles.scss';
import MyHeader from '../../../components/basicUi/MyHeader';
import { useTranslation } from 'react-i18next';
import LoginForm from './LoginForm';
import { initFormSave } from '../../../utils/FormInputUtils';
import { useContext, useEffect } from 'react';
import { UserContextType, UsersContext, UsersDispatchContext } from '../../../context/UserContext';
import authApi from '../../../api/AuthApi';
import useAlerts from '../../../hooks/useAlerts';
import { Response, UserLoginDto } from '../../../data/types';
import useMyNav from '../../../hooks/useMyNav';

function Login() {
    const { t } = useTranslation();
    const nav = useMyNav();    
    const usersDispatchContext = useContext(UsersDispatchContext);
    const user = useContext(UsersContext);
    const alerts = useAlerts();    
    const formSave = initFormSave<UserLoginDto>();

    useEffect(() => {
        if (user != null) {
            nav.toUser();
        }
    }, [user])

    formSave.onSubmit = function (formValue: any) {
        authApi.login(formValue, formSave.onSuccess, formSave.onError);
    }

    formSave.onSuccess = function (response: Response<any>) {
        usersDispatchContext({ type: UserContextType.Refresh });
    }

    formSave.onError = function (response: Response<any>) {
        alerts.onShowAlertOnErrorResponse(response);
    }

    return (
        <Stack className="justify-content-center align-items-stretch py-5 mx-2 login-page full-height-page" direction="horizontal">
            <div className="p-4 mb-2 basic-container-border">
                <MyHeader title={t('p.loginHeader')}/>
                {renderForm()}
            </div>
        </Stack>
    );

    function renderForm() {
        return (
            <div>
                <h6 className="display-6">{t('p.fillLoginPageInfo')}</h6>
                <LoginForm formSave={formSave}/>
            </div>
        )
    }
}

export default Login;