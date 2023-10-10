import { Spinner } from 'react-bootstrap';
import './styles.scss';

function MySpinner() {

    return (
        <Spinner
            animation="border"
            role="status"
            className='spinner'
            variant='secondary'
        />
    );
}

export default MySpinner;