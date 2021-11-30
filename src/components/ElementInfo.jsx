import { Card, OverlayTrigger, Popover } from "react-bootstrap";

const ElementInfo = ({info}) => {
  return (
    <OverlayTrigger 
      placement="auto"
      delay={{show: 500}}
      overlay={
        <Popover style={{maxWidth: "none"}}>
          <Popover.Header as="h3">JSON</Popover.Header>
          <Popover.Body>
            <pre>
              {JSON.stringify(info, null, 2)} 
            </pre>
          </Popover.Body>
        </Popover>
      }>
      <Card className="element-card" border="primary">
        <Card.Body>
          <Card.Text>
            {`"${info.message.payload}"`} 
          </Card.Text>
        </Card.Body>
      </Card>
    </OverlayTrigger>
  );
}
 
export default ElementInfo;