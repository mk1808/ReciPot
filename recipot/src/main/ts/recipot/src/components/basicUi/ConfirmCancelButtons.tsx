import { Stack } from 'react-bootstrap';
import './styles.scss';
import MyButton from './MyButton';
import { useTranslation } from 'react-i18next';
import { StackDirection } from 'react-bootstrap/esm/Stack';

type Props = {
    onCancel: () => void,
    onConfirm: () => void,
    buttonCancelText?: string,
    buttonSubmitText?: string,
    submitButtonType?: string,
    direction?: StackDirection,
    className?: string
};

function ConfirmCancelButtons({
    onCancel,
    onConfirm,
    buttonCancelText = "p.cancel",
    buttonSubmitText = "p.save",
    submitButtonType = "button",
    direction = "horizontal",
    className = ""
}: Props) {

    const { t } = useTranslation();
    return (
        <Stack direction={direction} className={className}>
            <MyButton.Secondary onClick={onCancel} className="button-width">{t(buttonCancelText)} </MyButton.Secondary>
            <MyButton.Primary onClick={onConfirm} type={submitButtonType} className="button-width">{t(buttonSubmitText)} </MyButton.Primary>
        </Stack>
    );
}

export default ConfirmCancelButtons;