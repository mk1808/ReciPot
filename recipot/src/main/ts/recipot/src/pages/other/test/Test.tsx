import { Button, Form, Stack } from "react-bootstrap";
import { useEffect, useState } from "react";
import './styles.scss';
import HashTagBadge from "../../../components/basicUi/HashTagBadge";
import SideOffcanvas from "../../../components/basicUi/SideOffcanvas";
import RecipeCard from "../../../components/complex/RecipeCard";
import MyAlert from "../../../components/basicUi/MyAlert";
import MyButton from "../../../components/basicUi/MyButton";

const omitNull = (obj: any) => {
    Object.keys(obj).filter(k => obj[k] === null).forEach(k => delete (obj[k]))
    return obj
}
function Test() {
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
    const recipeCallback = () => { console.log("go") }
    const [show, setShow] = useState(false);


    return (<>
        <h1>Test</h1>
        <Stack className=" justify-content-center" direction="horizontal" gap={5}>
            <div className="p-4 test-szer-1">First item</div>
            <div className="p-4 test-szer-1">Second item</div>
            <div className="p-4 test-szer-1">Third item</div>
        </Stack>
        <Stack className=" justify-content-center mt-5" direction="horizontal" gap={5}>
            <div className="p-4 mb-2 text-start test-szer-2">
                <div className="p-4 mb-3 text-start test-szer-3">itemitem</div>
                <Stack className=" mt-5 mb-5" direction="horizontal">
                    <HashTagBadge text="Obiady" />
                    <HashTagBadge text="Zdrowe" />
                    <HashTagBadge text="Wegetariańskie" />
                </Stack>
                <RecipeCard className="mt-5" recipe={recipe} recipeCallback={recipeCallback}></RecipeCard >
                <Form.Check></Form.Check>
               
                <button onClick={() => { setShow(!show); }}>showme</button>
                <div className="alert-container">
                    {show && <MyAlert.Primary >This is a primary alert—check it out!</MyAlert.Primary>}
                    {show && <MyAlert.Success >This is a success alert—check it out!</MyAlert.Success>}
                    {show && <MyAlert.Error >This is a danger alert—check it out!</MyAlert.Error>}
                </div>

                <MyButton.Primary onClick={() => { console.log("btnz") }} className="button-400" disabled={false}>Zapisz</MyButton.Primary>
                <MyButton.Secondary onClick={() => { console.log("btna") }}>Anuluj</MyButton.Secondary>
                <MyButton.Outline onClick={() => { console.log("btni") }}>Inna opcja</MyButton.Outline>
             
                {
                }
            </div>



        </Stack>


        <SideOffcanvas title="Offcanvas">
            Some text as placeholder. In real life you can have the elements you
            have chosen. Like, text, images, lists, etc.
        </SideOffcanvas>

    </>


    );


}

export default Test;