import React, { useState, useEffect } from "react";

function SlidingCards() {
    const [show, toggleShow] = useState(true);
    const [counter, setCounter] = useState(0);
    

    const [slicedTab, setSlicedTab] = useState<any[] | undefined>([]);
    function getRandomInt(max?:number|undefined) {
        return Math.floor(Math.random() * 100);
      }

    const tab: any = ["card1", "card2", "card3", "card4", "card5", "card6", "card7"];
    const photos1: any = [
        `https://picsum.photos/id/1/200/300`,
    `https://picsum.photos/id/5/200/300`,
    `https://picsum.photos/id/10/200/300`,
    `https://picsum.photos/id/20/200/300`,
    `https://picsum.photos/id/40/200/300`,
    `https://picsum.photos/id/55/200/300`,
    `https://picsum.photos/id/66/200/300` ];
    const [photos, setPhotos] = useState(photos1);
    const sliceT = () => {
        if (counter > -1 && counter < 5) {
            var sliced = [...tab].slice(counter, counter + 3);
            setSlicedTab(sliced);

            var slicedP = [...photos1].slice(counter, counter + 3);
            setPhotos(slicedP);
        }

    };
    useEffect(() => {
        sliceT();
    }, [counter]);
    return (
        <>
            <div className="main-div">
                <button
                    onClick={() => {
                        setCounter(counter == 0 ? 0 : counter - 1);
                        sliceT();
                    }}
                >
                    &#10094;
                </button>
                {slicedTab?.length} c:{counter}
                {slicedTab?.map((element, index) => {
                    return <div className="width m-3" key={element}><h3>{element}</h3><img src={photos[index]}/></div>;
                })}
                <button
                    onClick={() => {
                        setCounter(counter == 4 ? 4 : counter + 1);
                        sliceT();
                    }}
                >
                    &#10095;
                </button>
            </div>
        </>
    );


}

export default SlidingCards;