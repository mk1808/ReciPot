import { useState } from 'react';
import { Stack } from 'react-bootstrap';
import './styles.scss';
import { useTranslation } from 'react-i18next';
import { FaTrashCan, FaCheck, FaBan } from "react-icons/fa6";

import { ComplexListElementType } from '../../data/utilTypes';
import { initAs } from '../../utils/ObjectUtils';
import Tooltip from '../basicUi/Tooltip';

type Props = {
    element: ComplexListElementType,
    index: number,
    onDelete: (index: number) => any,
    onSelect: (index: number) => any,
    isActive?: boolean,
    getElementName?: (element: any, t: any) => any,
};

function ComplexListElement({
    element,
    index,
    onDelete,
    onSelect,
    isActive = false,
    getElementName = initAs()
}: Props) {

    const [isDeleteMode, setDeleteMode] = useState(false);
    const { t } = useTranslation();

    function onSelectCallback() {
        onSelect(index);
    }

    function onDeleteClick(event: any) {
        event.stopPropagation();
        setDeleteMode(true);
    }

    function onConfirmClick(event: any) {
        event.stopPropagation();
        onDelete(index);
    }

    function onCancelClick(event: any) {
        event.stopPropagation();
        setDeleteMode(false);
    }

    function getElementStyleClasses() {
        let styleClasses = "justify-content-between complex-list-element"
        if (isActive) {
            styleClasses += " is-active";
        }
        return styleClasses
    }

    return (
        <Stack direction="horizontal" className={getElementStyleClasses()} onClick={onSelectCallback}>
            {renderElementName()}
            {renderActions()}
        </Stack>
    );

    function renderElementName() {
        const elementName = getElementName ? getElementName(element, t) : element.name;
        return <span>{elementName}</span>;
    }

    function renderActions() {
        return isDeleteMode ? renderConfirmActions() : renderDeleteAction();
    }

    function renderDeleteAction() {
        const canDelete = element.canDelete !== false;
        return canDelete && (
            <Tooltip title={t('p.delete')}>
                <FaTrashCan onClick={onDeleteClick} className="action-icon" />
            </Tooltip>
        );
    }

    function renderConfirmActions() {
        return (
            <div>
                <Tooltip title={t('p.confirm')}>
                    <FaCheck onClick={onConfirmClick} className="danger-color" />
                </Tooltip>
                <Tooltip title={t('p.cancel')}>
                    <FaBan onClick={onCancelClick} className="action-icon" />
                </Tooltip>
            </div>
        );
    }
}

export default ComplexListElement;