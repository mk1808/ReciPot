import { useState } from "react";

function RecipeStepsNumbers() {
    const [scrollTop, setScrollTop] = useState(0);

  const handleScroll = (event:any) => {
    setScrollTop(event.currentTarget.scrollTop);
  };

  return (
    <div>
      Scroll top: <b>{scrollTop}</b>
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
    </div>
  );
}
export default RecipeStepsNumbers;