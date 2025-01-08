import React, { useState } from 'react';
import { Table, Container, Row, Col, Badge, Button } from 'reactstrap';

const Metrics = () => {
  const [ads, setAds] = useState([
    {
      id: 1,
      adName: 'Ad Campaign 1',
      impressions: 1000,
      clicks: 150,
      conversionRate: 0.15,
      cpc: 0.50,
      cpa: 20,
      ctr: 15,
      mediaUrl: 'https://www.example.com/video1.mp4',
      mediaType: 'video', // Can be 'video' or 'photo'
      description: 'Promoting our latest product launch with a video.',
      isRunning: false,
    },
    {
      id: 2,
      adName: 'Ad Campaign 2',
      impressions: 800,
      clicks: 120,
      conversionRate: 0.20,
      cpc: 0.70,
      cpa: 25,
      ctr: 12,
      mediaUrl: 'https://www.example.com/photo1.jpg',
      mediaType: 'photo', // Can be 'video' or 'photo'
      description: 'Highlighting our seasonal discount campaign.',
      isRunning: false,
    },
    // Add more ads here
  ]);

  const startAd = (id, concept) => {
    fetch(`/meta-api/start-ad/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ concept }),
    })
      .then(response => response.json())
      .then(data => {
        setAds(ads.map(ad => (ad.id === id ? { ...ad, isRunning: true } : ad)));
        console.log('Ad started successfully:', data);
      })
      .catch(error => console.error('Error starting ad:', error));
  };

  const stopAd = id => {
    fetch(`/meta-api/stop-ad/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(response => response.json())
      .then(data => {
        setAds(ads.map(ad => (ad.id === id ? { ...ad, isRunning: false } : ad)));
        console.log('Ad stopped successfully:', data);
      })
      .catch(error => console.error('Error stopping ad:', error));
  };

  const checkAndStopAds = () => {
    ads.forEach(ad => {
      if (ad.cpc > 1 || ad.ctr < 10 || ad.cpa > 30) {
        stopAd(ad.id);
      }
    });
  };



  const BusinessConcept = () => {
    return (
      <Container fluid className="bg-light py-5">
        <Row className="align-items-center">
          <Col md="6">
            <h1 className="display-4 text-primary">Business Concept</h1>
            <p className="lead mt-4">
              We specialize in creating innovative ad campaigns tailored for businesses across various niches, including 
              <strong> E-commerce, Technology, Health & Wellness, Education, </strong> and <strong>Finance</strong>. 
              Our mission is to maximize visibility, engagement, and conversions through dynamic advertising strategies.
            </p>
            <p>
              Using cutting-edge tools and actionable metrics, we design ads that resonate with your audience. Whether it's a 
              captivating video or a stunning image, our campaigns are tailored to your unique business needs.
            </p>
            <Button color="primary" size="lg" className="mt-3">
             View the business homepage here
            </Button>
          </Col>
          <Col md="6">
            <img
              src="https://via.placeholder.com/600x400"
              alt="Business Concept Visual"
              className="img-fluid rounded shadow"
            />
          </Col>
        </Row>
      </Container>
    );
  };
  return (
    <Container>
      <BusinessConcept/>
      <Row>
        <Col>
          <h2>Ad Performance</h2>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Ad Name</th>
                <th>Description</th>
                <th>Impressions</th>
                <th>Clicks</th>
                <th>Conversion Rate (%)</th>
                <th>CPC ($)</th>
                <th>CTR (%)</th>
                <th>CPA ($)</th>
                <th>Media</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {ads.map(ad => (
                <tr key={ad.id}>
                  <td>{ad.id}</td>
                  <td>{ad.adName}</td>
                  <td>{ad.description}</td>
                  <td>{ad.impressions}</td>
                  <td>{ad.clicks}</td>
                  <td>{(ad.conversionRate * 100).toFixed(2)}</td>
                  <td>{ad.cpc.toFixed(2)}</td>
                  <td>{ad.ctr}</td>
                  <td>{ad.cpa.toFixed(2)}</td>
                  <td>
                    {ad.mediaType === 'video' ? (
                      <video controls width="100" height="100">
                        <source src={ad.mediaUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <img
                        src={ad.mediaUrl}
                        alt={ad.adName}
                        style={{ width: '100px', height: '100px' }}
                      />
                    )}
                  </td>
                  <td>{ad.isRunning ? 'Running' : 'Stopped'}</td>
                  <td>
                    <Button
                      color="success"
                      onClick={() => startAd(ad.id, 'Sample Concept')}
                      disabled={ad.isRunning}
                    >
                      Start
                    </Button>{' '}
                    <Button
                      color="danger"
                      onClick={() => stopAd(ad.id)}
                      disabled={!ad.isRunning}
                    >
                      Stop
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button color="primary" onClick={checkAndStopAds}>
            Check & Stop Ads
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Metrics;
