import { CategoryDto } from "../../data/types";
import { Stack } from "react-bootstrap";
import MyImage from "../basicUi/MyImage";
import { initFcn } from "../../utils/ObjectUtils";

type Props = {
    category: CategoryDto,
    className?: string,
    onCategorySelect?: (category: CategoryDto) => any,
    showChildren?: boolean
};

function CategoryCard({
    category,
    className = "",
    onCategorySelect = initFcn<CategoryDto>(),
    showChildren = true
}: Props) {

    const CATEGORY_IMAGE_SIZES_HIERARCHY = [160, 100, 60, 40]
    return (
        <div className={"category-card " + className}>
            {renderCategory(category, 0, category.id)}
            {renderChildren(category.children, 1)}
        </div>
    )

    function renderCategory(category: CategoryDto, level: number, key: any) {
        return (
            <div className="col" key={key} onClick={() => onCategorySelect(category)}>
                <MyImage src={category.image} roundedCircle rounded height={CATEGORY_IMAGE_SIZES_HIERARCHY[level]} className="m-1 cursor-pointer" />
                <br />
                <span className={`cursor-pointer ${level === 0 ? 'main-category' : ''}`}>{category.name}</span>
            </div>
        )
    }

    function renderChildren(categories: CategoryDto[], level: number) {
        return showChildren && (
            <>
                <hr />
                <Stack direction="horizontal" gap={3} className="flex-wrap align-items-start">
                    {categories?.map((category) => renderCategory(category, level, category.id))}
                </Stack>
            </>
        )
    }
}

export default CategoryCard;