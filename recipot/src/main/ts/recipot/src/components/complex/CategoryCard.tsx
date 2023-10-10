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

    const CATEGORY_IMAGE_SIZES_HIERARCHY = [160, 100, 60, 40];

    return (
        <div className={"category-card " + className}>
            {renderCategory(category, 0, category.id)}
            {renderChildren(category.children, 1)}
        </div>
    )

    function renderCategory(category: CategoryDto, level: number, key: any) {
        return (
            <div className="col" key={key} onClick={() => onCategorySelect(category)}>
                {renderCategoryImage(category, level)}
                <br />
                {renderCategoryName(category, level)}
            </div>
        )
    }

    function renderCategoryImage(category: CategoryDto, level: number) {
        return (
            <MyImage
                src={category.image}
                roundedCircle
                rounded
                height={CATEGORY_IMAGE_SIZES_HIERARCHY[level]}
                className="m-1 cursor-pointer" />
        );
    }

    function renderCategoryName(category: CategoryDto, level: number) {
        const className = `cursor-pointer ${level === 0 ? 'main-category' : ''}`;
        return (
            <span className={className}>{category.name}</span>
        );
    }

    function renderChildren(categories: CategoryDto[], level: number) {
        return showChildren && (
            <>
                <hr />
                <Stack direction="horizontal" gap={3} className="flex-wrap align-items-start">
                    {renderChildrenCategories(categories, level)}
                </Stack>
            </>
        )
    }

    function renderChildrenCategories(categories: CategoryDto[], level: number) {
        return categories?.map((category) => renderCategory(category, level, category.id))
    }

}

export default CategoryCard;