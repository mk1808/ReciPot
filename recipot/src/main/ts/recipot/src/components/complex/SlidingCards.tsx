import React, { useState, useEffect } from "react";
import { Stack } from "react-bootstrap";
import MyButton from "../basicUi/MyButton";

function SlidingCards() {
    const SLIDER_SIZE = 3;
    const [counter, setCounter] = useState(0);
    const [slicedTab, setSlicedTab] = useState<any[] | undefined>([]);

    const tab: any = ["card1", "card2", "card3", "card4", "card5", "card6", "card7"];
    const photos1: any = [
        `https://picsum.photos/id/1/200/300`,
        `https://picsum.photos/id/5/200/300`,
        `https://picsum.photos/id/10/200/300`,
        `https://picsum.photos/id/20/200/300`,
        `https://picsum.photos/id/40/200/300`,
        `https://picsum.photos/id/55/200/300`,
        `https://picsum.photos/id/66/200/300`];
    const [photos, setPhotos] = useState(photos1);
    const sliceTab = () => {
        if (counter > -1 && counter < 5) {
            var sliced = [...tab].slice(counter, counter + SLIDER_SIZE);
            setSlicedTab(sliced);
            var slicedP = [...photos1].slice(counter, counter + SLIDER_SIZE);
            setPhotos(slicedP);
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
                
                {slicedTab?.map((element, index) => {
                    return <div className="width m-2" key={element}><h3>{element}</h3><img src={photos[index]} /></div>;
                })}

                <MyButton.Primary onClick={() => clickSlide(counter == 4 ? 4 : counter + 1)}>
                    &#10095;
                </MyButton.Primary>

            </Stack>
        </>
    );


}

export default SlidingCards;