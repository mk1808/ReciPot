import { useState, useEffect, useRef } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { RecipeStep } from "../../data/types";

type Props = {
  steps: RecipeStep[],
  size?: number,
  scrollHeight?: number
};

function RecipeStepsNumbers({
  steps,
  size = 100,
  scrollHeight = 300
}: Props) {

  const [, setScrollTop] = useState(0);
  const circleElements = useRef<any[]>([]);

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [])

  function onScroll() {
    setScrollTop(window.scrollY);
  }

  function getColor(index: number): string {
    let element: any = circleElements.current[index],
      offsetTop = element?.offsetTop || 0,
      scrollTop = window?.scrollY || 0;
    return (offsetTop - scrollTop) < scrollHeight ? "circle-light" : "circle-dark";
  }

  return (
    <div>
      {steps.map(renderCircleWithText)}
    </div>
  );

  function renderCircleWithText(element: any, index: number) {
    return (
      <Row className="mb-3 steps" key={element.id} >
        {renderCircle(index)}
        {renderText(element)}
      </Row>
    )
  }

  function renderCircle(index: number) {
    return (
      <div ref={circleElement => circleElements.current[index] = circleElement} className={"step-circle mb-5 " + getColor(index)} >
        {renderValue(index + 1)}
      </div>
    );
  }

  function renderValue(value: number) {
    return (
      <div style={{ width: size, height: size }} className="value" >
        <span>{value}</span>
      </div>
    );
  }

  function renderText(element: any) {
    return (
      <Col className="step-text">
        <Card>
          <Card.Body className="py-3 px-4 card-content">{element.description} </Card.Body>
        </Card>
      </Col>
    );
  }
}
export default RecipeStepsNumbers;