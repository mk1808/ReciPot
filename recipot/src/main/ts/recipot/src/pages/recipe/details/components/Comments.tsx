import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import MyButton from "../../../../components/basicUi/MyButton";
import { Card, Stack } from "react-bootstrap";
import MyImage from "../../../../components/basicUi/MyImage";
import { BsStarFill } from "react-icons/bs";
import CommentsForm from "./CommentsForm";
import { format } from "../../../../utils/DateUtils";
import { Comment, Recipe } from "../../../../data/types";
import opinionsApi from "../../../../api/OpinionsApi";
import { UsersContext } from "../../../../context/UserContext";
import MyHeader from "../../../../components/basicUi/MyHeader";
import useAlerts from "../../../../hooks/useAlerts";
import { initFormSave } from "../../../../utils/FormInputUtils";
import useMyNav from "../../../../hooks/useMyNav";

type Props = {
    opinions: any[],
    recipe: Recipe,
    getOpinions: any
};

function Comments({
    opinions,
    recipe,
    getOpinions
}: Props) {

    const { t } = useTranslation();
    const [isEditModeOn, setIsEditModeOn] = useState<any>(false);
    const [userOpinion, setUserOpinion] = useState<any>(false);
    const alerts = useAlerts();
    const user = useContext(UsersContext);
    const nav = useMyNav();

    useEffect(() => {
        setIsEditModeOn(true);
        if (user) {
            let opinion = opinions.filter((opinion: any) => opinion.authorLogin === user?.login);
            opinion = opinion.length > 0 ? opinion[0] : null;
            setUserOpinion(opinion);
        }

    }, [user, opinions])
    const formSave = initFormSave<Comment>();
    formSave.onSubmit = function (formValue: any) {
        let recipeObj = { recipe: { id: recipe.id } };
        if (formValue.content !== "") {
            let commentObj: any = { ...recipeObj, content: formValue.content };
            opinionsApi.createComment(commentObj, (response) => {
                alerts.showSuccessAlert(t('p.commentAddSuccess'));
                getOpinions(recipe.id);
            });
        }
        if (formValue.value !== 0) {
            let ratingObj: any = { ...recipeObj, value: formValue.value };
            opinionsApi.createRating(ratingObj, (response) => {
                alerts.showSuccessAlert(t('p.ratingAddSuccess'));
                getOpinions(recipe.id);
            });
        }
    }

    function areCommentsEmpty() {
        return !user && (!opinions || opinions.length === 0);
    }

    return (
        <div className="mb-5 px-5 comments">
            <MyHeader title={t('p.comments')} level="3" dispLevel="4" className="mb-4" />
            {user && renderForm()}
            {renderPageOfComments()}
            {areCommentsEmpty() && renderCommentsEmpty()}
        </div>
    )

    function renderForm() {
        return <CommentsForm formSave={formSave} isEditModeOn={isEditModeOn} userOpinion={userOpinion} />
    }

    function renderPageOfComments() {
        return (
            <>
                {opinions.map((comment: any, index: number) => { return (renderComments(comment, index)); })}
            </>
        )
    }
    function renderComments(comment: any, index: number) {
        return (
            <div className="mt-4 mb-5 single-comment" key={index}>
                <Card>
                    <Card.Body className="py-3 px-4">
                        <Stack direction="horizontal" className="" gap={3}>
                            <div>{renderAvatar(comment)}</div>
                            <div className="content">
                                <div className="mb-3">
                                    <div className="h6">
                                        {t('p.rating')}:&nbsp;
                                        <BsStarFill className="mb-1" /> {comment.rating ?? '-'}/5  &nbsp;
                                        <div className="vr" />
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

                <MyButton.Primary className="button-400" onClick={nav.toLogin}>
                    {t('p.login')}
                </MyButton.Primary>
            </div>
        )
    }
}

export default Comments;


