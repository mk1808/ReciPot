import { Col, Container, Form, Row, Stack } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import MyHeader from "../../../components/basicUi/MyHeader";
import './styles.scss';
import MyButton from "../../../components/basicUi/MyButton";
import { BsPlusCircleFill } from "react-icons/bs";

function RecipeAdd() {
    const { t } = useTranslation();
    return (
        <Stack className="justify-content-center py-5 recipe-add-page" direction="horizontal">
            <div className="pt-4 mb-2 basic-container-large basic-container-border">
                <MyHeader title={t('p.newRecipeHeader')}></MyHeader>
                {renderForm()}
                {renderButtons()}
            </div>
        </Stack>
    );

    function renderForm() {
        return (
            <div className="my-5">
                <Container >
                    <Row>
                        <Col className="border-right">
                            {renderLeftSide()}
                        </Col>
                        <Col className="border-left">
                            {renderRightSide()}
                        </Col>
                    </Row>
                </Container>
            </div>
        );

    }

    function renderLeftSide() {
        return (
            <>
                <div className="text-start">
                    {renderBasicInput()}
                    {renderBasicInput()}
                    {renderBasicInput()}
                </div>
                <div className="mt-5 ">
                    <hr />
                    <h4 className="mt-3 ">Składniki</h4>
                    <div className="text-start">
                        <Row>
                            <Col className="bor" >
                                {renderBasicInput()}
                            </Col>
                            <Col className="bor">
                                {renderBasicInput()}
                            </Col>
                            <Col className="bor" md={6}>
                                {renderBasicInput()}
                            </Col>
                        </Row>
                        {renderBasicInput()}
                        {renderBasicInput()}
                        {renderBasicInput()}
                        {renderBasicInput()}
                        {renderBasicInput()}
                        {renderBasicInput()}
                    </div>

                    <MyButton.Primary onClick={() => { }}>Dodaj <BsPlusCircleFill className="mb-1 ms-1" /></MyButton.Primary>

                </div>
            </>
        )
    }

    function renderRightSide() {
        return (
            <>
                <div className="text-start">
                    {renderBasicInput()}
                    {renderBasicInput()}
                    {renderBasicInput()}
                </div>
                <div className="mt-5 ">
                    <hr />
                    <h4 className="mt-3">Kroki przepisu</h4>
                    <MyButton.Primary onClick={() => { }}>Dodaj <BsPlusCircleFill className="mb-1 ms-1" /></MyButton.Primary>
                </div>
            </>
        )
    }
}

function renderButtons() {
    return (
        <div className="bottom-part">
            <hr></hr>
            <MyButton.Secondary onClick={() => { }}>Anuluj </MyButton.Secondary>
            <MyButton.Primary onClick={() => { }}>Zapisz </MyButton.Primary>
        </div>
    )

}

function renderBasicInput() {
    return (
        <>
            <Form.Label htmlFor="inputPassword5">Password</Form.Label>
            <Form.Control
                type="password"
                id="inputPassword5"
                aria-describedby="passwordHelpBlock"
            />
        </>
    )
}

export default RecipeAdd;