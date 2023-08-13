import { Stack } from 'react-bootstrap';
import './styles.scss';
import MyHeader from '../../../components/basicUi/MyHeader';
import { useTranslation } from 'react-i18next';

function Login() {
    const { t } = useTranslation();
    return (

        <Stack className=" justify-content-center login-page py-5" direction="horizontal">
            <div className="p-4 mb-2  test one">
                <MyHeader title={t('p.login')}></MyHeader>
                
                <h6 className="display-6">Wpisz dane poniżej, aby się zalogować.</h6>
                <input type="text" className="my-2"></input> <br></br>
                <input type="text" className="my-2"></input>  <br></br>
                <button className="my-2">somebutton</button>  <br></br>
            </div>
        </Stack>


    );


}

export default Login;

//style od ramki do app.scss