import { useTranslation } from "react-i18next";
import { FormSave, MyForm } from "../../../../data/utilTypes";
import { useReducer } from "react";
import { checkIfAllValid, checkInputValidity, initEmptyForm, getNewState, inputAttributes, preventFurtherAction } from "../../../../utils/FormInputUtils";
import MyTextarea from "../../../../components/basicUi/MyTextarea";
import { Form, Stack } from "react-bootstrap";
import StarSelectInput from "../../../../components/basicUi/StarSelectInput";
import MyButton from "../../../../components/basicUi/MyButton";
import { Comment } from "../../../../data/types";

type Props = {
    formSave: FormSave<Comment>,
    isEditModeOn: boolean,
    userOpinion: any
};

function CommentsForm({
    formSave,
    isEditModeOn,
    userOpinion
}: Props) {

    const { t } = useTranslation();
    const [myForm, dispatchForm]: [MyForm, Function] = useReducer(formReducer, initEmptyForm());

    function formReducer(state: any, action: any) {
        return getNewState(state, action, action.value, checkInputValidity);
    }

    function onSubmit(event: any) {
        if (checkIfAllValid(event, myForm)) {
            formSave.onSubmit(myForm.formValue);
        }
        preventFurtherAction(event);
    };

    return (
        <Form noValidate validated onSubmit={onSubmit}>
            {renderTextArea()}
            {renderButton()}
        </Form>
    )

    function renderTextArea() {
        return (
            <div className="field">
                <MyTextarea
                    label=""
                    placeholder={t('p.addComment')}
                    rows={5}
                    disabled={!isEditModeOn}
                    defaultValue={(userOpinion && userOpinion.comment) || ""}
                    {...inputAttributes("content", myForm, dispatchForm)}
                />
            </div>
        )
    }
    
    function renderButton() {
        return (
            <Stack direction="horizontal" className="stars-button">
                <StarSelectInput
                    required
                    label={t('p.addRating')}
                    disabled={!isEditModeOn}
                    defaultValue={(userOpinion && userOpinion.rating) || 0}
                    {...inputAttributes("value", myForm, dispatchForm)}
                />
                <MyButton.Primary type="submit" className="button-400 save-btn" >
                    {t('p.saveComment')}
                </MyButton.Primary>
            </Stack>
        )
    }
}

export default CommentsForm;