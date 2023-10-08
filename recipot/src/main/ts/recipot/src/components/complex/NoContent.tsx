import './styles.scss';
import { useTranslation } from "react-i18next";
import { GiKnifeFork } from "react-icons/gi";

type Props = { text: string };

function NoContent({
    text
}: Props) {

    const { t } = useTranslation();
    return (
        <div className="text-center no-content">
            <GiKnifeFork />
            <h2>{t("p.noData")}</h2>
            <h3>{text}</h3>
        </div>
    );
}

export default NoContent;