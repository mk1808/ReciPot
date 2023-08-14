import { useTranslation } from "react-i18next";

function OtherColumn() {
    const { t } = useTranslation();
    const recipes = [{}, {}, {}, {}, {}, {}, {}]
    return (
        <div className="h-100  other" >
            <div className="py-4 categories">
                <h4 className="my-3 display-4">{t('p.categories')}</h4>
                <div className="test"></div>
            </div>
            <div className="py-4 recipes">
                <h4 className="my-3 display-4">{t('p.recipes')}</h4>
                {recipes.map((recipe, index) => {
                    return (
                        <div className="my-3 test" key={index}></div>
                    )
                })}

            </div>

        </div>
    )
}

export default OtherColumn;