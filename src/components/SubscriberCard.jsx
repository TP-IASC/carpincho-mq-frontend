import { Card } from "react-bootstrap";

const SubscriberCard = ({subscriber}) => {
  return (
    <Card className="subscriber-card" border="primary">
      <Card.Body>
        <Card.Text>{JSON.stringify(subscriber)}</Card.Text>
      </Card.Body>
    </Card>
  );
}
 
export default SubscriberCard;