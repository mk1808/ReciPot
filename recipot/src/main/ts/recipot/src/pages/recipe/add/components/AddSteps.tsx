import { BsPlusCircleFill } from "react-icons/bs";
import MyButton from "../../../../components/basicUi/MyButton";

function AddSteps() {
    return (
        <div className="mt-5 ">
            <hr />
            <h4 className="mt-3">Kroki przepisu</h4>
            <MyButton.Primary onClick={() => { }}>Dodaj <BsPlusCircleFill className="mb-1 ms-1" /></MyButton.Primary>
        </div>
    );


}

export default AddSteps;