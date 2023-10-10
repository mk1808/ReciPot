import './styles.scss';

type Props = {
    text: string
};

function PageDivider({
    text
}: Props) {

    return (
        <div className="page-divider">
            <div className="shadow"></div>
            <div className="text">
                <i>{text}</i>
            </div>
        </div>
    );
}

export default PageDivider;