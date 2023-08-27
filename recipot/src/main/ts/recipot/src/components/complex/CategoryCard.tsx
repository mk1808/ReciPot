import { CategoryDto } from "../../data/types";
import { Stack } from "react-bootstrap";
import MyImage from "../basicUi/MyImage";
import { initFcn } from "../../utils/ObjectUtils";


function CategoryCard({
    category,
    className = "",
    onCategorySelect = initFcn<CategoryDto>(),
    showChildren = true
}: {
    category: CategoryDto,
    className?: string,
    onCategorySelect?: (category: CategoryDto) => void,
    showChildren?: boolean
}) {
    const CATEGORY_IMAGE_SIZES_HIERARCHY = [160, 100, 60, 40]
    return (
        <div className={"category-card " + className}>
            {renderCategory(category, 0)}
            {renderChildren(category.children, 1)}
        </div>
    )

    function renderCategory(category: CategoryDto, level: number, key?: any) {
        return (
            <div className="col" key={key} onClick={() => onCategorySelect(category)}>
                <MyImage src={category.image} roundedCircle={true} rounded={true} height={CATEGORY_IMAGE_SIZES_HIERARCHY[level]} className="m-1" />
                <br />
                {category.name}
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