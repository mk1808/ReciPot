import { Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import './styles.scss';
import MyImage from "../../../components/basicUi/MyImage";
import MyHeader from "../../../components/basicUi/MyHeader";
import OtherColumn from "./components/OtherColumn";
import BasicInfo from "./components/BasicInfo";
import IngredientList from "./components/IngredientsList";
import Steps from "./components/Steps";
import PrivateNote from "./components/PrivateNote";
import Comments from "./components/Comments";

function RecipeDetails() {
    const { t } = useTranslation();
    const photo = "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22171%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20171%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_189d8cc414e%20text%20%7B%20fill%3A%23999%3Bfont-weight%3Anormal%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A10pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_189d8cc414e%22%3E%3Crect%20width%3D%22171%22%20height%3D%22180%22%20fill%3D%22%23373940%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2259.921875%22%20y%3D%2294.5%22%3E171x180%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E";
    const recipes = [{}, {}, {}, {}, {}, {}, {}]
    return (
        <div className='m-2 recipe-details-page'>
            {renderColumns()}
        </div>
    );

    function renderColumns() {
        return (
            <Row className='gx-2 m-3'>
                <Col md={7} className="offset-md-2">
                    <div className='basic-container-border p-3'>
                        {renderMainRecipeColumn()}
                    </div>
                </Col>
                <Col md={2}>
                    <div className='h-100 basic-container-border p-3'>
                        <OtherColumn></OtherColumn>
                    </div>
                </Col>
                <Col md={1}></Col>
            </Row>
        )
    }

    function renderMainRecipeColumn() {
        return (
            <div className="mt-3 main">
                <MyImage src={photo} height={400} className="main-img" rounded></MyImage>
                <MyHeader title={"Nazwa przepisu"}></MyHeader>
                {renderBreadcrumps()}
                <BasicInfo></BasicInfo>
                <hr />
                <IngredientList></IngredientList>
                <hr />
                <Steps></Steps>
                <hr />
                <PrivateNote></PrivateNote>
                <hr />
                <Comments></Comments>

            </div>
        )
    }

    function renderBreadcrumps() {
        return (
            <div className=" px-5 breadcrumps">
                <div className="my-4">breadcrumps</div>
            </div>
        )
    }

}

export default RecipeDetails;