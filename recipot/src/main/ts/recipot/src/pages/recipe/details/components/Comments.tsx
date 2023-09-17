import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import MyTextarea from "../../../../components/basicUi/MyTextarea";
import MyButton from "../../../../components/basicUi/MyButton";
import { Card, Stack } from "react-bootstrap";
import MyImage from "../../../../components/basicUi/MyImage";
import { AiFillStar } from "react-icons/ai";
import StarSelectInput from "../../../../components/basicUi/StarSelectInput";
import CommentsForm from "./CommentsForm";
import { FormSave } from "../../../../data/utilTypes";
import { getEmptyFormSave } from "../../../../utils/FormInputUtils";
import { format } from "../../../../utils/DateUtils";
import { Recipe } from "../../../../data/types";
import opinionsApi from "../../../../api/OpinionsApi";
import { showSuccessAlert } from "../../../../utils/RestUtils";
import { AlertsDispatchContext } from "../../../../context/AlertContext";

function Comments({ opinions, recipe }: { opinions: any[], recipe: Recipe }) {
    const { t } = useTranslation();
    const isNotePresent = false;
    const [isEditModeOn, setIsEditModeOn] = useState<any>(false);
    const alertsDispatchContext = useContext(AlertsDispatchContext);
    const content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut consectetur sem ut nisl bibendum, sed iaculis sem accumsan. Phasellus viverra malesuada tincidunt."
    useEffect(() => {
        setIsEditModeOn(!isNotePresent);
    }, [])
    const formSave: FormSave = getEmptyFormSave();
    formSave.onSubmit = function (formValue: any) {
        let recipeObj = { recipe: { id: recipe.id } };
        if (formValue.content != "") {
            let commentObj: any = { ...recipeObj, content: formValue.content };
            opinionsApi.createComment(commentObj, (response) => {
                showSuccessAlert(t('p.commentAddSuccess'), alertsDispatchContext);
            });
        }
        if (formValue.value != 0) {
            let ratingObj: any = { ...recipeObj, value: formValue.value };
            opinionsApi.createRating(ratingObj, (response) => {
                showSuccessAlert(t('p.ratingAddSuccess'), alertsDispatchContext);
            });
        }


        console.log("btnz");
        console.log(formValue)
        setIsEditModeOn(!isEditModeOn);
    }
    formSave.onSuccess = function () {

    }
    formSave.onError = function () {

    }
    return (
        <div className="mb-5 px-5 comments">
            <h4 className="my-3 display-4">{t('p.comments')}</h4>
            {renderForm()}
            {renderPageOfComments()}
        </div>
    )
    function renderForm() {
        return (
            <CommentsForm formSave={formSave} isEditModeOn={isEditModeOn}></CommentsForm>
        );
    }

    function renderPageOfComments() {
        return <>
            {opinions.map((comment: any, index: number) => { return (renderComments(comment, index)); })}
        </>
    }
    function renderComments(comment: any, index: number) {
        return (
            <div className="my-5 single-comment" key={index}>
                <Card>
                    <Card.Body className="py-3 px-4">
                        <Stack direction="horizontal" className="" gap={3}>
                            <div>{renderAvatar(comment)}</div>
                            <div className="content">
                                <div className="mb-3">
                                    <div className="h6">
                                        {t('p.rating')}:&nbsp;
                                        <AiFillStar /> {comment.rating ?? '-'}/5  &nbsp;
                                        <div className="vr"></div>
                                        &nbsp;{t('p.publishDate')}:&nbsp;{format(comment.created)}
                                    </div>
                                </div>
                                {comment.comment ?? t('p.noComment')}
                            </div>
                        </Stack>
                    </Card.Body>
                </Card>
            </div>
        )
    }
    function renderAvatar(comment: any) {
        return (
            <Stack direction="vertical">
                <MyImage src={comment.authorAvatarImageSrc ?? "https://cdn-icons-png.flaticon.com/512/1077/1077114.png"} height={80} width={80} />
                <div>{comment.authorLogin}</div>
            </Stack>
        );

    }
}

export default Comments;


