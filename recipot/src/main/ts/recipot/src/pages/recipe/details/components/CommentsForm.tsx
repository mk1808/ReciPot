import { useReducer, FormEvent } from "react";
import { Form, Stack } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import MyButton from "../../../../components/basicUi/MyButton";
import MyTextarea from "../../../../components/basicUi/MyTextarea";
import StarSelectInput from "../../../../components/basicUi/StarSelectInput";
import { Comment } from "../../../../data/types";
import { FormAction, FormSave, MyForm } from "../../../../data/utilTypes";
import { checkIfAllValid, checkInputValidity, initEmptyForm, getNewFormState, preventFurtherAction, inputAttrs } from "../../../../utils/FormInputUtils";

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

    function formReducer(state: any, action: FormAction) {
        return getNewFormState(state, action, checkInputValidity);
    }

    function onSubmit(event: FormEvent) {
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
                    {...inputAttrs({ name: "content", myForm, dispatchForm })}
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
                    {...inputAttrs({ name: "value", myForm, dispatchForm })}
                />
                <MyButton.Primary type="submit" className="button-400 save-btn" >
                    {t('p.saveComment')}
                </MyButton.Primary>
            </Stack>
        )
    }
}

export default CommentsForm;