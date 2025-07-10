import React, { useState, useEffect } from "react";
import axios from "axios";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const authToken = "your_auth_token"; // Replace with actual authentication token

  useEffect(() => {
    // Function to fetch messages
    const fetchMessages = async () => {
      try {
        const response = await axios.get("https://example.com/api/messages", {
          headers: {
            Authorization: `Bearer ${authToken}`, // Attach auth token
            "Content-Type": "application/json",
          },
        });
        
        setMessages(response.data); // Store messages in state
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages(); // Call the function when the component mounts
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Messages</h2>
      <ul className="list-disc pl-5">
        {messages.length > 0 ? (
          messages.map((msg, index) => (
            <li key={index} className="mb-2">
              <strong>{msg.sender}:</strong> {msg.message}
            </li>
          ))
        ) : (
          <p>No messages found.</p>
        )}
      </ul>
    </div>
  );
};

export default Messages;
