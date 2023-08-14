import { useTranslation } from "react-i18next";

function Steps() {
    const { t } = useTranslation();
    return (
        <div className="mb-5 px-5 ingredients">
            <h4 className="my-3 display-4">{t('p.recipeSteps')}</h4>
            <div className="test"></div>
        </div>
    )
}

export default Steps;