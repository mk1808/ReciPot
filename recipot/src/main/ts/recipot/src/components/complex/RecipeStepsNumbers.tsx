import { useState, useEffect } from "react";
import { Card, Col, Image, Row } from "react-bootstrap";

function RecipeStepsNumbers({ steps }: any) {
  const [scrollTop, setScrollTop] = useState(0);
  const size = 100;
  const diameter = 100;
  const name = "step-circle";
  useEffect(() => {
    const handleScroll = (event: any) => {
      setScrollTop(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [])

  function getColor(index: number): string {
    let allElements = document.getElementsByClassName(name),
      element: any = allElements[index], //ref
      offsetTop = element?.offsetTop || 0,
      scrollTop = window?.scrollY || 0;
    return (offsetTop - scrollTop) < 300 ? "circle-light" : "circle-dark";
  }

  function renderValue(value: number) {
    return (
      <div style={{ width: size, height: size }} className="value" >
        <span>{value}</span>
      </div>
    )
  }

  function renderCircleWithText(element: any, backgroundClass: string, key: number) {
    return (
      <Row className="mb-3" key={key} >
        <Col xs={2}>
          <div className={name + " mb-5 " + backgroundClass} style={{ width: diameter, height: diameter, margin: (size - diameter) / 2 }}>
            {renderValue(key + 1)}
          </div>
          <div></div>
        </Col>
        <Col >
          <Card>
            <Card.Body className="py-3 px-4">{element.description} </Card.Body>
          </Card>
        </Col>
      </Row>
    )
  }

  return (
    <>
      {steps.map((element: any, index: number) => {
        return renderCircleWithText(element, getColor(index), index);
      })}
    </>
  );
}
export default RecipeStepsNumbers;