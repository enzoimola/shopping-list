import { Card, Checkbox, Group, Text } from '@mantine/core';
import React, { useState } from 'react';
import classes from './TaskItem.module.scss';
import { ItemI } from '@/models/interfaces/item.interface';
import { checkboxStyle } from '@/utils/shared';
import { DeleteModal } from '@/components/molecules/DeleteModal/DeleteModal';

type TaskItem = {
    task: ItemI,
    onDelete: (id: number) => void,
    onEdit: (item: ItemI) => void,
    onSelect: (id: number) => void,
    isSelected: boolean,
};
export const TaskItem: React.FC<TaskItem> = ({
                                                 task,
                                                 onDelete,
                                                 onSelect,
                                                 onEdit,
                                                 isSelected,
                                             }) => {
    const [deleteModalOpened, setDeleteModalOpened] = useState(false);

    return (
        <>
        <Card shadow="sm" padding="lg" radius="md" withBorder className={`${isSelected ? classes.selectedCard : ''}`}>
            <Group justify="space-between">
                <Group align="center">
                    <Checkbox
                      styles={checkboxStyle}
                      checked={isSelected}
                      color="blue"
                      onChange={() => onSelect(task.id)}
                    />
                    <div>
                        <Text
                          size="lg"
                          td={`${task.purchased ? 'line-through' : ''}`}
                          className={`${classes.cardName} ${isSelected ? classes.selected : ''}`}
                        >{task.name}
                        </Text>
                        <Text
                          td={`${task.purchased ? 'line-through' : ''}`}
                          className={classes.description}
                        >{task.description}
                        </Text>
                    </div>
                </Group>
                <Group>
                    <div className={`material-icons ${classes.icon}`} onClick={() => onEdit(task)}>edit</div>
                    <div className={`material-icons ${classes.icon}`} onClick={() => setDeleteModalOpened(true)}>delete</div>
                </Group>
            </Group>
        </Card>
            <DeleteModal
              opened={deleteModalOpened}
              onClose={() => setDeleteModalOpened(false)}
              onConfirm={() => onDelete(task.id)}
            />
        </>
            );
};
