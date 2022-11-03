import React, { useState } from 'react';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';
import { FaTrashAlt } from 'react-icons/fa';

function DeleteModal({ supply, onDelete }) {
    const [open, setOpen] = useState(false);
    const handleDelete = (id) => {
        onDelete(id);
        setOpen(false);
    };

    return (
        <Modal
            basic
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            size='small'
            trigger={<FaTrashAlt as='button' color='red' />}
        >
            <Header icon>
                <Icon name='trash alternate' />
                Confirm Item Deletion
            </Header>
            <Modal.Content>
                <Header as='h3' inverted>
                    Are you sure you want to delete {supply.item} from the list?
                </Header>
            </Modal.Content>
            <Modal.Actions>
                <Button inverted onClick={() => setOpen(false)}>
                    <Icon name='remove' /> Cancel
                </Button>
                <Button
                    color='red'
                    inverted
                    onClick={() => handleDelete(supply._id)}
                >
                    <Icon name='checkmark' /> Delete Item
                </Button>
            </Modal.Actions>
        </Modal>
    );
}

export default DeleteModal;
