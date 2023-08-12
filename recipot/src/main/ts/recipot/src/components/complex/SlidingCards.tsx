import { useState, useEffect } from "react";
import { Stack } from "react-bootstrap";
import MyButton from "../basicUi/MyButton";
import RecipeCard from "./RecipeCard";
import { Recipe } from "../../data/types";
import { initFcn } from "../../utils/ObjectUtils";

function SlidingElements({ recipes, getSingleCard, recipeCallback, size = 3 }: any) {

    const [counter, setCounter] = useState(0);
    const [readyRecipes, setReadyRecipes] = useState<any[] | undefined>([]);
    const lastIndex = recipes.length - size;
    const sliceTab = () => {
        if (counter > -1 && counter <= lastIndex) {
            let slicedRecipes = [...recipes].slice(counter, counter + size);
            setReadyRecipes(slicedRecipes);
        }
    };
    const clickSlide = (counterValue: number) => {
        setCounter(counterValue);
    }

    useEffect(() => {
        sliceTab();
    }, [counter]);



    return (
        <>
            <Stack direction="horizontal" >
                <MyButton.Primary onClick={() => clickSlide(counter === 0 ? 0 : counter - 1)}>
                    &#10094;
                </MyButton.Primary>

                {renderContent()}

                <MyButton.Primary onClick={() => clickSlide(counter === lastIndex ? lastIndex : counter + 1)}>
                    &#10095;
                </MyButton.Primary>

            </Stack>
        </>
    );

    function renderContent() {
        return (
            <>
                {readyRecipes?.map((element, index) => { return getSingleCard(element, index) })}
            </>
        )
    }
}

function SlidingCards({ recipes = [], recipeCallbackForSlider = initFcn<Recipe>() }: { recipes: Recipe[], recipeCallbackForSlider: Function }) {

    const getSingleCard = (element: any, index: number) => {
        return <RecipeCard className="mt-5" key={index} recipe={element} recipeCallback={recipeCallbackForSlider}></RecipeCard >
    }

    return (
        <div className="mt-5">
            <SlidingElements recipes={recipes} getSingleCard={getSingleCard} recipeCallback={recipeCallbackForSlider}></SlidingElements>
        </div>
    );
}

export default SlidingCards;