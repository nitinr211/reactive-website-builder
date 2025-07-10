import React, { useState, useEffect } from 'react';
import { Table, Container, Row, Col, Button, Input } from 'reactstrap';
import Dashboard from './Dashboard';

const sampleDataByDate = {
  '2025-05-25': [
    { category: 'Dropshipping', name: 'Wireless Earbuds', details: 'TechSupply | $25 | $15 margin | $100 budget', performance: '', feedback: '' },
    { category: 'FBA Arbitrage', name: 'Bluetooth Speaker', details: 'RetailStoreA | $35 → $50 | $10 profit', performance: '', feedback: '' },
  ],
  '2025-05-24': [
    { category: 'SaaS Companies', name: 'CloudSync', details: 'Cloud Storage | $500K revenue | 50K users', performance: '', feedback: '' },
    { category: 'Remote Jobs', name: 'Digital Marketer', details: 'Ecom Solutions | Remote | $75K', performance: '', feedback: '' },
  ],
};

const UnifiedMetrics = () => {
  const [selectedDate, setSelectedDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [earnings, setEarnings] = useState(1200);
  const [allData, setAllData] = useState([]);

  useEffect(() => {
    // Load data based on selectedDate (simulate from map or fetch)
    const data = sampleDataByDate[selectedDate] || [];
    setAllData(data);
  }, [selectedDate]);

  const getAIFeedback = (category, name, details, performance) => {
    let base = '';
    if (category === 'Dropshipping') base = '🔥 Test on TikTok – optimize creative + upsell.';
    else if (category === 'FBA Arbitrage') base = '🛒 Check competition on Amazon – automate restock.';
    else if (category === 'SaaS Companies') base = '📈 Consider MRR scaling or feature-based pricing.';
    else if (category === 'YouTube Channels') base = '🎥 Turn viral videos into affiliate funnels.';
    else if (category === 'Remote Jobs') base = '💼 Apply fast – layer in portfolio links + GitHub.';
    else if (category === 'Software Contracts') base = '📩 Follow up via LinkedIn/email – add case studies.';
    else base = '✅ Keep iterating + track results weekly.';

    if (performance) {
      base += ` | Performance Insight: Based on "${performance}", consider adjusting ad spend or targeting.`;
    }

    return base;
  };

  const handlePerformanceChange = (index, value) => {
    const updated = [...allData];
    updated[index].performance = value;
    updated[index].feedback = getAIFeedback(updated[index].category, updated[index].name, updated[index].details, value);
    setAllData(updated);
  };

  return (
    <div>
      <Container>
        <Row className="mb-3">
          <Col md="4">
            <label htmlFor="calendar">Select Date:</label>
            <Input
              id="calendar"
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </Col>
          <Col md="8">
            <h2>Unified Opportunity Table</h2>
            <h4>Earnings on {selectedDate}: ${earnings}</h4>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Name</th>
                  <th>Details</th>
                  <th>Performance Notes</th>
                  <th>AI Feedback</th>
                </tr>
              </thead>
             // Inside return(), below your existing table rows
<tbody>
  {allData.length > 0 ? (
    allData.map((item, index) => (
      <tr key={index}>
        <td>
          <Input
            type="text"
            value={item.category}
            onChange={(e) => {
              const updated = [...allData];
              updated[index].category = e.target.value;
              setAllData(updated);
            }}
            placeholder="Category"
          />
        </td>
        <td>
          <Input
            type="text"
            value={item.name}
            onChange={(e) => {
              const updated = [...allData];
              updated[index].name = e.target.value;
              setAllData(updated);
            }}
            placeholder="Name"
          />
        </td>
        <td>
          <Input
            type="text"
            value={item.details}
            onChange={(e) => {
              const updated = [...allData];
              updated[index].details = e.target.value;
              setAllData(updated);
            }}
            placeholder="Details"
          />
        </td>
        <td>
          <Input
            type="text"
            value={item.performance}
            onChange={(e) => handlePerformanceChange(index, e.target.value)}
            placeholder="Performance Notes"
          />
        </td>
        <td>{item.feedback || getAIFeedback(item.category, item.name, item.details, item.performance)}</td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="5" className="text-center">No data for selected date</td>
    </tr>
  )}
</tbody>

            </Table>
            <div className="text-center my-3">
  <Button color="success" onClick={() => {
    setAllData([
      ...allData,
      { category: '', name: '', details: '', performance: '', feedback: '' },
    ]);
  }}>
    + Add New
  </Button>
</div>

          </Col>
        </Row>
      </Container>
      <Dashboard />
    </div>
  );
};

export default UnifiedMetrics;
