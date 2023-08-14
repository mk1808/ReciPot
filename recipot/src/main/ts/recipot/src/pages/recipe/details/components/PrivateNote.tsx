import { useTranslation } from "react-i18next";

function PrivateNote() {
    const { t } = useTranslation();
    return (
        <div className="mb-5 px-5 ingredients">
            <h4 className="my-3 display-4">{t('p.privateNote')}</h4>
            <div className="test"></div>
        </div>
    )
}

export default PrivateNote;