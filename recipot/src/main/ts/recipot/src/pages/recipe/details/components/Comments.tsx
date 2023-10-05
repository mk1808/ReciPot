import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import MyTextarea from "../../../../components/basicUi/MyTextarea";
import MyButton from "../../../../components/basicUi/MyButton";
import { Card, Stack } from "react-bootstrap";
import MyImage from "../../../../components/basicUi/MyImage";
import { BsStarFill } from "react-icons/bs";
import StarSelectInput from "../../../../components/basicUi/StarSelectInput";
import CommentsForm from "./CommentsForm";
import { FormSave } from "../../../../data/utilTypes";
import { getEmptyFormSave } from "../../../../utils/FormInputUtils";
import { format } from "../../../../utils/DateUtils";
import { Recipe } from "../../../../data/types";
import opinionsApi from "../../../../api/OpinionsApi";
import { showSuccessAlert } from "../../../../utils/RestUtils";
import { AlertsDispatchContext } from "../../../../context/AlertContext";
import { UsersContext } from "../../../../context/UserContext";
import { useNavigate } from "react-router-dom";

function Comments({ opinions, recipe, getOpinions }: { opinions: any[], recipe: Recipe, getOpinions: any }) {
    const { t } = useTranslation();
    const isNotePresent = false;
    const [isEditModeOn, setIsEditModeOn] = useState<any>(false);
    const [userOpinion, setUserOpinion] = useState<any>(false);
    const alertsDispatchContext = useContext(AlertsDispatchContext);
    const user = useContext(UsersContext).user;
    const navigate = useNavigate();

    useEffect(() => {
        setIsEditModeOn(true);
        if (user) {
            let opinion = opinions.filter((opinion: any) => opinion.authorLogin == user.login);
            opinion = opinion.length > 0 ? opinion[0] : null;
            setUserOpinion(opinion);
        }

    }, [user, opinions])
    const formSave: FormSave = getEmptyFormSave();
    formSave.onSubmit = function (formValue: any) {
        let recipeObj = { recipe: { id: recipe.id } };
        if (formValue.content != "") {
            let commentObj: any = { ...recipeObj, content: formValue.content };
            opinionsApi.createComment(commentObj, (response) => {
                showSuccessAlert(t('p.commentAddSuccess'), alertsDispatchContext);
                getOpinions(recipe.id);
            });
        }
        if (formValue.value != 0) {
            let ratingObj: any = { ...recipeObj, value: formValue.value };
            opinionsApi.createRating(ratingObj, (response) => {
                showSuccessAlert(t('p.ratingAddSuccess'), alertsDispatchContext);
                getOpinions(recipe.id);
            });
        }
    }

    function areCommentsEmpty() {
        return !user && (!opinions || opinions.length == 0);
    }

    return (
        <div className="mb-5 px-5 comments">
            <h4 className="my-3 display-4">{t('p.comments')}</h4>
            {user && renderForm()}
            {renderPageOfComments()}
            {areCommentsEmpty() && renderCommentsEmpty()}
        </div>
    )

    function renderForm() {
        return (
            <CommentsForm formSave={formSave} isEditModeOn={isEditModeOn} userOpinion={userOpinion}></CommentsForm>
        );
    }

    function renderPageOfComments() {
        return (<>
            {opinions.map((comment: any, index: number) => { return (renderComments(comment, index)); })}
        </>)
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
                                        <BsStarFill className="mb-1" /> {comment.rating ?? '-'}/5  &nbsp;
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
    function renderCommentsEmpty() {
        return (
            <div>
                <h3>{t('p.noCommentsPresents')}</h3>
                <br />

                <MyButton.Primary className="button-400" onClick={() => navigate('/login')}>
                    {t('p.login')}
                </MyButton.Primary>

            </div>
        )
    }
}

export default Comments;


