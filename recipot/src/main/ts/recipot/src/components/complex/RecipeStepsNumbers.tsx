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
    const handleScroll = () => {
      setScrollTop(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [])

  function getColor(index: number): string {
    let element: any = circleElements.current[index],
      offsetTop = element?.offsetTop || 0,
      scrollTop = window?.scrollY || 0;
    return (offsetTop - scrollTop) < scrollHeight ? "circle-light" : "circle-dark";
  }

  return (
    <div>
      {steps.map((element: any, index: number) => {
        return renderCircleWithText(element, getColor(index), element.id);
      })}
    </div>
  );

  function renderCircleWithText(element: any, backgroundClass: string, key: number) {
    return (
      <Row className="mb-3 steps" key={key} >
        <div ref={circleElement => circleElements.current[key] = circleElement} className={"step-circle mb-5 " + backgroundClass}   >
          {renderValue(key + 1)}
        </div>
        <Col className="step-text">
          <Card>
            <Card.Body className="py-3 px-4 card-content">{element.description} </Card.Body>
          </Card>
        </Col>
      </Row>
    )
  }

  function renderValue(value: number) {
    return (
      <div style={{ width: size, height: size }} className="value" >
        <span>{value}</span>
      </div>
    )
  }
}
export default RecipeStepsNumbers;