import { Form, Stack, Row, Col } from 'react-bootstrap';
import { initFcn } from '../../utils/ObjectUtils';
import { useEffect, useState } from 'react';
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";

function StarSelectInput({
    name = "inputName",
    label = "",
    disabled = false,
    defaultValue = 0,
    required = false,
    onChange = initFcn<any>(),
    isValid = true,
    scope = 5
}: {
    name: string,
    label?: string,
    disabled?: boolean,
    onChange?: Function,
    defaultValue?: number,
    required?: boolean,
    isValid?: boolean,
    scope?: number
}) {
    const [inputValue, setInputValue] = useState(defaultValue);
    const [currentValue, setCurrentValue] = useState(defaultValue);

    useEffect(() => { onChange(inputValue) }, [inputValue])

    function getStarsIndexes() {
        return Array.from(Array(scope).keys());
    }

    function onMouseLeave() {
        changeCurrentValue(inputValue);
    }

    function confirmInputValue() {
        setInputValue(currentValue);
    }

    function changeCurrentValue(value: number) {
        if (!disabled) {
            setCurrentValue(value);
        }
    }

    function getClass() {
        let classNames = "mb-3 star-select-input";
        if (disabled) {
            classNames += " disabled"
        }
        if ((required && inputValue === 0) || !isValid) {
            classNames += " error"
        }
        return classNames;
    }

    return (
        <Form.Group className={getClass()} controlId={name}>
            {label && <Form.Label>{label}</Form.Label>}
            {renderStars()}
        </Form.Group>
    )

    function renderStars() {
        return (
            <Stack direction='horizontal' onMouseLeave={onMouseLeave} onClick={confirmInputValue} gap={1}>
                {renderZeroSpace()}
                {getStarsIndexes().map(renderStar)}
            </Stack>
        )
    }

    function renderZeroSpace() {
        return <span onMouseEnter={() => changeCurrentValue(0)}>&nbsp;&nbsp;</span>;
    }

    function renderStar(index: number) {
        return (
            <div className='star-container' key={index}>
                {renderStarIcon(index)}
                <Row className='star-hover g-0' >
                    <Col onMouseEnter={() => changeCurrentValue(index + 0.5)}></Col>
                    <Col onMouseEnter={() => changeCurrentValue(index + 1)}></Col>
                </Row>
            </div>
        )
    }

    function renderStarIcon(index: number) {
        const starValue = index + 1
        if (currentValue >= starValue) {
            return < BsStarFill className='gold' />;
        } else if (currentValue === starValue - 0.5) {
            return <BsStarHalf className='gold' />;
        }
        return <BsStar />;
    }
}


export default StarSelectInput;