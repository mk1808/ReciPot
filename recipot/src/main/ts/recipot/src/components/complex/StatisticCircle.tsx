import { Stack } from "react-bootstrap";

function StatisticCircle({ value = '', label = '', size = 100, ringSize = 30, mainColor = "rgb(13, 110, 253)", secondaryColor = "#fff" }) {

    return <Stack>
        <span className="statistic-circle-label">{label}</span>
        {renderRing()}
    </Stack>

    function renderRing() {
        return <div className="statistic-circle" style={{ width: size, height: size }}>
            {renderHalfRing("main")}
            {renderHalfRing("rotated")}
            <span className="statistic-circle-value" >{value}</span>
        </div>
    }

    function renderHalfRing(className: string) {
        return <div className={className} style={{ width: size, height: size }}>
            {renderHalfCircle(size, mainColor)}
            {renderHalfCircle(size - ringSize, secondaryColor)}
        </div>
    }

    function renderHalfCircle(diameter: number, backgroundColor: string) {
        return <div className="half-circle" style={{ backgroundColor, width: diameter, height: diameter, margin: (size - diameter) / 2 }}></div>
    }
}

export default StatisticCircle;