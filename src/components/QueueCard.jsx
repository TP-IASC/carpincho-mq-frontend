import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const QueueCard = ({name}) => {
  const variants = [
    "primary",
    "secondary",
    "success",
    "danger",
    "warning",
    "info",
    "light",
    "dark"
  ];

  const selectedVariant = variants[Math.floor(Math.random() * variants.length)]
  return (
    <Link to={`/${name}`}>
      <Card className="queue-card" bg={selectedVariant} text={selectedVariant === "light" ? "dark" : "white"}>
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>{`Una cola llamada ${name}`}</Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
}
 
export default QueueCard;