import QueueCard from "./QueueCard";
import { Form, Col, Row } from "react-bootstrap";
import SpinnerButton from "./SpinnerButton";
import { useEffect, useState } from "react";


const Home = () => {
  const [loading, setLoading] = useState(false);
  const [newQueue, setNewQueue] = useState(null);

  const sampleStates = ["cola1", "cola2", "cola3", "cola4"];

  const onSubmit = (event) => {
    event.preventDefault();
    
    const postQueue = () => {
      console.log(`Posting: ${newQueue}`);
      setTimeout(() => { 
        setLoading(false);
      }, 5000);
    }

    setLoading(true);
    postQueue();
  }

  useEffect(() => {
    // Fetch queue names
  }, []);

  return (
    <div className="queue-card-deck">
      <Form onSubmit={onSubmit} className="message-form">
        <Row>
          <Col>
            <Form.Control 
              required 
              placeholder="Payload" 
              type="text"
              onChange={(e) => setNewQueue(e.target.value)} 
            />
          </Col>
          <Col>
            <SpinnerButton text="New queue" loading={loading} />
          </Col>
        </Row>
      </Form>
      {sampleStates.map((name, index) => <QueueCard key={index} name={name} />)}
    </div>
  );
}
 
export default Home;