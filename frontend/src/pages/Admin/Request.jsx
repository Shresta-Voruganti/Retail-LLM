import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Request.module.css";

const Request = () => {
  const [requests, setRequests] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [newRequest, setNewRequest] = useState({
    toId: "",
    product: "",
    message: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const user = { _id: "123", name: "John Doe", branch: "Branch A" };
      setCurrentUser(user);
      const response = await axios.get(`/api/requests/${user._id}`);
      setRequests(response.data);
    };
    fetchData();
  }, []);

  const handleStatusChange = async (requestId, newStatus) => {
    await axios.put(`/api/requests/${requestId}`, { status: newStatus });
    const response = await axios.get(`/api/requests/${currentUser._id}`);
    setRequests(response.data);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRequest((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("/api/requests", {
      fromId: currentUser._id,
      ...newRequest,
    });
    setNewRequest({ toId: "", product: "", message: "" });
    const response = await axios.get(`/api/requests/${currentUser._id}`);
    setRequests(response.data);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Sales App</h1>

      <div className={styles.formContainer}>
        <h2>Send New Request</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            name="toId"
            value={newRequest.toId}
            onChange={handleInputChange}
            placeholder="Recipient ID"
            required
            className={styles.input}
          />
          <input
            type="text"
            name="product"
            value={newRequest.product}
            onChange={handleInputChange}
            placeholder="Product"
            required
            className={styles.input}
          />
          <textarea
            name="message"
            value={newRequest.message}
            onChange={handleInputChange}
            placeholder="Message"
            required
            className={styles.textarea}
          />
          <button type="submit" className={styles.submitButton}>Send Request</button>
        </form>
      </div>

      <div className={styles.requestsContainer}>
        <h2>Incoming Requests</h2>
        {requests.map((request) => (
          <div key={request._id} className={styles.requestCard}>
            <p><strong>From:</strong> {request.from.name} ({request.from.branch})</p>
            <p><strong>Product:</strong> {request.product}</p>
            <p><strong>Message:</strong> {request.message}</p>
            <p><strong>Status:</strong> <span className={styles[request.status]}>{request.status}</span></p>
            {request.status === "pending" && (
              <div className={styles.buttonGroup}>
                <button
                  onClick={() => handleStatusChange(request._id, "accepted")}
                  className={styles.acceptButton}
                >
                  Accept
                </button>
                <button
                  onClick={() => handleStatusChange(request._id, "rejected")}
                  className={styles.rejectButton}
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Request;