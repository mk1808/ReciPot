import React, { useState, useEffect } from "react";
import { Stack } from "react-bootstrap";
import MyButton from "../basicUi/MyButton";
import RecipeCard from "./RecipeCard";

function SlidingCards({ recipes, getSingleCard, recipeCallback }: any) {

    const SLIDER_SIZE = 3;
    const [counter, setCounter] = useState(0);
    const [readyRecipes, setReadyRecipes] = useState<any[] | undefined>([]);

    //  const [slicedTab, setSlicedTab] = useState<any[] | undefined>([]);
    // const [photos, setPhotos] = useState(photos1);
    const sliceTab = () => {
        if (counter > -1 && counter < 5) {
            var slicedRecipes = [...recipes].slice(counter, counter + SLIDER_SIZE);
            setReadyRecipes(slicedRecipes);
            //   var sliced = [...tab].slice(counter, counter + SLIDER_SIZE);
            //   setSlicedTab(sliced);
            //   var slicedP = [...photos1].slice(counter, counter + SLIDER_SIZE);
            //   setPhotos(slicedP);
        }
    };
    const clickSlide = (counterValue: number) => {
        setCounter(counterValue);
        sliceTab();
    }


    useEffect(() => {
        sliceTab();
    }, [counter]);

    return (
        <>
            <Stack direction="horizontal" >
                <MyButton.Primary onClick={() => clickSlide(counter == 0 ? 0 : counter - 1)}>
                    &#10094;
                </MyButton.Primary>

                {readyRecipes?.map((element, index) => { return getSingleCard(element, index) })}

                <MyButton.Primary onClick={() => clickSlide(counter == 4 ? 4 : counter + 1)}>
                    &#10095;
                </MyButton.Primary>

            </Stack>
        </>
    );
}

function SlidingElements() {
    const recipe = {
        id: "osidj-oeifj-9239",
        name: "name",
        averageRating: 4.5,
        ratingsCount: 110,
        categories: ["Obiady", "Zupy"],
        tags: ["Obiady", "Zupy", "Zdrowe"],
        description: "Some quick example text to build on the card title and make up the bulk of the card's content.",
        photo: "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22286%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20286%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_189cc491e6b%20text%20%7B%20fill%3A%23999%3Bfont-weight%3Anormal%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_189cc491e6b%22%3E%3Crect%20width%3D%22286%22%20height%3D%22180%22%20fill%3D%22%23373940%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22107.1953125%22%20y%3D%2296.3%22%3E286x180%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"
    };
    const getRecipe = (num: number) => { let nr = { ...recipe }; nr.name += (' ' + num); return nr }
    const recipes = [getRecipe(1), getRecipe(2), getRecipe(3), getRecipe(4), getRecipe(5), getRecipe(6), getRecipe(7)];
    const tab: any = ["card1", "card2", "card3", "card4", "card5", "card6", "card7"];
    const photos1: any = [
        `https://picsum.photos/id/1/200/300`,
        `https://picsum.photos/id/5/200/300`,
        `https://picsum.photos/id/10/200/300`,
        `https://picsum.photos/id/20/200/300`,
        `https://picsum.photos/id/40/200/300`,
        `https://picsum.photos/id/55/200/300`,
        `https://picsum.photos/id/66/200/300`];

    const recipeCallback = (recipe: any, index: number) => {
        console.log("from callback" + index)
    }

    const getSingleCard = (element: any, index: number) => {
        return <RecipeCard className="mt-5" recipe={element} recipeCallback={recipeCallback}></RecipeCard >
    }

    return (
        <div className="mt-5">
            <SlidingCards recipes={recipes} getSingleCard={getSingleCard} recipeCallback={recipeCallback}></SlidingCards>
        </div>
    );
}

export default SlidingElements;