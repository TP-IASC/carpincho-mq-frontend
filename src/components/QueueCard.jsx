import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const QueueCard = ({name}) => {
  return (
    <Link to={`/${name}`}>
      <Card className="queue-card" border="primary">
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>{`Una cola llamada "${name}"`}</Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
}
 
export default QueueCard;