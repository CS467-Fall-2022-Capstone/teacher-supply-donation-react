import React from 'react';
import { Card, Header } from 'semantic-ui-react';

function MetricsCards() {
    // Test Data, delete once integrated with back-end
    const numStudents = 25;
    const numDonations = 50;

    return (
        <Card.Group centered>
            <Card raised color='orange'>
                <Card.Content textAlign='left'>
                    <Card.Header as={Header} color='blue' size='huge'>
                        {numStudents}
                    </Card.Header>
                    <Card.Meta># Students Who Have Donated</Card.Meta>
                </Card.Content>
            </Card>
            <Card raised color='orange'>
                <Card.Content textAlign='left'>
                    <Card.Header as={Header} color='blue' size='huge'>{numDonations}</Card.Header>
                    <Card.Meta>Total # of Donated Supplies</Card.Meta>
                </Card.Content>
            </Card>
        </Card.Group>
    );
}

export default MetricsCards;
