import { Stack } from 'react-bootstrap';
import './styles.scss';
import MyButton from './MyButton';
import { useTranslation } from 'react-i18next';
import { StackDirection } from 'react-bootstrap/esm/Stack';

function ConfirmCancelButtons({
    handleCancel,
    handleConfirm,
    buttonCancelText = 'p.cancel',
    buttonSubmitText = 'p.save',
    className,
    direction = "horizontal" }: {
        handleCancel: () => void,
        handleConfirm: () => void,
        buttonCancelText?: string,
        buttonSubmitText?: string,
        className?: string,
        direction?: StackDirection
    }) {
    const { t } = useTranslation();
    return (
        <Stack direction={direction} className={className}>
            <MyButton.Secondary onClick={handleCancel}>{t(buttonCancelText)} </MyButton.Secondary>
            <MyButton.Primary onClick={handleConfirm}>{t(buttonSubmitText)} </MyButton.Primary>
        </Stack>
    );
}

export default ConfirmCancelButtons;