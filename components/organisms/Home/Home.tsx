import React from 'react';
import { Group } from '@mantine/core';
import { ShoppingList } from '@/components/molecules/ShoppingList/ShoppingList';
import classes from './Home.module.scss';

export const Home: React.FC = () => (<>
        <Group className={classes.container}>
            <ShoppingList />
        </Group>
                                     </>);
