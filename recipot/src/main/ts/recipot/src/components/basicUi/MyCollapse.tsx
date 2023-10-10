import Accordion from 'react-bootstrap/Accordion';

type Props = {
    header: any,
    children: any
};

function MyCollapse({
    header,
    children
}: Props) {

    return (
        <Accordion className='my-collapse'>
            <Accordion.Item eventKey="0">
                <Accordion.Header> {header} </Accordion.Header>
                <Accordion.Body> {children} </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
}

export default MyCollapse;