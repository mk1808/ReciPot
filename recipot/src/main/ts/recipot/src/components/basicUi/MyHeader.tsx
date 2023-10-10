import './styles.scss';

type Props = {
    title: string,
    level?: string,
    dispLevel?: string,
    className?: string
};

function MyHeader({
    title,
    level = "1",
    dispLevel,
    className = ""
}: Props) {

    const CustomTag = `h${level}` as keyof JSX.IntrinsicElements;
    const customClass = `display-${dispLevel ?? level}`;

    return (
        <div className={"my-header my-3 " + className}>
            <CustomTag className={"h-tag " + customClass}> {title} </CustomTag>
        </div>
    );
}

export default MyHeader;