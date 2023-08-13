import './styles.scss';

function MyHeader({ title = "" }: { title: string }) {
    return (
        <div className="my-header my-3">
            <h1 className="display-1">{title}</h1>
        </div>
    );
}

export default MyHeader;