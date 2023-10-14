import { useTranslation } from "react-i18next";

import MyButton from "../../../components/basicUi/MyButton";
import useMyNav from "../../../hooks/useMyNav";

function NoAccess() {
    const { t } = useTranslation();
    const nav = useMyNav();
    return (
        <>
            <h1>{t('p.noAccess')}</h1>
            <br />

            <MyButton.Primary className="button-400" onClick={nav.toLogin}>
                {t('p.login')}
            </MyButton.Primary>
        </>
    );


}

export default NoAccess;