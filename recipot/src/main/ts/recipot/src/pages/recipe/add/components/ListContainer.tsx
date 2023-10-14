import '../styles.scss';
import { useTranslation } from "react-i18next";
import { BsPlusCircleFill } from 'react-icons/bs';

import MyButton from '../../../../components/basicUi/MyButton';

type Props = { title: string, onAdd: Function, children: any };

function ListContainer({
    title,
    onAdd,
    children
}: Props) {

    const { t } = useTranslation();

    return (
        <div className="mt-5">
            <hr />
            <h4 className="mt-3">{title}</h4>
            <div className="text-start">
                {children}
            </div>
            <MyButton.Primary onClick={onAdd} className="button-width">
                {t('p.add')}
                <BsPlusCircleFill className="mb-1 ms-1" />
            </MyButton.Primary>
        </div>
    );
}

export default ListContainer;