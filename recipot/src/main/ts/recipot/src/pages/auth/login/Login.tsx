import { Stack } from 'react-bootstrap';
import './styles.scss';
import MyHeader from '../../../components/basicUi/MyHeader';
import { useTranslation } from 'react-i18next';
import LoginForm from './LoginForm';
import { FormSave } from '../../../data/utilTypes';
import { getEmptyFormSave } from '../../../utils/FormInputUtils';

function Login() {
    const { t } = useTranslation();
    const formSave: FormSave = getEmptyFormSave();
    formSave.onSubmit = function(){
        
    }
    formSave.onSuccess = function(){
        
    }
    formSave.onError = function(){
        
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
                <LoginForm formSave={formSave}></LoginForm>
            </div>
        )
    }
}

export default Login;