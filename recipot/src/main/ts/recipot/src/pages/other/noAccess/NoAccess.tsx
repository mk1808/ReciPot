import { useTranslation } from "react-i18next";

function NoAccess() {
    const { t } = useTranslation();
    return (
        <h1>{t('p.noAccess')}</h1>
    );


}

export default NoAccess;