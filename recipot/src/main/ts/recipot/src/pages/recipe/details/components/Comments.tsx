import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import MyTextarea from "../../../../components/basicUi/MyTextarea";
import MyButton from "../../../../components/basicUi/MyButton";
import { Card, Stack } from "react-bootstrap";
import MyImage from "../../../../components/basicUi/MyImage";
import { AiFillStar } from "react-icons/ai";
import StarSelectInput from "../../../../components/basicUi/StarSelectInput";

function Comments() {
    const { t } = useTranslation();
    const isNotePresent = false;
    const [isEditModeOn, setIsEditModeOn] = useState<any>(false);
    const content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut consectetur sem ut nisl bibendum, sed iaculis sem accumsan. Phasellus viverra malesuada tincidunt."
    const comments: any[] = [1, 2];
    useEffect(() => {
        setIsEditModeOn(!isNotePresent);
    }, [])
    function onSaveClick() {
        console.log("btnz");
        setIsEditModeOn(!isEditModeOn);
    }
    return (
        <div className="mb-5 px-5 comments">
            <h4 className="my-3 display-4">{t('p.comments')}</h4>
            {renderTextArea()}
            {renderButton()}
            {renderPageOfComments()}
        </div>
    )
    function renderTextArea() {
        return (
            <div className="field">
                <MyTextarea
                    required={false}
                    isValid={true}
                    name="note"
                    label=""
                    placeholder={t('p.addComment')}
                    rows={5}
                    onChange={(value: string) => console.log(value)}
                    disabled={!isEditModeOn} />
            </div>
        )
    }
    function renderButton() {
        return (
            <Stack direction="horizontal" className="stars-button">
                <StarSelectInput required={true} isValid={true} name="rating" label={t('p.addRating')} onChange={(value: number) => console.log(value)} defaultValue={0} />
                <MyButton.Primary onClick={onSaveClick} className="button-400 save-btn" disabled={false}>
                    {t('p.saveComment')}
                </MyButton.Primary>
            </Stack>
        )
    }
    function renderPageOfComments() {
        return <>
            {comments.map((comment: any, index: number) => { return (renderComments(comment, index)); })}
        </>
    }
    function renderComments(comment: any, index: number) {
        return (
            <div className="my-5 single-comment" key={index}>
                <Card>
                    <Card.Body className="py-3 px-4">
                        <Stack direction="horizontal" className="" gap={3}>
                            <div>{renderAvatar()}</div>
                            <div className="content">
                                <div className="mb-3">
                                    <div className="h6">
                                        Ocena:&nbsp;
                                        <AiFillStar /> {4}/5  &nbsp;
                                        <div className="vr"></div>
                                        &nbsp;Data opublikowania:&nbsp;27.08.2023
                                    </div>
                                </div>
                                {content}
                            </div>
                        </Stack>
                    </Card.Body>
                </Card>
            </div>
        )
    }
    function renderAvatar() {
        return (
            <Stack direction="vertical" className="">
                <MyImage src={"https://cdn-icons-png.flaticon.com/512/1077/1077114.png"} height={80} />
                <div className="">Nazwa uzytkownika</div>
            </Stack>
        );

    }
}

export default Comments;


