import React from 'react';
import { Card, Header } from 'semantic-ui-react';

function MetricsCards({
    numStudents,
    numSuppliesWithDonation,
    numSupplies,
    totalSumDonations,
}) {
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
                    <Card.Header as={Header} color='blue' size='huge'>
                        {numSuppliesWithDonation} / {numSupplies}
                    </Card.Header>
                    <Card.Meta>Supplies with Donation</Card.Meta>
                </Card.Content>
            </Card>
            <Card raised color='orange'>
                <Card.Content textAlign='left'>
                    <Card.Header as={Header} color='blue' size='huge'>
                        {totalSumDonations}
                    </Card.Header>
                    <Card.Meta>Total # of Donated Supplies</Card.Meta>
                </Card.Content>
            </Card>
        </Card.Group>
    );
}

export default MetricsCards;
