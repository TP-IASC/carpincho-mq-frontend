import QueueCard from "./QueueCard";
import { Form, Col, Row } from "react-bootstrap";
import SpinnerButton from "./SpinnerButton";
import { useCallback, useEffect, useState } from "react";
import { carpinchoGet, carpinchoPost, handleError } from "../utils";
import config from "../config.json";


const Home = () => {
  const [loading, setLoading] = useState(false);
  const [newQueueName, setNewQueueName] = useState(null);
  const [newQueueWorkMode, setNewQueueWorkMode] = useState("publish_subscribe");
  const [newQueueMaxSize, setNewQueueMaxSize] = useState(null);
  const [queues, setQueues] = useState([]);

  const getQueues = useCallback(() => {
    return carpinchoGet("/queues").then(res => {
      setQueues(res.data);
    }).catch(error => {
      handleError(error);
    });
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    const body = { name: newQueueName, workMode: newQueueWorkMode, maxSize: newQueueMaxSize };
    carpinchoPost("/queues", body).catch(error => {
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
  }, [getQueues]);

  return (
    <>
      <div className="center-form-container">
        <Form onSubmit={onSubmit} className="message-form">
          <Row>
            <Col>
              <Form.Control 
                required 
                placeholder="Queue name" 
                type="text"
                onChange={(e) => setNewQueueName(e.target.value)} 
              />
            </Col>
            <Col>
              <Form.Select required onChange={(e) => setNewQueueWorkMode(e.target.value)}>
                <option defaultValue value="publish_subscribe">Publish-Subscribe</option>
                <option value="work_queue">Cola de trabajo</option>
              </Form.Select>
            </Col>
            <Col>
              <Form.Control 
                required
                placeholder="Maximum size"
                type="number"
                onChange={(e) => setNewQueueMaxSize(e.target.value)}
              />
            </Col>
            <Col>
              <SpinnerButton text="New queue" loading={loading} />
            </Col>
          </Row>
        </Form>
      </div>

      <div className="queue-card-deck">
        {queues.map((name, index) => <QueueCard key={index} name={name} />)}
      </div>
    </>
  );
}
 
export default Home;