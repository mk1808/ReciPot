import { useState, useEffect } from "react";
import { Stack } from "react-bootstrap";
import MyButton from "../basicUi/MyButton";
import RecipeCard from "./RecipeCard";

function SlidingCards({ recipes, getSingleCard, recipeCallback }: any) {

    const SLIDER_SIZE = 3;
    const lastIndex=recipes.length-SLIDER_SIZE;
    const [counter, setCounter] = useState(0);
    const [readyRecipes, setReadyRecipes] = useState<any[] | undefined>([]);
    const sliceTab = () => {
        if (counter > -1 && counter <= lastIndex) {
            var slicedRecipes = [...recipes].slice(counter, counter + SLIDER_SIZE);
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

function SlidingElements({ recipes, recipeCallbackForSlider }: any) {

    const getSingleCard = (element: any, index: number) => {
        return <RecipeCard className="mt-5" key={index} recipe={element} recipeCallback={recipeCallbackForSlider}></RecipeCard >
    }

    return (
        <div className="mt-5">
            <SlidingCards recipes={recipes} getSingleCard={getSingleCard} recipeCallback={recipeCallbackForSlider}></SlidingCards>
        </div>
    );
}

export default SlidingElements;