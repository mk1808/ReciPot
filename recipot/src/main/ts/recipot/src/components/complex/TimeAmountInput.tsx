import { useEffect, useRef, useState } from "react";
import { Stack } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { useTranslation } from "react-i18next";
import { FaRegClock, FaAngleUp, FaAngleDown } from "react-icons/fa6";

import './styles.scss';
import { addZeroIfNeeded } from "../../utils/DateUtils";
import { initFcn } from "../../utils/ObjectUtils";
import { renderFormGroup } from "../basicUi/CommonInputElements";
import MyButton from "../basicUi/MyButton";

type Props = {
    name: string,
    label?: string,
    placeholder?: string,
    disabled?: boolean,
    defaultValue?: number,
    isValid?: boolean,
    onChange?: (value: number) => any,
    highlightValidity?: boolean
};

function TimeAmountInput({
    name,
    label = "",
    placeholder = "",
    disabled = false,
    defaultValue,
    isValid,
    onChange = initFcn<number>(),
    highlightValidity = false
}: Props) {

    const VALUE_MIN = 0;
    const HOURS_MAX = 99;
    const MINUTES_MAX = 59;
    const ERROR_CLASS = "is-invalid"
    const NO_ERROR_CLASS = "is-valid"

    const inputRef = useRef<HTMLInputElement>(null);
    const [hours, setHours] = useState(0)
    const [minutes, setMinutes] = useState(0)

    const { t } = useTranslation();

    useEffect(() => {
        onChange(hours * 60 + minutes)
    }, [hours, minutes])

    useEffect(() => {
        setHours(Math.floor((defaultValue || 0) / 60));
        setMinutes((defaultValue || 0) % 60);
    }, [defaultValue])

    useEffect(() => {
        if (highlightValidity) {
            if (isValid) {
                inputRef.current?.classList.add(NO_ERROR_CLASS)
                inputRef.current?.classList.remove(ERROR_CLASS)
            } else {
                inputRef.current?.classList.add(ERROR_CLASS)
                inputRef.current?.classList.remove(NO_ERROR_CLASS)
            }
        }
    }, [isValid])

    const incHours = () => { updateHours(1) }
    const decHours = () => { updateHours(-1) }
    const incMinutes = () => { updateMinutes(1) }
    const decMinutes = () => { updateMinutes(-1) }

    function updateHours(value: number) {
        setHours(currentHours => getValidValue(currentHours + value, HOURS_MAX));
    }

    function updateMinutes(value: number) {
        setMinutes(currentMinutes => getValidValue(currentMinutes + value, MINUTES_MAX));
    }

    function getValidValue(value: number, max: number) {
        if (value > max) {
            return max;
        } else if (value < VALUE_MIN) {
            return VALUE_MIN;
        }
        return value;
    }

    function getInputValue() {
        return addZeroIfNeeded(hours) + ":" + addZeroIfNeeded(minutes);
    }

    return renderFormGroup(name, label, renderControl, "mb-3 time-amount-input");

    function renderControl() {
        return (
            <Stack direction="horizontal">
                <Form.Control
                    placeholder={placeholder}
                    disabled
                    value={getInputValue()}
                    ref={inputRef}
                />
                {renderClockButton()}
            </Stack>
        );
    }

    function renderClockButton() {
        const iconClass = "info-icon" + (disabled ? " disabled" : "");
        return (
            <OverlayTrigger
                trigger="click"
                placement="bottom"
                overlay={renderTimePicker()}
                rootClose
            >
                <div>
                    <FaRegClock className={iconClass} />
                </div>
            </OverlayTrigger>
        );
    }

    function renderTimePicker() {
        return (
            <Popover className="time-amount-input-picker-popover">
                <Popover.Header as="h3">{t("p.timeAmountPickerHeader")}</Popover.Header>
                <Popover.Body>
                    {renderTimePickerBody()}
                </Popover.Body>
            </Popover>
        );
    }

    function renderTimePickerBody() {
        return (
            <Stack direction="horizontal">
                {renderValuePicker(addZeroIfNeeded(hours), HOURS_MAX, incHours, decHours, setHours)}
                <span> : </span>
                {renderValuePicker(addZeroIfNeeded(minutes), MINUTES_MAX, incMinutes, decMinutes, setMinutes)}
            </Stack>
        );
    }

    function renderValuePicker(value: string, max: number, onUp: () => void, onDown: () => void, onChange: (value: number) => void) {
        const onValueChange = (event: any) => onChange(getValidValue(Number(event.target.value) || 0, max))
        return (
            <Stack className="justify-content-center value-picker">
                <MyButton.Secondary onClick={onUp}><FaAngleUp /></MyButton.Secondary>
                <Form.Control onChange={onValueChange} value={value} className="mx-auto" />
                <MyButton.Secondary onClick={onDown}><FaAngleDown /></MyButton.Secondary>
            </Stack>
        );
    }
}

export default TimeAmountInput;