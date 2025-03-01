import React, { useState, useEffect } from 'react';
import { Table, Container, Row, Col, Button, Nav, NavItem, NavLink } from 'reactstrap';

const Metrics = () => {
  const [activeTab, setActiveTab] = useState('dropshipping');
  const [earnings, setEarnings] = useState(1200);
  const [data, setData] = useState({
    dropshipping: [
      { productname: 'Wireless Earbuds', supplier: 'TechSupply', price: '$25', margin: '$15', budget: '$100' },
      { productname: 'Smart Watch', supplier: 'GadgetWorld', price: '$40', margin: '$20', budget: '$200' }
    ],
    fbaWholesale: [
      { productname: 'Organic Protein Powder', supplier: 'HealthCorp', price: '$30', margin: '$12' },
      { productname: 'Reusable Water Bottle', supplier: 'EcoGoods', price: '$18', margin: '$8' }
    ],
    fbaArbitrage: [
      { productname: 'Bluetooth Speaker', source: 'RetailStoreA', price: '$35', amazonprice: '$50', profit: '$10' },
      { productname: 'Gaming Mouse', source: 'RetailStoreB', price: '$20', amazonprice: '$35', profit: '$8' }
    ],
    softwareContracts: [
      { contractname: 'E-commerce Website', client: 'RetailBrandX', budget: '$5000', duration: '2 months' },
      { contractname: 'Mobile App Development', client: 'StartupY', budget: '$8000', duration: '3 months' }
    ],
    remoteJobs: [
      { jobtitle: 'Frontend Developer', company: 'Tech Innovators', location: 'Remote', salary: '$90K' },
      { jobtitle: 'Digital Marketer', company: 'Ecom Solutions', location: 'Remote', salary: '$75K' }
    ],
    saasCompanies: [
      { companyname: 'CloudSync', product: 'Cloud Storage', revenue: '$500K', users: '50K' },
      { companyname: 'AI Helper', product: 'AI Chatbot', revenue: '$750K', users: '70K' }
    ],
    youtubeChannels: [
      { channelname: 'Tech Reviews', niche: 'Technology', subscribers: '100K', revenue: '$10K' },
      { channelname: 'Daily Vlogs', niche: 'Lifestyle', subscribers: '200K', revenue: '$15K' }
    ]
  });

  const addNewItem = (key) => {
    console.log(`Adding new item to ${key}`);
  };

  const addCreative = (product) => {
    console.log(`Adding creative to product: ${product.productname}`);
  };

  const setBudget = (product) => {
    console.log(`Setting budget for product: ${product.productname}`);
  };

  const renderTable = (key, columns, actions = []) => (
    <>
      <Button color="primary" className="mb-2" onClick={() => addNewItem(key)}>Add New</Button>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            {columns.map(col => <th key={col}>{col}</th>)}
            {actions.length > 0 && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data[key].map((item, index) => (
            <tr key={index}>
              {columns.map(col => <td key={col}>{item[col.toLowerCase().replace(/ /g, '')]}</td>)}
              {actions.length > 0 && (
                <td>
                  {actions.map(action => (
                    <Button key={action.label} color={action.color} onClick={() => action.onClick(item)}>
                      {action.label}
                    </Button>
                  ))}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );

  return (
    <Container>
      <Row>
        <Col>
          <h2>Business & Opportunity Management</h2>
          <h4>Today's Earnings: ${earnings}</h4>
          <Nav tabs>
            {['dropshipping', 'fbaWholesale', 'fbaArbitrage', 'softwareContracts', 'remoteJobs', 'saasCompanies','youtubeChannels'].map(tab => (
              <NavItem key={tab}>
                <NavLink
                  href="#"
                  active={activeTab === tab}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.replace(/([A-Z])/g, ' $1').trim()}
                </NavLink>
              </NavItem>
            ))}
          </Nav>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col>
          {activeTab === 'dropshipping' && renderTable('dropshipping', ['Product Name', 'Supplier', 'Price', 'Margin', 'Budget'], [
            { label: 'Start', color: 'success', onClick: item => console.log('Starting', item) },
            { label: 'Add Creative', color: 'info', onClick: item => addCreative(item) },
            { label: 'Set Budget', color: 'warning', onClick: item => setBudget(item) }
          ])}
          {activeTab === 'fbaWholesale' && renderTable('fbaWholesale', ['Product Name', 'Supplier', 'Price', 'Margin'], [
            { label: 'List', color: 'primary', onClick: item => console.log('Listing', item) },
            { label: 'Source', color: 'info', onClick: item => console.log('Sourcing', item) }
          ])}
          {activeTab === 'fbaArbitrage' && renderTable('fbaArbitrage', ['Product Name', 'Source', 'Price', 'Amazon Price', 'Profit'])}
          {activeTab === 'softwareContracts' && renderTable('softwareContracts', ['Contract Name', 'Client', 'Budget', 'Duration'], [
            { label: 'Follow-up Email', color: 'warning', onClick: item => console.log('Following up', item) }
          ])}
          {activeTab === 'remoteJobs' && renderTable('remoteJobs', ['Job Title', 'Company', 'Location', 'Salary'], [
            { label: 'Apply', color: 'success', onClick: item => console.log('Applying', item) }
          ])}
          {activeTab === 'saasCompanies' && renderTable('saasCompanies', ['Company Name', 'Product', 'Revenue', 'Users'])}
          {activeTab === 'youtubeChannels' && renderTable('youtubeChannels', ['Channel Name', 'Niche', 'Subscribers', 'Revenue'])}
        </Col>
      </Row>
    </Container>
  );
};

export default Metrics;
