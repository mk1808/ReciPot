import { useMemo } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { FaInternetExplorer } from "react-icons/fa6";
import { GiCookingPot } from "react-icons/gi";
import { MdAccessTime, MdWork } from "react-icons/md";
import { VscTools } from "react-icons/vsc";

import HashTagList from "../../../../components/basicUi/HashTagList";
import Info from "../../../../components/basicUi/Info";
import { Recipe } from "../../../../data/types";
import useMyNav from "../../../../hooks/useMyNav";
import { convertToTime } from "../../../../utils/DateUtils";

type Props = {
    recipe: Recipe
};

function BasicInfo({
    recipe
}: Props) {

    const { t } = useTranslation();
    const nav = useMyNav();
    const detailsColumns = useMemo(getDetailsColumns, [recipe]);

    function onHashTagClick(hashTag: any) {
        nav.goToFilters({ hashTags: [{ label: hashTag.name, value: hashTag }] });
    }

    function getDetailsColumns() {
        return [
            {
                tooltip: "timeInfo",
                icon: (className: string) => <MdAccessTime className={className} />,
                label: "time",
                value: `${convertToTime(recipe.timeAmount)}`
            }, {
                tooltip: "amountOfDishesInfo",
                icon: (className: string) => <GiCookingPot className={className} />,
                label: "amountOfDishes",
                value: t(`enums.RecipeAmountOfDishes.${recipe.numberOfDishes}`)
            }, {
                tooltip: "effortInfo",
                icon: (className: string) => <MdWork className={className} />,
                label: "effort",
                value: t(`enums.RecipeRequiredEffort.${recipe.requiredEffort}`)
            }, {
                tooltip: "difficultyInfo",
                icon: (className: string) => <VscTools className={className} />,
                label: "difficulty",
                value: t(`enums.RecipeDifficulty.${recipe.difficulty}`)
            }
        ];
    }

    return (
        <>
            <div className="mt-3 mb-5 px-5 basic-info">
                {renderOtherInfo()}
                {renderDetailsRow()}
            </div>
            <hr />
        </>
    );

    function renderOtherInfo() {
        return (
            <div className="mb-5">
                {recipe.hashTags && recipe.hashTags.length > 0 && <HashTagList hashTags={recipe.hashTags} onClick={onHashTagClick} />}
                {renderUrlButton()}
                <div className="my-4 description">
                    {recipe.description}
                </div>
            </div>
        );
    }

    function renderDetailsRow() {
        return (
            <Row className="mb-5 align-center icon-info">
                {renderDetailsColumn()}
            </Row>
        );
    }

    function renderDetailsColumn() {
        return detailsColumns.map(detailsColumn => (
            <Col className="icon-col" xs={6} md={3} key={detailsColumn.label}>
                {renderSingleInfoIcon(detailsColumn)}
            </Col>
        ));
    }

    function renderSingleInfoIcon({ tooltip, icon, label, value }: { tooltip: any, icon: any, label: any, value: any }) {
        return (
            <>
                <Info
                    value={t(`p.${tooltip}`)}
                    className="icon"
                    renderIcon={icon}
                    placement="top"
                />
                <br />
                <strong> {t(`p.${label}`)} </strong>
                <br />
                {value}
            </>
        );
    }

    function renderUrlButton() {
        return recipe.url && (
            <div className="text-center my-3">
                <Button href={recipe.url} target="_blank">{t(`p.recipeUrlButton`)}
                    <FaInternetExplorer />
                </Button>
            </div>
        );
    }
}

export default BasicInfo;