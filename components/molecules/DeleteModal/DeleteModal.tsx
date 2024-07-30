import React from 'react';
import { Modal, Button, Group, Text, Title } from '@mantine/core';
import classes from './DeleteModal.module.scss';

type DeleteModalProps = {
    opened: boolean;
    onClose: () => void;
    onConfirm: () => void;
};

export const DeleteModal: React.FC<DeleteModalProps> = ({ opened, onClose, onConfirm }) => (
        <Modal
          opened={opened}
          onClose={onClose}
          title={<span className={classes.title}>Delete Item?</span>}
          className={classes.container}
        >
            <Text size="md">Are you sure you want to delete this item? This can not be undone.</Text>
            <Group mt="md" className={classes.actions}>
                <Button variant="subtle" color="black" onClick={onClose}>Cancel</Button>
                <Button color="blue" onClick={onConfirm}>Delete</Button>
            </Group>
        </Modal>
    );
