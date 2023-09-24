import { useTranslation } from "react-i18next";
import MyButton from "../../../components/basicUi/MyButton";
import { useNavigate } from "react-router-dom";

function NoAccess() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    return (
        <>
            <h1>{t('p.noAccess')}</h1>
            <br />

            <MyButton.Primary className="button-400" onClick={() => navigate('/login')}>
                {t('p.login')}
            </MyButton.Primary>
        </>
    );


}

export default NoAccess;