import './styles.scss';

function PageDivider({ text }: { text: string }) {
    return (
        <div className="page-divider">
            <div className="shadow"></div>
            <div className="text"><i>{text}</i></div>
        </div>
    );
}

export default PageDivider;