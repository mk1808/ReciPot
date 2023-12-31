import { useEffect, useState } from 'react';
import { Stack, Row, Col } from 'react-bootstrap';
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";

import { renderFormGroup } from './CommonInputElements';
import { initFcn } from '../../utils/ObjectUtils';

type Props = {
    name: string,
    label?: string,
    disabled?: boolean,
    onChange?: (value: number) => any,
    defaultValue?: number,
    required?: boolean,
    isValid?: boolean,
    scope?: number
};

function StarSelectInput({
    name,
    label = "",
    disabled = false,
    defaultValue = 0,
    required = false,
    onChange = initFcn(),
    isValid = true,
    scope = 5
}: Props) {

    const [inputValue, setInputValue] = useState(defaultValue);
    const [currentValue, setCurrentValue] = useState(defaultValue);

    useEffect(() => {
        setInputValue(defaultValue)
        setCurrentValue(defaultValue);
    }, [defaultValue])

    useEffect(() => {
        onChange(inputValue)
    }, [inputValue])

    function getStarsIndexes() {
        return Array.from(Array(scope).keys());
    }

    function onMouseLeave() {
        changeCurrentValue(inputValue);
    }

    function onConfirmInputValue() {
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

    return renderFormGroup(name, label, renderStars, getClass());

    function renderStars() {
        return (
            <Stack
                direction='horizontal'
                onMouseLeave={onMouseLeave}
                onClick={onConfirmInputValue}
                gap={1}
            >
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
                    <Col onMouseEnter={() => changeCurrentValue(index + 0.5)} />
                    <Col onMouseEnter={() => changeCurrentValue(index + 1)} />
                </Row>
            </div>
        );
    }

    function renderStarIcon(index: number) {
        const starValue = index + 1;
        if (currentValue >= starValue) {
            return < BsStarFill className='gold' />;
        } else if (currentValue === starValue - 0.5) {
            return <BsStarHalf className='gold' />;
        }
        return <BsStar />;
    }
}


export default StarSelectInput;