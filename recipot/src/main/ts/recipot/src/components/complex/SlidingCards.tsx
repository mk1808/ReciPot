import { useState, useEffect } from "react";
import { Stack } from "react-bootstrap";
import MyButton from "../basicUi/MyButton";
import RecipeCard from "./RecipeCard";
import { Recipe } from "../../data/types";
import useWindowSize from "../../hooks/useWindowSize";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

type SlidingElementsProps = {
    recipes: Recipe[],
    getSingleElement: (recipe: Recipe, index: number) => any,
    size: number
};

function SlidingElements({
    recipes,
    getSingleElement,
    size
}: SlidingElementsProps) {

    const [counter, setCounter] = useState(0);
    const [slicedRecipes, setSlicedRecipes] = useState<any[] | undefined>([]);
    const lastIndex = recipes.length - size;

    useEffect(() => {
        sliceTab();
    }, [counter, recipes, size]);

    function onClickSlide(counterValue: number) {
        setCounter(counterValue);
    };

    function sliceTab() {
        if (counter > -1 && counter <= lastIndex) {
            let mySlicedRecipes = [...recipes].slice(counter, counter + size);
            setSlicedRecipes(mySlicedRecipes);
        }
    };

    return (
        <Stack direction="horizontal" className="justify-content-center">
            <MyButton.Primary onClick={() => onClickSlide(counter === 0 ? 0 : counter - 1)}>
                <FaChevronLeft />
            </MyButton.Primary>

            {renderContent()}

            <MyButton.Primary onClick={() => onClickSlide(counter === lastIndex ? lastIndex : counter + 1)}>
                <FaChevronRight />
            </MyButton.Primary>
        </Stack>
    );

    function renderContent() {
        return (
            <>
                {slicedRecipes?.map((element, index) => { return getSingleElement(element, element.id) })}
            </>
        )
    }
}


type SlidingCardsProps = {
    recipes: Recipe[],
    onGoToRecipe: (value: Recipe, event?: any) => any
};

function SlidingCards({
    recipes,
    onGoToRecipe
}: SlidingCardsProps) {

    const [width] = useWindowSize();

    function getSliderSize() {
        return width > 1550 ? 5 : width > 1000 ? 3 : (width > 720 ? 2 : 1);
    }

    function renderSingleCard(recipe: Recipe, key: number) {
        return <RecipeCard key={key} recipe={recipe} onGoToRecipe={onGoToRecipe} />
    }

    return (
        <div className="mt-4 mb-5">
            <SlidingElements recipes={recipes} getSingleElement={renderSingleCard} size={getSliderSize()} />
        </div>
    );
}

export default SlidingCards;