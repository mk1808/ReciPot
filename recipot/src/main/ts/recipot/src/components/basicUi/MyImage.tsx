import { Image } from "react-bootstrap";

function MyImage({ src = "", height = 200, rounded = false }: { src: string, height?: number, rounded?: boolean }) {

    return (
        <Image className="m-3" src={src} rounded={rounded} height={height} />
    );
}

export default MyImage;