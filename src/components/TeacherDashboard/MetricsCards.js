import React from 'react';
import { Card, Header } from 'semantic-ui-react';

function MetricsCards({numStudents, totalNumDonations}) {

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
                    <Card.Header as={Header} color='blue' size='huge'>{totalNumDonations}</Card.Header>
                    <Card.Meta>Total # of Donated Supplies</Card.Meta>
                </Card.Content>
            </Card>
        </Card.Group>
    );
}

export default MetricsCards;
