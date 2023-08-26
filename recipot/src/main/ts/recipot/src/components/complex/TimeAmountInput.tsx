import { initFcn } from "../../utils/ObjectUtils";
import Form from 'react-bootstrap/Form';
import { FaRegClock, FaAngleUp, FaAngleDown } from "react-icons/fa6";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { Stack } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import MyButton from "../basicUi/MyButton";
import { useEffect, useState } from "react";
import './styles.scss';

function TimeAmountInput({
    name = "",
    label = "",
    placeholder = "",
    disabled = false,
    onChange = initFcn<number>(),
    defaultValue
}: {
    name: string,
    label?: string,
    placeholder?: string,
    disabled?: boolean,
    onChange?: Function,
    defaultValue?: number
}) {
    const VALUE_MIN = 0;
    const HOURS_MAX = 99;
    const MINUTES_MAX = 59;

    const [hours, setHours] = useState(Math.floor((defaultValue || 0) / 60))
    const [minutes, setMinutes] = useState((defaultValue || 0) % 60)

    const { t } = useTranslation();

    useEffect(() => {
        onChange(hours * 60 + minutes)
    }, [hours, minutes])

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
        return getAsTwoDigits(hours) + ":" + getAsTwoDigits(minutes);
    }

    function getAsTwoDigits(value: number): string {
        if (value < 10) {
            return '0' + value;
        }
        return String(value);
    }

    return (
        <Form.Group className="mb-3 time-amount-input" controlId={name}>
            {label && <Form.Label>{label}</Form.Label>}
            <Stack direction="horizontal">
                <Form.Control placeholder={placeholder} disabled={true} value={getInputValue()} />
                {renderClockButton()}
            </Stack>
        </Form.Group>
    );

    function renderClockButton() {
        const iconClass = "info-icon" + (disabled ? " disabled" : "");
        return (
            <OverlayTrigger trigger="click" placement="bottom" overlay={renderTimePicker()} rootClose>
                <div><FaRegClock className={iconClass} /></div>
            </OverlayTrigger>
        );
    }

    function renderTimePicker() {
        const incHours = () => { updateHours(1) }
        const decHours = () => { updateHours(-1) }
        const incMinutes = () => { updateMinutes(1) }
        const decMinutes = () => { updateMinutes(-1) }

        return (
            <Popover className="time-amount-input-picker-popover">
                <Popover.Header as="h3">{t("p.timeAmountPickerHeader")}</Popover.Header>
                <Popover.Body>
                    <Stack direction="horizontal">
                        {renderValuePicker(getAsTwoDigits(hours), HOURS_MAX, incHours, decHours, setHours)}
                        <span> : </span>
                        {renderValuePicker(getAsTwoDigits(minutes), MINUTES_MAX, incMinutes, decMinutes, setMinutes)}
                    </Stack>
                </Popover.Body>
            </Popover>
        );
    }

    function renderValuePicker(value: string, max: number, callbackUp: () => void, callbackDown: () => void, callbackInput: (value: number) => void) {
        const onChange = (event: any) => callbackInput(getValidValue(Number(event.target.value) || 0, max))
        return (
            <Stack className="justify-content-center value-picker">
                <MyButton.Secondary onClick={callbackUp}><FaAngleUp /></MyButton.Secondary>
                <Form.Control onChange={onChange} value={value} className="mx-auto" />
                <MyButton.Secondary onClick={callbackDown}><FaAngleDown /></MyButton.Secondary>
            </Stack>
        );
    }
}

export default TimeAmountInput;