import React from 'react';
import { Flex } from '@mantine/core';
import { MainLayout } from '@/layouts/MainLayout';
import { Home } from '@/components/organisms/Home/Home';

// @ts-ignore
const HomePage: React.FC = () => (<MainLayout>
    <Flex direction="column" gap="sm" justify="center" maw={960} mx="auto">
        <Home />
    </Flex>
                                  </MainLayout>);

export default HomePage;
