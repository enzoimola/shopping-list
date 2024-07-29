import { Suspense, useEffect, useState } from 'react';

const useLocalStorageData = () => {
    const getValueFromLS = (key: string) : number => {
        const storedValue = localStorage.getItem(key);
        return storedValue ? JSON.parse(storedValue) : 0;
    };

    // const [storedValue, setStoredValue] = useState(initialValue);

    const setValue = (key: string, initialValue: number) => {
        // setStoredValue(initialValue);
        localStorage.setItem(key, JSON.stringify(initialValue));
    };

    return [setValue, getValueFromLS];
};

const [setValue] = useLocalStorageData('token', 123123);

setValue();

useEffect(() => {
    setValue('asdsada');
}, []);

/////////

    const data = [
        {
            _id: '662a5278c055611c3eaa9ee0',
            parentIs: [],
        },
        {
            _id: '662a5278c055611c3eaa9ee1',
            parentIs: ['662a5278c055611c3eaa9ee0'],
        },
        {
            _id: '662a5278c055611c3eaa9ee2',
            parentIs: ['662a5278c055611c3eaa9ee1'],
        },
        {
            _id: '662a5278c055611c3eaa9ee3',
            parentIs: ['662a5278c055611c3eaa9ee2'],
        },
        {
            _id: '662a5278c055611c3eaa9ee4',
            parentIs: ['662a5278c055611c3eaa9ee3'],
        },
        {
            _id: '662a5278c055611c3eaa9ee5',
            parentIs: ['662a5278c055611c3eaa9ee4'],
        },
    ];

    const findAncestors = (items, id) => {
        const item = items.find((item) => item._id === id);

        if (!item) {
            return [];
        }

        const ancestors = item.parentIs.reduce((result, parentId) => {
            //search ancestors
            const parentAncestor = findAncestors(items, parentId);
            return result.concat(parentAncestor, parentId);
        }, []);

        return ancestors;
    };

    const result = findAncestors(data, '662a5278c055611c3eaa9ee4');
