import { Card, Checkbox, Group, Text } from '@mantine/core';
import React from 'react';
import classes from './TaskItem.module.scss';
import { ItemI } from '@/models/interfaces/item.interface';
import { checkboxStyle } from '@/utils/shared';

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
                                             }) => (
    <Card shadow="sm" padding="lg" radius="md" withBorder className={`${isSelected ? classes.selectedCard : ''}`}>
        <Group justify="space-between">
            <Group align="center">
                <Checkbox styles={checkboxStyle} checked={isSelected} color="blue" onChange={() => onSelect(task.id)} />
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
                <div className={`material-icons ${classes.icon}`} onClick={() => onDelete(task.id)}>delete</div>
            </Group>
        </Group>
    </Card>);
