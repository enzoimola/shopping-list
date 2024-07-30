import { ApiUrls } from '@/enums/api/api';
import { createApiMiddleware } from '@/services/createApiMiddleware';
import { ItemI } from '@/models/interfaces/item.interface';

export const getItemList = async (): Promise<Array<ItemI>> => {
    try {
        const api = createApiMiddleware();
        const { data } = await api.get(ApiUrls.GET_LIST);
        return data;
    } catch (error) {
        // @ts-ignore
        throw new Error(error.response.data.message);
    }
};

export const deleteItem = async (id: number): Promise<boolean> => {
    try {
        const api = createApiMiddleware();
        const { data } = await api.delete(ApiUrls.DELETE_ITEM + id);
        return data;
    } catch (error) {
        // @ts-ignore
        throw new Error(error.response.data.message);
    }
};
