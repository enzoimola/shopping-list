import { Box, Burger, Divider, Drawer, Group, rem, ScrollArea, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Link from 'next/link';
import React from 'react';
import classes from './Header.module.scss';

export const Header = () => {
    const [drawerOpened, {
        toggle: toggleDrawer,
        close: closeDrawer,
    }] = useDisclosure(false);
    return (<Box>
            <header className={classes.header}>
                <Group justify="space-between" h="100%">

                    <Group h="100%" gap={0} visibleFrom="sm">
                        <Link href={{ pathname: '/' }} className={classes.link}>
                            <Title order={4} className={classes.title}>Shopping List</Title>
                        </Link>
                    </Group>

                    <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" color="white" />
                </Group>
            </header>

            <Drawer
              opened={drawerOpened}
              onClose={closeDrawer}
              size="100%"
              padding="md"
              title="Shopping list"
              position="right"
              hiddenFrom="sm"
              zIndex={1000000}
            >
                <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
                    <Divider my="sm" />
                    <Link href={{ pathname: '/' }} className={classes.link}>Home</Link>
                </ScrollArea>
            </Drawer>
            </Box>);
};
