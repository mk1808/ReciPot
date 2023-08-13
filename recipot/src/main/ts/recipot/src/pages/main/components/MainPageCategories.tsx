import { Stack } from "react-bootstrap";
import { useTranslation } from "react-i18next";

function MainPageCategories() {
    const { t } = useTranslation();
    return (
        <div className="categories-section">
            <h2 className="my-3 display-3">{t('p.categories')}</h2>
            <Stack direction="horizontal" gap={5} className='flex-wrap justify-content-center py-3 box'>
                    <div className='col-3'></div>
                    <div className='col-3'></div>
                    <div className='col-3'></div>
                </Stack>
        </div>
    );
}

export default MainPageCategories;