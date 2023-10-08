import { useTranslation } from "react-i18next";

function NotFound() {
    const { t } = useTranslation();
    return (
        <h1>{t('p.notFound')}</h1>
    );
}

export default NotFound;