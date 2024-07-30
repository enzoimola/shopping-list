import { Box, Button, Group, Loader, LoadingOverlay, Stack, Text, Title } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { notifications } from '@mantine/notifications';
import classes from './ShoppingList.module.scss';
import { deleteItem, getItemList } from '@/services/item/item.service';
import { ItemI } from '@/models/interfaces/item.interface';
import { TaskItem } from '@/components/atoms/TaskItem/TaskItem';

export const ShoppingList = () => {
    const [items, setItems] = useState<Array<ItemI>>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedTasks, setSelectedTasks] = useState<Array<number>>([]);
    const [loadingVisible, setLoadingVisible] = useState(false);

    const getStations = async () => {
        try {
            const itemList = await getItemList();
            setItems(itemList);
            setLoading(false);
        } catch (e: unknown) {
            setLoading(false);
            // @ts-ignore
            notifications.show({
                // @ts-ignore
                color: 'red',
            });
        }
    };

    useEffect(() => {
        getStations()
            .then();
    }, []);

    if (loading) {
        return (<Loader
          color="blue"
        />);
    }

    const handleDeleteTask = async (id: number) => {
        try {
            setLoadingVisible(true);
            const result = await deleteItem(id);
            if (!result) {
                return;
            }
            setItems(items.filter(item => item.id !== id));
            setLoadingVisible(false);
        } catch (e: unknown) {
            setLoadingVisible(false);
            // @ts-ignore
            notifications.show({
                // @ts-ignore
                message: e.message,
                color: 'red',
            });
        }
    };

    const handleSelectTask = (id: number) => {
        // eslint-disable-next-line max-len
        setSelectedTasks((prevSelected) => prevSelected.includes(id) ? prevSelected.filter(taskId => taskId !== id) : [...prevSelected, id]);
    };

    const emptyListMessage = <Group className={classes.emptyMessage}>
        <Text size="lg">Your shopping list is empty :(</Text>
        <Button variant="filled">Add your first item</Button>
                             </Group>;

    return (<>
        {items.length === 0 && emptyListMessage}
        {items.length > 0 && <Box className={classes.container}>
            <Group className={classes.title}>
                <Title>Your items</Title>
                <Button variant="filled" color="blue">Add item</Button>
            </Group>
            <Stack>
                {items.map((task) => (<TaskItem
                  key={task.id}
                  task={task}
                  onDelete={handleDeleteTask}
                  onSelect={handleSelectTask}
                  isSelected={selectedTasks.includes(task.id)}
                />))}
            </Stack>
                             </Box>}
        <LoadingOverlay
          visible={loadingVisible}
          zIndex={1000}
          overlayProps={{
                radius: 'sm',
                blur: 2,
            }}
          loaderProps={{ color: 'blue' }}
        />
            </>);
};
