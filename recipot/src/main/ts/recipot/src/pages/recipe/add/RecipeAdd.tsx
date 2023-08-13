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
                {renderButton()}
            </div>
        </Stack>
    );

    function renderForm() {
        return (
            <div className="my-5">
                <Container >
                    <Row>
                        <Col className="border-right">
                            {renderL()}
                        </Col>
                        <Col className="border-left">
                            {renderR()}
                        </Col>
                    </Row>
                </Container>
            </div>
        );

    }
    function renderL() {
        return (
            <>
                <div className="text-start">

                    <Form.Label htmlFor="inputPassword5">Password</Form.Label>
                    <Form.Control
                        type="password"
                        id="inputPassword5"
                        aria-describedby="passwordHelpBlock"
                    />
                    <Form.Label htmlFor="inputPassword5">Password</Form.Label>
                    <Form.Control
                        type="password"
                        id="inputPassword5"
                        aria-describedby="passwordHelpBlock"
                    />
                    <Form.Label htmlFor="inputPassword5">Password</Form.Label>
                    <Form.Control
                        type="password"
                        id="inputPassword5"
                        aria-describedby="passwordHelpBlock"
                    />
                </div>
                <div className="mt-5 ">
                    <hr />
                    <h4 className="mt-3 ">Składniki</h4>
                    <div className="text-start">
                        <Row>
                            <Col className="bor" >
                                <Form.Label htmlFor="inputPassword5">Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    id="inputPassword5"
                                    aria-describedby="passwordHelpBlock"
                                />
                            </Col>
                            <Col className="bor">
                            <Form.Label htmlFor="inputPassword5">Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    id="inputPassword5"
                                    aria-describedby="passwordHelpBlock"
                                />
                            </Col>
                            <Col className="bor" xs={6}>
                            <Form.Label htmlFor="inputPassword5">Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    id="inputPassword5"
                                    aria-describedby="passwordHelpBlock"
                                />
                            </Col>
                        </Row>
                        <Form.Label htmlFor="inputPassword5">Password</Form.Label>
                        <Form.Control
                            type="password"
                            id="inputPassword5"
                            aria-describedby="passwordHelpBlock"
                        />
                        <Form.Label htmlFor="inputPassword5">Password</Form.Label>
                        <Form.Control
                            type="password"
                            id="inputPassword5"
                            aria-describedby="passwordHelpBlock"
                        />
                        <Form.Label htmlFor="inputPassword5">Password</Form.Label>
                        <Form.Control
                            type="password"
                            id="inputPassword5"
                            aria-describedby="passwordHelpBlock"
                        />
                        <Form.Label htmlFor="inputPassword5">Password</Form.Label>
                        <Form.Control
                            type="password"
                            id="inputPassword5"
                            aria-describedby="passwordHelpBlock"
                        />
                        <Form.Label htmlFor="inputPassword5">Password</Form.Label>
                        <Form.Control
                            type="password"
                            id="inputPassword5"
                            aria-describedby="passwordHelpBlock"
                        />
                        <Form.Label htmlFor="inputPassword5">Password</Form.Label>
                        <Form.Control
                            type="password"
                            id="inputPassword5"
                            aria-describedby="passwordHelpBlock"
                        />
                    </div>

                    <MyButton.Primary onClick={() => { }}>Dodaj <BsPlusCircleFill className="mb-1 ms-1" /></MyButton.Primary>

                </div>
            </>
        )
    }
    function renderR() {
        return (
            <>
                <div className="text-start">
                    <Form.Label htmlFor="inputPassword5">Password</Form.Label>
                    <Form.Control
                        type="password"
                        id="inputPassword5"
                        aria-describedby="passwordHelpBlock"
                    />
                    <Form.Label htmlFor="inputPassword5">Password</Form.Label>
                    <Form.Control
                        type="password"
                        id="inputPassword5"
                        aria-describedby="passwordHelpBlock"
                    />
                    <Form.Label htmlFor="inputPassword5">Password</Form.Label>
                    <Form.Control
                        type="password"
                        id="inputPassword5"
                        aria-describedby="passwordHelpBlock"
                    />
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

function renderButton() {
    return (
        
        <div className="bottom-part">
            <hr></hr>
            <MyButton.Primary onClick={() => { }}>Anuluj </MyButton.Primary>
            <MyButton.Primary onClick={() => { }}>Zapisz </MyButton.Primary>
            </div>)
    
    }

export default RecipeAdd;

/* <input type="text" className="my-3"></input> <br></br>
                    <input type="text" className="my-3"></input>  <br></br>
                    <input type="text" className="my-3"></input>  <br></br>*/