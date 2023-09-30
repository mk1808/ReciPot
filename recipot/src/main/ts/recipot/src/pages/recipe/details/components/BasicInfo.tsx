import { Button, Col, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Recipe } from "../../../../data/types";
import MyButton from "../../../../components/basicUi/MyButton";
import { FaPlus } from "react-icons/fa6";
import { useState } from "react";
import { MdAccessTime, MdWork } from "react-icons/md";
import { GiCookingPot } from "react-icons/gi";
import { VscTools } from "react-icons/vsc";
import { FaInternetExplorer } from "react-icons/fa6";
import Info from "../../../../components/basicUi/Info";
import HashTagList from "../../../../components/basicUi/HashTagList";
import { convertToTime } from "../../../../utils/DateUtils";

function BasicInfo({ recipe }: { recipe: Recipe }) {
    const { t } = useTranslation();
    return (
        <div className="mt-3 mb-5 px-5 basic-info">
            {recipe.hashTags && recipe.hashTags.length > 0 && <HashTagList hashTags={recipe.hashTags} />}
            {renderUrlButton()}
            <div className="my-4">
                {recipe.description}
            </div>
            <Row className="mb-5">
                <Col>
                    <Row className="align-center icon-info ">
                        <Col className="icon-col" xs={6} md={3}>
                            {renderSingleInfoIcon({
                                tooltip: "timeInfo",
                                icon: (className: string) => <MdAccessTime className={className} />,
                                label: "time",
                                value: `${convertToTime(recipe.timeAmount)}`
                            })}
                        </Col>
                        <Col className="icon-col" xs={6} md={3}>
                            {renderSingleInfoIcon({
                                tooltip: "amountOfDishesInfo",
                                icon: (className: string) => <GiCookingPot className={className} />,
                                label: "amountOfDishes",
                                value: t(`enums.RecipeAmountOfDishes.${recipe.numberOfDishes}`)
                            })}

                        </Col>
                        <Col className="icon-col" xs={6} md={3}>
                            {renderSingleInfoIcon({
                                tooltip: "effortInfo",
                                icon: (className: string) => <MdWork className={className} />,
                                label: "effort",
                                value: t(`enums.RecipeRequiredEffort.${recipe.requiredEffort}`)
                            })}

                        </Col>
                        <Col className="icon-col" xs={6} md={3}>
                            {renderSingleInfoIcon({
                                tooltip: "difficultyInfo",
                                icon: (className: string) => <VscTools className={className} />,
                                label: "difficulty",
                                value: t(`enums.RecipeDifficulty.${recipe.difficulty}`)
                            })}

                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )

    function renderSingleInfoIcon({ tooltip, icon, label, value }: { tooltip: any, icon: any, label: any, value: any }) {
        return (
            <>
                <Info value={t(`p.${tooltip}`)} className="icon" renderIcon={icon} /><br />
                <strong> {t(`p.${label}`)}</strong> <br />
                {value}
            </>
        )
    }

    function renderUrlButton() {
        return recipe.url && (
            <div className="text-center my-3">
                <Button href={recipe.url} target="_blank">{t(`p.recipeUrlButton`)} <FaInternetExplorer /></Button>
            </div>
        )
    }
}

export default BasicInfo;