import { Button, Card, Checkbox, Group, Text } from '@mantine/core';
import React from 'react';
import classes from './TaskItem.module.scss';
import { ItemI } from '@/models/interfaces/item.interface';

type TaskItem = {
    task: ItemI,
    onDelete: (id: number) => void,
    onSelect: (id: number) => void,
    isSelected: boolean,
};
const style = { input: { cursor: 'pointer' } };
export const TaskItem: React.FC<TaskItem> = ({
                             task,
                             onDelete,
                             onSelect,
                             isSelected,
                         }) => (
     <Card shadow="sm" padding="lg" radius="md" withBorder className={`${isSelected ? classes.selectedCard : ''}`}>
        <Group justify="space-between">
            <Group align="center">
                <Checkbox styles={style} checked={isSelected} color="blue" onChange={() => onSelect(task.id)} />
                <div>
                    <Text size="lg" td={`${task.purchased ? 'line-through' : ''}`} className={classes.cardName}>{task.name}</Text>
                    <Text td={`${task.purchased ? 'line-through' : ''}`}>{task.description}</Text>
                </div>
            </Group>
            <Group>
                <div className={`material-icons ${classes.icon}`}>edit</div>
                <div className={`material-icons ${classes.icon}`} onClick={() => onDelete(task.id)}>delete</div>
            </Group>
        </Group>
     </Card>
);
