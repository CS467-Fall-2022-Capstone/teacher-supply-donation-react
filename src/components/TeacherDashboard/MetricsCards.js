import React from 'react';
import { Card, Header } from 'semantic-ui-react';

function MetricsCards({
    numStudents,
    numSuppliesWithDonation,
    numSupplies,
    totalSumDonations,
}) {
    return (
        <Card.Group centered itemsPerRow={3}>
            <Card raised color='blue'>
                <Card.Content>
                    <Card.Header as={Header} color='blue' size='huge'>
                        {numStudents}
                    </Card.Header>
                </Card.Content>
                <Card.Content extra># Students Donated</Card.Content>
            </Card>
            <Card raised color='blue'>
                <Card.Content>
                    <Card.Header as={Header} color='blue' size='huge'>
                        {numSuppliesWithDonation} / {numSupplies}
                    </Card.Header>
                </Card.Content>
                <Card.Content extra>Supplies with Donation</Card.Content>
            </Card>
            <Card raised color='blue'>
                <Card.Content>
                    <Card.Header as={Header} color='blue' size='huge'>
                        {totalSumDonations}
                    </Card.Header>
                </Card.Content>
                <Card.Content extra>Donated Grand Total</Card.Content>
            </Card>
        </Card.Group>
    );
}

export default MetricsCards;
