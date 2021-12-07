import QueueCard from "./QueueCard";
import { Form, Col, Row } from "react-bootstrap";
import SpinnerButton from "./SpinnerButton";
import { useEffect, useState } from "react";
import { carpinchoGet, carpinchoPost, handleError } from "../utils";
import config from "../config.json";


const Home = () => {
  const [loading, setLoading] = useState(false);
  const [newQueue, setNewQueue] = useState(null);
  const [queues, setQueues] = useState([]);

  const getQueues = () => {
    return carpinchoGet("/queues").then(res => {
      setQueues(res.data);
    }).catch(error => {
      handleError(error);
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    carpinchoPost("/queues", { name: newQueue, workMode: "publish_subscribe", maxSize: 1000 }).catch(error => {
      handleError(error);
    }).finally(() => {
      getQueues().then(() => {
        setLoading(false);
      });
    });
  }

  useEffect(() => {
    const interval = setInterval(() => {
      getQueues();
    }, config.requestInterval);
    return () => { clearInterval(interval) };
  }, []);

  return (
    <div className="queue-card-deck">
      <Form onSubmit={onSubmit} className="message-form">
        <Row>
          <Col>
            <Form.Control 
              required 
              placeholder="Queue name" 
              type="text"
              onChange={(e) => setNewQueue(e.target.value)} 
            />
          </Col>
          <Col>
            <SpinnerButton text="New queue" loading={loading} />
          </Col>
        </Row>
      </Form>
      {queues.map((name, index) => <QueueCard key={index} name={name} />)}
    </div>
  );
}
 
export default Home;