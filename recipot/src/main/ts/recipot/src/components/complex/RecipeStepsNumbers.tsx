import { useState, useEffect } from "react";
import { Image } from "react-bootstrap";

function RecipeStepsNumbers() {

  const handleScroll = (event: any) => {
    setScrollTop(event.currentTarget.scrollTop);
  };

  const file = `data:image/svg+xml;charset=UTF-8,%3Csvg width%3D"171" height%3D"180" xmlns%3D"http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg" viewBox%3D"0 0 171 180" preserveAspectRatio%3D"none"%3E%3Cdefs%3E%3Cstyle type%3D"text%2Fcss"%3E%23holder_189d682b8e6 text %7B fill%3A%23999%3Bfont-weight%3Anormal%3Bfont-family%3AArial%2C Helvetica%2C Open Sans%2C sans-serif%2C monospace%3Bfont-size%3A10pt %7D %3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg id%3D"holder_189d682b8e6"%3E%3Crect width%3D"171" height%3D"180" fill%3D"%23373940"%3E%3C%2Frect%3E%3Cg%3E%3Ctext x%3D"59.5" y%3D"94.5"%3E171x180%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E`;
  const [scrollTop, setScrollTop] = useState(0);
  const tab: any[] = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
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
    let name = "my-block",
      allElements = document.getElementsByClassName(name),
      element: any = allElements[index], //ref
      offsetTop = element?.offsetTop || 0,
      scrollTop = window?.scrollY || 0;
    console.log("offset " + offsetTop)
    console.log("scrl " + scrollTop)
    //  console.log(offsetTop - scrollTop)
    return (offsetTop - scrollTop) < 600 ? "black" : "red";
  }
  return (
    <>
      {tab.map((element, index) => {
        return (<div key={index} className="mt-5 my-block" style={{ height: 20, width: 600, backgroundColor: getColor(index) }}></div>);
      })}



      {/*<div>
      Scroll top: <b>{scrollTop}</b>
      <Image src={file} roundedCircle />
      <br />
      <br />
      <div id="scrl-test"
        style={{
          border: '1px solid black',
          width: '400px',
          height: '200px',
          overflow: 'auto',
        }}
        onScroll={handleScroll}
      >
        {[...Array(10)].map((_, i) => (
          <p key={i}>Content {i}</p>
        ))}
      </div>
        </div>*/}</>
  );
}
export default RecipeStepsNumbers;