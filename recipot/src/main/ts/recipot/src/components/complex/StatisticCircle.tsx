
function StatisticCircle({ value = '', label = '', size = 100, ringSize = 30, mainColor = "rgb(13, 110, 253)", secondaryColor = "#fff" }) {

    return <div>
        {renderRing()}
        <span className="statistic-circle-label">{label}</span>
    </div>

    function renderRing() {
        return <div className="statistic-circle mx-auto" style={{ width: size, height: size }}>
            {renderHalfRing("main")}
            {renderHalfRing("rotated")}
            {renderValue()}
        </div>
    }

    function renderHalfRing(className: string) {
        return <div className={className} style={{ width: size, height: size }}>
            {renderHalfCircle(size, mainColor)}
            {renderCircle(size - ringSize, secondaryColor)}
        </div>
    }
    function renderCircle(diameter: number, backgroundColor: string) {
        return <div className="circle" style={{ backgroundColor, width: diameter, height: diameter, margin: (size - diameter) / 2 }}></div>
    }

    function renderHalfCircle(diameter: number, backgroundColor: string) {
        return <div className="half-circle" style={{ backgroundColor, width: diameter, height: diameter, margin: (size - diameter) / 2 }}></div>
    }

    function renderValue() {
        return <div style={{ width: size, height: size }} className="statistic-circle-value" >
            <span>{value}</span>
        </div>
    }
}

export default StatisticCircle;