'use client';

import { useRef } from 'react';

import { Box } from 'styled-system/jsx';
import { Scene } from '@/components/scene';

export function ThreeProvider({ children }) {
    const ref = useRef();

    return (
        <Box
          ref={ref}
          pos={'relative'}
          w={'full'}
          h={'full'}
          overflow={'auto'}
          touchAction={'auto'}
        >
            {children}
            <Scene
              pos={'fixed'}
              top={'0'}
              left={'0'}
              w={'100vw'}
              h={'100vh'}
              zIndex={'background'}
              pointerEvents={'none'}
              eventSource={ref}
              eventPrefix={'client'}
            />
        </Box>
    )
}