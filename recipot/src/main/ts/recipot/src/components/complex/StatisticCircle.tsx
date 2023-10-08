import Stack from 'react-bootstrap/Stack';
import './styles.scss';

type Props = {
    value: string | number,
    label: string,
    size?: number,
    ringSize?: number
};

function StatisticCircle({
    value,
    label,
    size = 100,
    ringSize = 20
}: Props) {

    return (
        <Stack className="align-items-center">
            <div className="statistic-circle">
                {renderRing()}
                {renderValue()}
            </div>
            <span className="statistic-circle-label">{label}</span>
        </Stack>
    );

    function renderRing() {
        return <div className="statistic-circle-ring" style={{ width: size, height: size, borderWidth: ringSize }} />
    }

    function renderValue() {
        return (
            <div className="statistic-circle-value" style={{ width: size, height: size }}>
                <span>{value}</span>
            </div>
        );
    }

}

export default StatisticCircle;