import React from 'react';
import { Card } from 'semantic-ui-react';

function MetricsCards() {
    // Test Data, delete once integrated with back-end
    const numStudents = 25;
    const numDonations = 50;

    return (
        <Card.Group centered textAlign='left'>
            <Card raised color='orange'>
                <Card.Content>
                    <Card.Header>{numStudents}</Card.Header>
                    <Card.Meta># Students Who Have Donated</Card.Meta>
                </Card.Content>
            </Card>
            <Card raised color='orange'>
                <Card.Content>
                    <Card.Header>{numDonations}</Card.Header>
                    <Card.Meta>Total # of Donated Supplies</Card.Meta>
                </Card.Content>
            </Card>
        </Card.Group>
    );
}

export default MetricsCards;
