import { Image } from "react-bootstrap";
import { onImageLoadError } from "../../utils/RestUtils";

type Props = {
    src: string,
    height?: number | string,
    width?: number | string,
    rounded?: boolean,
    className?: string,
    roundedCircle?: boolean,
    onClick?: () => any
};

function MyImage({
    src,
    height = 200,
    width = "auto",
    rounded = false,
    className = "m-3",
    roundedCircle = false,
    onClick = () => { }
}: Props) {

    return (
        <Image
            className={className}
            src={src}
            rounded={rounded}
            roundedCircle={roundedCircle}
            height={height}
            width={width}
            onClick={onClick}
            onError={onImageLoadError}
        />
    );
}

export default MyImage;