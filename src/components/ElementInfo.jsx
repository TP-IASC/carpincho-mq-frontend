import { Card } from "react-bootstrap";

const ElementInfo = ({info}) => {
  return (
    <Card>
      <Card.Body>
        <pre>
          {JSON.stringify(info, null, 2)} 
        </pre>
      </Card.Body>
    </Card>
  );
}
 
export default ElementInfo;