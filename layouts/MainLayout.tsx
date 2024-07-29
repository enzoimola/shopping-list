import { AppShell } from '@mantine/core';
import { PropsWithChildren } from 'react';
import { Header } from '@/components/molecules/Header/Header';

export const MainLayout: React.FC<PropsWithChildren> = ({ children }) => (
        <AppShell
          header={{ height: 60 }}
          padding="md"
        >
            <AppShell.Header>
                <Header />
            </AppShell.Header>
            <AppShell.Main pt={80}>
                {children}
            </AppShell.Main>
        </AppShell>
    );
