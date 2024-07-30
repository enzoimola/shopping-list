import { Box, Button, Group, Loader, LoadingOverlay, Stack, Text, Title } from '@mantine/core';
import React, { useEffect, useRef, useState } from 'react';
import { notifications } from '@mantine/notifications';
import classes from './ShoppingList.module.scss';
import { addNewItem, deleteItem, getItemList, updateItem } from '@/services/item/item.service';
import { ItemI } from '@/models/interfaces/item.interface';
import { TaskItem } from '@/components/atoms/TaskItem/TaskItem';
import { TaskModal } from '@/components/molecules/TaskModal/TaskModal';

export const ShoppingList = () => {
    const [items, setItems] = useState<Array<ItemI>>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedTasks, setSelectedTasks] = useState<Array<number>>([]);
    const [loadingVisible, setLoadingVisible] = useState(false);
    const [modalOpened, setModalOpened] = useState(false);
    const [selectedTask, setSelectedTask] = useState<ItemI | null>();
    const formRef = useRef(); // Crear una referencia para el formulario

    const getShoppingList = async () => {
        try {
            const itemList = await getItemList();
            setItems(itemList);
            setLoading(false);
            setLoadingVisible(false);
            // @ts-ignore
            formRef.current?.reset();
        } catch (e: unknown) {
            setLoading(false);
            setLoadingVisible(false);
            // @ts-ignore
            notifications.show({
                // @ts-ignore
                color: 'red',
            });
        }
    };

    useEffect(() => {
        getShoppingList()
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

    const updateItems = async (values: ItemI) => {
        try {
            const updateResult = await updateItem(values.id, values);
            if (!updateResult) return;
            // @ts-ignore
            // eslint-disable-next-line max-len
            setItems(items.map(item => (item.id === selectedTask.id ? { ...item, ...values } : item)));
        } catch (e) {
            setLoadingVisible(false);
            // @ts-ignore
            notifications.show({
                // @ts-ignore
                message: e.message,
                color: 'red',
            });
        }
    };

    const addItem = async (values: ItemI) => {
        try {
            setLoadingVisible(true);
            const result = await addNewItem(values);
            if (!result.id) return;
            await getShoppingList();
        } catch (e) {
            setLoadingVisible(false);
            // @ts-ignore
            notifications.show({
                // @ts-ignore
                message: e.message,
                color: 'red',
            });
        }
    };

    const handleAddTask = async (values: ItemI) => {
        if (typeof values.quantity === 'string') {
            // eslint-disable-next-line no-param-reassign
            values.quantity = parseInt(values.quantity, 10);
        }
        if (selectedTask) {
            await updateItems(values);
        } else {
            await addItem(values);
        }
        setModalOpened(false);
        setSelectedTask(null);
        // @ts-ignore
        formRef.current?.reset();
    };

    const handleEditTask = (item: ItemI) => {
        setSelectedTask(item);
        setModalOpened(true);
    };

    const handleSelectTask = (id: number) => {
        // eslint-disable-next-line max-len
        setSelectedTasks((prevSelected) => prevSelected.includes(id) ? prevSelected.filter(taskId => taskId !== id) : [...prevSelected, id]);
    };

    const handleOnCloseModal = () => {
        setSelectedTask(null);
        setModalOpened(false);
    };

    const emptyListMessage = <Group className={classes.emptyMessage}>
        <Text size="lg">Your shopping list is empty :(</Text>
        <Button variant="filled" onClick={() => setModalOpened(true)}>Add your first item</Button>
                             </Group>;

    return (<>
        {items.length === 0 && emptyListMessage}
        {items.length > 0 && <Box className={classes.container}>
            <Group className={classes.title}>
                <Title>Your items</Title>
                <Button variant="filled" color="blue" onClick={() => setModalOpened(true)}>Add item</Button>
            </Group>
            <Stack>
                {items.map((task) => (<TaskItem
                  key={task.id}
                  task={task}
                  onDelete={handleDeleteTask}
                  onEdit={handleEditTask}
                  onSelect={handleSelectTask}
                  isSelected={selectedTasks.includes(task.id)}
                />))}
            </Stack>
                             </Box>}
        <TaskModal
          ref={formRef}
          opened={modalOpened}
          onClose={handleOnCloseModal}
          onSubmit={handleAddTask}
          initialValues={selectedTask}
        />
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
