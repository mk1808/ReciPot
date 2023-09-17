import { Image } from "react-bootstrap";

function MyImage({
    src = "",
    height = 200,
    width = "auto",
    rounded = false,
    className = "m-3",
    roundedCircle = false
}: {
    src: string,
    height?: number | string,
    width?: number | string,
    rounded?: boolean,
    className?: string,
    roundedCircle?: boolean
}) {

    return (
        <Image className={className} src={src} rounded={rounded} roundedCircle={roundedCircle} height={height} width={width} />
    );
}

export default MyImage;