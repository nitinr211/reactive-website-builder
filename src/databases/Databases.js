import React from 'react';
import { Table, Container } from 'reactstrap';

const Databases = () => {
    // Sample data for the databases
    const databaseList = [
        { id: 1, name: 'UserDB', type: 'SQL', size: '250 MB', status: 'Active' },
        { id: 2, name: 'OrdersDB', type: 'NoSQL', size: '500 MB', status: 'Active' },
        { id: 3, name: 'InventoryDB', type: 'SQL', size: '300 MB', status: 'Inactive' },
        { id: 4, name: 'AnalyticsDB', type: 'NoSQL', size: '1 GB', status: 'Active' },
        { id: 5, name: 'LogsDB', type: 'SQL', size: '150 MB', status: 'Active' },
    ];

    return (
        <Container>
            <h2 className="mt-4">Databases</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Size</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {databaseList.map((db) => (
                        <tr key={db.id}>
                            <td>{db.id}</td>
                            <td>{db.name}</td>
                            <td>{db.type}</td>
                            <td>{db.size}</td>
                            <td>{db.status}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default Databases;
