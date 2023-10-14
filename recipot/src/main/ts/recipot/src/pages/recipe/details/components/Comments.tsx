import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import MyButton from "../../../../components/basicUi/MyButton";
import CommentsForm from "./CommentsForm";
import { Comment, Recipe } from "../../../../data/types";
import opinionsApi from "../../../../api/OpinionsApi";
import { UsersContext } from "../../../../context/UserContext";
import MyHeader from "../../../../components/basicUi/MyHeader";
import useAlerts from "../../../../hooks/useAlerts";
import { initFormSave } from "../../../../utils/FormInputUtils";
import useMyNav from "../../../../hooks/useMyNav";
import SingleComment from "./SingleComment";

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
    const nav = useMyNav();
    const user = useContext(UsersContext);

    const formSave = initFormSave<Comment>();
    const areCommentsEmpty = () => (!user && (!opinions || opinions.length === 0));

    useEffect(() => {
        setIsEditModeOn(true);
        if (user) {
            getUserOpinion();
        }
    }, [user, opinions])

    formSave.onSubmit = function (formValue: any) {
        let recipeObj = { recipe: { id: recipe.id } };
        createComment(formValue, recipeObj);
        createRating(formValue, recipeObj);
    }

    function createComment(formValue: any, recipeObj: any) {
        if (formValue.content !== "") {
            let commentObj: any = { ...recipeObj, content: formValue.content };
            opinionsApi.createComment(commentObj, (response) => {
                alerts.showSuccessAlert(t('p.commentAddSuccess'));
                getOpinions(recipe.id);
            });
        }
    }

    function createRating(formValue: any, recipeObj: any) {
        if (formValue.value !== 0) {
            let ratingObj: any = { ...recipeObj, value: formValue.value };
            opinionsApi.createRating(ratingObj, (response) => {
                alerts.showSuccessAlert(t('p.ratingAddSuccess'));
                getOpinions(recipe.id);
            });
        }
    }

    function getUserOpinion() {
        let opinion = opinions.filter((opinion: any) => opinion.authorLogin === user?.login);
        opinion = opinion.length > 0 ? opinion[0] : null;
        setUserOpinion(opinion);
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
                {opinions.map(renderComment)}
            </>
        )
    }

    function renderComment(comment: any, index: number) {
        return <SingleComment key={index} comment={comment} />
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


