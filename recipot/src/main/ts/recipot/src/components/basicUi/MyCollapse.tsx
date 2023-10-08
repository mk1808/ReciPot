import Accordion from 'react-bootstrap/Accordion';

function MyCollapse({ header, children }: { header: any, children: any }) {

    return (
        <Accordion className='my-collapse'>
            <Accordion.Item eventKey="0">
                <Accordion.Header>{header}</Accordion.Header>
                <Accordion.Body>
                    {children}
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
}

export default MyCollapse;