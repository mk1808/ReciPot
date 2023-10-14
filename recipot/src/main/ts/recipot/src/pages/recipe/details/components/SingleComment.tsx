import { useTranslation } from "react-i18next";
import { Card, Stack } from "react-bootstrap";
import MyImage from "../../../../components/basicUi/MyImage";
import { BsStarFill } from "react-icons/bs";
import { format } from "../../../../utils/DateUtils";
import defaultUserAvatar from '../../../../assets/images/default_user_avatar.png';

type Props = {
    comment: any
};

function SingleComment({
    comment
}: Props) {
    const { t } = useTranslation();
    return (
        <div className="mt-4 mb-5 single-comment">
            <Card>
                <Card.Body className="py-3 px-4">
                    <Stack direction="horizontal" gap={3}>
                        {renderAvatar(comment)}
                        {renderCommentContent(comment)}
                    </Stack>
                </Card.Body>
            </Card>
        </div>
    )

    function renderAvatar(comment: any) {
        return (
            <Stack direction="vertical">
                <MyImage src={comment.authorAvatarImageSrc ?? defaultUserAvatar} height={80} width={80} />
                <div>{comment.authorLogin}</div>
            </Stack>
        );
    }

    function renderCommentContent(comment: any) {
        return (
            <div className="content">
                <div className="mb-3">
                    {renderRatingAndDate(comment)}
                </div>
                {comment.comment ?? t('p.noComment')}
            </div>
        )
    }

    function renderRatingAndDate(comment: any) {
        return (
            <div className="h6">
                {`${t('p.rating')}: `}
                <BsStarFill className="mb-1" /> {`${comment.rating ?? '-'}/5 `}
                <div className="vr" />
                {` ${t('p.publishDate')}: ${format(comment.created)}`}
            </div>
        )
    }
}

export default SingleComment;