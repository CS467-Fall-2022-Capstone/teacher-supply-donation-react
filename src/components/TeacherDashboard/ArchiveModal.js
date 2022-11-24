import React, { useState } from 'react';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';
import TeacherService from '../../services/teacher.service'

function ArchiveModal({ metrics, supplies, teacher, setSupplies }) {
    const [open, setOpen] = useState(false);
    const handleArchive = async () => {
        try{
            const response = await TeacherService.archiveSupplyData(teacher);
            if (response.status === 200) {
                setSupplies([])
            }
        } catch (err) {
            console.error(err)
            setOpen(false)
        }
    };

    return (
        <Modal
            basic
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            size='small'
            trigger={
                <Button icon labelPosition='left' color='red'>
                    <Icon name='archive' />
                    Reset/Archive Supplies & Donations
                </Button>
            }
        >
            <Header icon>
                <Icon name='archive' />
                Confirm Supplies and Donations Archive
            </Header>
            <Modal.Content>
                <Header as='h3' inverted>
                    Are you sure you want to archive {supplies} supplies &{' '}
                    {metrics} donations?
                </Header>
            </Modal.Content>
            <Modal.Actions>
                <Button inverted onClick={() => setOpen(false)}>
                    <Icon name='remove' /> Cancel
                </Button>
                <Button
                    icon
                    labelPosition='left'
                    positive
                    onClick={() => handleArchive()}
                >
                    <Icon name='archive' />
                    Confirm Archive
                </Button>
            </Modal.Actions>
        </Modal>
    );
}

export default ArchiveModal;
