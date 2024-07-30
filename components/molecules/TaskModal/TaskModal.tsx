import React, { forwardRef, useEffect, useImperativeHandle } from 'react';
import { Button, Checkbox, Group, Modal, Select, Stack, Text, Textarea, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import classes from './TaskModal.module.scss';
import { checkboxStyle } from '@/utils/shared';

export const TaskModal: React.ForwardRefExoticComponent<React.PropsWithoutRef<{
    readonly initialValues?: any; readonly onClose?: any; readonly onSubmit?: any; readonly opened?: any;
}> & React.RefAttributes<unknown>> = forwardRef(({
                                                     opened,
                                                     onClose,
                                                     onSubmit,
                                                     initialValues,
                                                 }, ref) => {
    const form = useForm({
        initialValues: initialValues || {
            name: '',
            description: '',
            quantity: null,
            purchased: false,
        },
    });

    // @ts-ignore
    useImperativeHandle(ref, () => ({
        reset: () => form.reset(),
    }));

    useEffect(() => {
        if (initialValues) {
            form.setValues(initialValues);
        }
    }, [initialValues]);

    const handleClose = () => {
        form.reset();
        onClose();
    };

    const isFormValid = form.values.name.trim() && form.values.description.trim() && form.values.quantity;

    return (<Modal
      opened={opened}
      onClose={handleClose}
      title="SHOPPING LIST"
      className={classes.container}
      classNames={{
          header: classes.header,
          body: classes.body,
      }}
    >
            <form onSubmit={form.onSubmit(onSubmit)}>
                <Stack>
                    <Title order={4} className={classes.title}>
                        {initialValues ? 'Edit an item' : 'Add an item'}
                    </Title>
                    <Text size="md" className={classes.subtitle}>

                        {initialValues ? 'Edit your item below' : 'Add your new item below'}

                    </Text>
                    <TextInput
                      placeholder="Item Name"
                      {...form.getInputProps('name')}
                    />
                    <Textarea
                      placeholder="Description"
                      minRows={3}
                      maxLength={100}
                      {...form.getInputProps('description')}
                    />
                    <Select
                      placeholder="How many?"
                      data={['1', '2', '3']}
                      {...form.getInputProps('quantity')}
                    />
                    {initialValues && <Checkbox
                      label="Purchased"
                      color="blue"
                      styles={checkboxStyle}
                      {...form.getInputProps('purchased', { type: 'checkbox' })}
                    />}

                    <Group className={classes.actions}>
                        <Button variant="default" onClick={handleClose}>Cancel</Button>
                        <Button type="submit" color="blue" disabled={!isFormValid}>
                            {initialValues ? 'Save item' : 'Add task'}
                        </Button>
                    </Group>
                </Stack>
            </form>
            </Modal>);
});
