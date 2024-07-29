import React, { useState } from 'react';
import { Box, Group, LoadingOverlay } from '@mantine/core';

export const Home: React.FC = () => {
    const [loadingVisible, setLoadingVisible] = useState(false);

    return (<>
        <Box pos="relative">
            <LoadingOverlay
              visible={loadingVisible}
              zIndex={1000}
              overlayProps={{
                    radius: 'sm',
                    blur: 2,
                }}
              loaderProps={{
                    color: 'blue',
                    type: 'bars',
                }}
            />

            <Group>
                <h1>Home content</h1>
            </Group>
        </Box>
            </>);
};
