import { Button, Form, Stack } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import './styles.scss';
import FilteredSelect from "../../../components/complex/FilteredSelect";
import dictionariesApi from "../../../api/DictionariesApi";
import { Category, CategoryDto, HashTag, Response, RecipeStep, Recipe } from "../../../data/types";
import HashTagBadge from "../../../components/basicUi/HashTagBadge";
import SideOffcanvas from "../../../components/basicUi/SideOffcanvas";
import StatisticCircle from "../../../components/complex/StatisticCircle";
import RecipeCard from "../../../components/complex/RecipeCard";
import MyAlert from "../../../components/basicUi/MyAlert";
import MyButton from "../../../components/basicUi/MyButton";
import Tooltip from "../../../components/basicUi/Tooltip";
import Info from "../../../components/basicUi/Info";
import CustomModal from "../../../components/basicUi/CustomModal";
import RecipeStepsNumbers from "../../../components/complex/RecipeStepsNumbers";
import SlidingCards from "../../../components/complex/SlidingCards";
import MyInput from "../../../components/basicUi/MyInput";
import MyTextarea from "../../../components/basicUi/MyTextarea";
import MyCheckbox from "../../../components/basicUi/MyCheckbox";
import MySelect from "../../../components/basicUi/MySelect";
import MyFileInput from "../../../components/basicUi/MyFileInput";
import MySwitch from "../../../components/basicUi/MySwitch";
import VerticalPagination from "../../../components/complex/VerticalPagination";
import { AlertsDispatchContext } from "../../../context/AlertContext";
import RecipeCardCircle from "../../../components/complex/RecipeCardCircle";
import MyImage from "../../../components/basicUi/MyImage";
import { initAs } from "../../../utils/ObjectUtils";
import CategoryCard from "../../../components/complex/CategoryCard";
import TimeAmountInput from "../../../components/complex/TimeAmountInput";

const omitNull = (obj: any) => {
    Object.keys(obj).filter(k => obj[k] === null).forEach(k => delete (obj[k]))
    return obj
}
function Test() {
    const recipe = initAs<Recipe>(
        {
            id: "osidj-oeifj-9239",
            name: "Sałatka warzywna",
            averageRating: 4.5,
            ratingsCount: 110,
            categories: [{ id: "1", name: "Obiady", image: "" }, { id: "2", name: "Zupy", image: "" }],
            hashTags: [{ id: "1", name: "Obiady" }, { id: "2", name: "Zupy" }, { id: "3", name: "Zdrowe" }],
            description: "Some quick example text to build on the card title and make up the bulk of the card's content.Some quick example text to build on the card title and make up the bulk of the card's content.",
            image: "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22286%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20286%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_189cc491e6b%20text%20%7B%20fill%3A%23999%3Bfont-weight%3Anormal%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_189cc491e6b%22%3E%3Crect%20width%3D%22286%22%20height%3D%22180%22%20fill%3D%22%23373940%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22107.1953125%22%20y%3D%2296.3%22%3E286x180%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"
        });

    const recipeCallback = () => { console.log("go to recipe!") }
    const [show, setShow] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);
    const handleSubmit = () => { console.log("successfull submit"); setShowModal(false) };
    const dispatch = useContext(AlertsDispatchContext);
    let nextId = 0;
    const photo = "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22171%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20171%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_189d8cc414e%20text%20%7B%20fill%3A%23999%3Bfont-weight%3Anormal%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A10pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_189d8cc414e%22%3E%3Crect%20width%3D%22171%22%20height%3D%22180%22%20fill%3D%22%23373940%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2259.921875%22%20y%3D%2294.5%22%3E171x180%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E";
    const [testPagiatorActualPage, setTestPagiatorActualPage] = useState(20);

    const testOptions = [{ label: "op1", value: { name: "nam1" } }, { label: "op2", value: { name: "nam2" } }, { label: "op3", value: { name: "nam3" } }];
    const stepText = `      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dui mi, mattis sit amet felis quis, faucibus varius enim. Cras faucibus odio nec nisl pharetra, eu convallis orci viverra. Phasellus lobortis quis ex vitae porta. Donec a est elementum, convallis lorem a, efficitur enim. Curabitur dapibus id tortor a placerat. Suspendisse felis libero, suscipit a ipsum nec, interdum blandit risus. Donec mollis nec tortor nec volutpat. Ut feugiat nunc ac elementum tincidunt.

    Donec eu orci ullamcorper, vestibulum tortor eget, faucibus augue. Nunc in est maximus, finibus dui nec, vehicula elit. Nam ullamcorper dictum lacus, nec gravida massa egestas in. Praesent in hendrerit metus. Duis a nisl volutpat nunc consequat finibus nec a velit. Duis non luctus massa. Morbi faucibus neque non diam venenatis, vel congue neque euismod. In et nisi ligula. Suspendisse ac odio sagittis, elementum sem id, elementum felis. Ut sed enim mauris. Sed rutrum, nulla nec elementum consectetur, est felis semper orci, nec porta neque metus sodales odio. Vestibulum a quam ac lectus tincidunt blandit vel vitae mauris. 
     `
    const recipeSteps = initAs<RecipeStep[]>([{ description: stepText }, { description: stepText }, { description: stepText }, { description: stepText }, { description: stepText },
    { description: stepText }, { description: stepText }, { description: stepText }, { description: stepText }, { description: stepText }, { description: stepText }, { description: stepText }]
    )

    const getRecipe = (num: number) => { let nr = { ...recipe }; nr.name += (' ' + num); return nr }
    const recipes = [getRecipe(1), getRecipe(2), getRecipe(3), getRecipe(4), getRecipe(5), getRecipe(6), getRecipe(7), getRecipe(8), getRecipe(9)];

    const recipeCallbackForSlider = (recipe: Recipe) => {
        console.log("from callback" + recipe.id)
    }

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
                <div className="mt-5"> <RecipeCard recipe={recipe} recipeCallback={recipeCallback}></RecipeCard ></div>

                <Form.Check></Form.Check>

                <button onClick={() => { setShow(!show); }}>showme</button>
                <div className="alert-container">
                    {show && <MyAlert.Primary >This is a primary alert—check it out!</MyAlert.Primary>}
                    {show && <MyAlert.Success >This is a success alert—check it out!</MyAlert.Success>}
                    {show && <MyAlert.Error >This is a danger alert—check it out!</MyAlert.Error>}
                </div>

                <Tooltip title={"Tekst tooltip right-start"} placement={"right-start"} ><MyButton.Primary onClick={() => { console.log("btnz") }} className="button-400" disabled={false}>Zapisz</MyButton.Primary></Tooltip>
                <Tooltip title={"Tekst tooltip bottom-start"} placement={"bottom-start"} ><MyButton.Secondary onClick={() => { console.log("btna") }}>Anuluj</MyButton.Secondary></Tooltip>
                <Tooltip title={"Tekst tooltip left-end"} placement={"left-end"} ><MyButton.Outline onClick={() => { console.log("btni") }}>Inna opcja</MyButton.Outline></Tooltip>


                <button onClick={() => {

                    dispatch({
                        type: 'added',
                        id: nextId++,
                        message: "This is a primary alert—check it out!",
                        alertType: "error"
                    })
                }
                }> shownewalert</button>

                <Info value="Why do programmers prefer using the dark mode? Because light attracts bugs! ~ChatGPT" />
                <Info value="Why do programmers always mix up Christmas and Halloween? Because Oct 31 == Dec 25! ~ChatGPT" />


                <div>
                    <RecipeStepsNumbers steps={recipeSteps}></RecipeStepsNumbers>
                </div>
                <div>
                    <SlidingCards recipes={recipes} goToRecipeCallback={recipeCallbackForSlider}></SlidingCards>
                </div>

                <div>
                    <MyImage src={photo} height={300} rounded></MyImage>
                </div>
                <div>
                    <MyButton.Primary onClick={handleShow}>
                        Pokaż modal
                    </MyButton.Primary>
                    <CustomModal shouldShow={showModal} handleClose={handleClose} handleSubmit={handleSubmit}></CustomModal>
                </div>

                <div>
                    <RecipeCardCircle recipe={recipe} recipeCallback={recipeCallback}></RecipeCardCircle>
                </div>
                {/**/}

            </div>


        </Stack >

        <Stack direction="vertical" style={{ textAlign: "left", marginLeft: "100px", width: "300px" }}>
            <MyInput name="test1" label="Test jeden" placeholder="Input test 1" onChange={(value: string) => console.log(value)} defaultValue={"Wartość nadana"} />
            <MyInput name="test2" placeholder="Input test 2" onChange={(value: string) => console.log(value)} />
            <MyInput name="test3" label="Test trzy" onChange={(value: string) => console.log(value)} />
            <MyTextarea name="test4" label="Test textarea" placeholder="Input test 1" rows={5} onChange={(value: string) => console.log(value)} />
            <MyCheckbox name="test5" label="Test checkbox" onChange={(value: boolean) => console.log(value)} defaultChecked={true} />
            <MySelect name="test6" label="Test select" emptyOption="Pusta wartość" options={testOptions} defaultValue={testOptions[1].value} onChange={(value: string) => console.log(value)} />
            <MyFileInput name="test7" label="Test file" placeholder="Select file" onChange={(value: string) => console.log(value)} />
            <MySwitch name="test8" label="Test switch" onChange={(value: string) => console.log(value)} defaultChecked={false} />
            <TimeAmountInput name="test9" label="test time amount" onChange={(value: number) => console.log(value)} defaultValue={103} />
        </Stack>


        <SideOffcanvas title="Offcanvas">
            Some text as placeholder. In real life you can have the elements you
            have chosen. Like, text, images, lists, etc.
        </SideOffcanvas>

        <Stack className="" direction="horizontal" gap={5}>
            <div className="p-4">
                <FilteredSelectTest />
            </div>
            <div className="p-4">
                <FilteredMultiSelectTest />
            </div>
            <div className="p-4">
                <FilteredHierarchicalSelectTest></FilteredHierarchicalSelectTest>
            </div>
        </Stack>

        <Stack className="" direction="horizontal" gap={5}>
            <div className="p-4">
                <StatisticCircle value="70.4%" label="Basic statistic" />
            </div>
            <div className="p-4">
                <StatisticCircle value="123" label="Other statistic" />
            </div>
        </Stack>

        <CategoryCardExample />

        <VerticalPagination totalPages={100} actualPage={testPagiatorActualPage} pageButtonsToShow={6} onPageSelect={setTestPagiatorActualPage} />
    </>
    );
}

function FilteredSelectTest() {
    const [filteredSelectValues, setFilteredSelectValues] = useState<any[]>([]);

    function onFilteredSelectSearchCallback(phrase: string) {
        dictionariesApi.getHashTags({ name: phrase, size: 5 }, (response: any) => { setFilteredSelectValues(mapHashTagToSearchList(response.value.content)) })
    }

    function mapHashTagToSearchList(hashTags: HashTag[]) {
        return hashTags.map(hashTag => { return { value: hashTag, label: hashTag.name } })
    }

    useEffect(() => {
        onFilteredSelectSearchCallback('');
    }, [])

    function onSearchCallback(phrase: string) {
        onFilteredSelectSearchCallback(phrase)
        //console.log("onSearchCallback", phrase)
    }

    function onSelectCallback(value: any) {
        //console.log("onSelectCallback", value)
    }

    function onNewValueCallback(value: string) {
        //console.log("onNewValueCallback", value)
    }


    return <FilteredSelect label="Test wartości" options={filteredSelectValues} onSearchCallback={onSearchCallback} defaultValue={{ value: "asd", label: "dsa" }}
        onSelectCallback={onSelectCallback} onNewValueCallback={onNewValueCallback} disabled={false} allowNew={true} />
}

function FilteredMultiSelectTest() {
    const [filteredSelectValues, setFilteredSelectValues] = useState<any[]>([]);

    function onFilteredSelectSearchCallback(phrase: string) {
        dictionariesApi.getHashTags({ name: phrase, size: 5 }, (response: any) => { setFilteredSelectValues(mapHashTagToSearchList(response.value.content)) })
    }

    function mapHashTagToSearchList(hashTags: HashTag[]) {
        return hashTags.map(hashTag => { return { value: hashTag, label: hashTag.name } })
    }

    useEffect(() => {
        onFilteredSelectSearchCallback('');
    }, [])

    function onSearchCallback(phrase: string) {
        onFilteredSelectSearchCallback(phrase)
        //console.log("onSearchCallback", phrase)
    }

    function onSelectCallback(value: any) {
        //console.log("onSelectCallback", value)
    }

    function onNewValueCallback(value: string) {
        //console.log("onNewValueCallback", value)
    }


    return <FilteredSelect multiple={true} label="Test multiSelect" options={filteredSelectValues} onSearchCallback={onSearchCallback} allowNew={true}
        onSelectCallback={onSelectCallback} onNewValueCallback={onNewValueCallback} disabled={false} defaultValue={[{ label: "test123" }, { label: "abc_111" }]} />
}


function FilteredHierarchicalSelectTest() {
    const [filteredSelectValues, setFilteredSelectValues] = useState<any[]>([]);
    const [allCategories, setAllCategories] = useState<any[]>([]);

    function onFilteredSelectSearchCallback(phrase: string) {
        setFilteredSelectValues(mapCategoriesToSearchList(searchCategory(allCategories, phrase)))
    }

    function searchCategory(categories: CategoryDto[], phrase: string): any[] {
        const result: any[] = [];
        categories.forEach(category => {
            if (checkCategoryContainsPhrase(category, phrase)) {
                result.push(category)
            } else if (category.children.length > 0) {
                const foundChildren = searchCategory(category.children, phrase)
                if (foundChildren.length > 0) {
                    const tempCategory = { ...category }
                    tempCategory.children = foundChildren
                    result.push(tempCategory)
                }
            }
        })
        return result;
    }

    function checkCategoryContainsPhrase(category: CategoryDto, phrase: string) {
        return category.name.indexOf(phrase) >= 0;
    }

    function mapCategoriesToSearchList(categories: any[]): any[] {
        return categories.map(category => { return { value: category, label: category.name, children: mapCategoriesToSearchList(category.children) } })
    }

    useEffect(() => {
        dictionariesApi.getAllCategories((response: Response<Category[]>) => {
            setAllCategories(response.value)
            setFilteredSelectValues(mapCategoriesToSearchList(response.value))
        })
    }, [])

    function onSearchCallback(phrase: string) {
        onFilteredSelectSearchCallback(phrase)
        //console.log("onSearchCallback", phrase)
    }

    function onSelectCallback(value: any) {
        //console.log("onSelectCallback", value)
    }

    function onNewValueCallback(value: string) {
        //console.log("onNewValueCallback", value)
    }


    return <FilteredSelect multiple={true} label="Test hierarchical Select" options={filteredSelectValues} onSearchCallback={onSearchCallback} hierarchical={true}
        onSelectCallback={onSelectCallback} onNewValueCallback={onNewValueCallback} disabled={false} allowNew={false} />
}

function CategoryCardExample() {
    const [allCategories, setAllCategories] = useState<any[]>([]);
    useEffect(() => {
        dictionariesApi.getAllCategories((response: Response<Category[]>) => {
            setAllCategories(response.value)
        })
    }, [])
    return <Stack direction="horizontal" gap={3} className="align-items-stretch" style={{ marginLeft: 100, width: 1200 }}>
        {allCategories.length > 0 && <CategoryCard category={allCategories[0]} className="col-4" />}
        {allCategories.length > 1 && <CategoryCard category={allCategories[1]} className="col-4" />}
        {allCategories.length > 2 && <CategoryCard category={allCategories[2]} className="col-4" />}
    </Stack>
}

export default Test;