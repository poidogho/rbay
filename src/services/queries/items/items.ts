import type { CreateItemAttrs } from '$services/types';
import { client } from '$services/redis';
import { itemsKey } from '$services/keys';
import { serialize } from './serialize';
import { deserialize } from './deserialize';
import { genId } from '$services/utils';

export const getItem = async (id: string) => {
    const item = await client.hGetAll(itemsKey(id));

    return Object.keys(item).length > 0 ? 
        deserialize(id, item) : null;
};

export const getItems = async (ids: string[]) => {};

export const createItem = async (attrs: CreateItemAttrs, userId: string) => {
    const id = genId();
    const serializedItem = serialize(attrs);

    await client.hSet(itemsKey(id), serializedItem)

    return id;
};
