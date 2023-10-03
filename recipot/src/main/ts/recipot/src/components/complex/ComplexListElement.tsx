import { Stack } from 'react-bootstrap';
import './styles.scss';
import { FaTrashCan, FaCheck, FaBan } from "react-icons/fa6";
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

function ComplexListElement({
    element,
    index,
    isActive = false,
    onDeleteCallback,
    onSelectCallback,
    getElementName
}: {
    element: { name: string, id: string, canDelete?: boolean },
    index: number,
    isActive?: boolean,
    onDeleteCallback: (index: number) => any,
    onSelectCallback: (index: number) => any,
    getElementName?: (element: any, t:any) => any,
}) {
    const [isDeleteMode, setDeleteMode] = useState(false);
    const { t } = useTranslation();

    function onSelect() {
        onSelectCallback(index);
    }

    function onDeleteClick(event: any) {
        event.stopPropagation();
        setDeleteMode(true);
    }

    function onConfirmClick(event: any) {
        event.stopPropagation();
        onDeleteCallback(index);
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
        <Stack direction="horizontal" className={getElementStyleClasses()} onClick={onSelect}>
            {renderElementName()}
            {renderActions()}
        </Stack>
    );

    function renderElementName() {
        return <span>{getElementName != null ? getElementName(element, t) : element.name}</span>
    }

    function renderActions() {
        return isDeleteMode ? renderConfirmActions() : renderDeleteAction();
    }

    function renderDeleteAction() {
        const canDelete = element.canDelete !== false;
        return canDelete && <FaTrashCan onClick={onDeleteClick} className="action-icon" />;
    }

    function renderConfirmActions() {
        return (
            <div>
                <FaCheck onClick={onConfirmClick} className="action-icon" />
                <FaBan onClick={onCancelClick} className="action-icon" />
            </div>
        );
    }
}

export default ComplexListElement;