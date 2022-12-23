import type { Session } from '$services/types';
import { client } from '$services/redis';
import { sessionsKey } from '$services/keys';

export const getSession = async (id: string) => {
    const session = await client.hGetAll(sessionsKey(id))

    return Object.keys(session).length > 0 ? 
        deserialize(id, session) : null;
};

export const saveSession = async (session: Session) => {
    return await client.hSet(
        sessionsKey(session.id),
        serialize(session)
    );
};


const deserialize = (id: string, session: {[key: string]: string}) => {
    return {
        id,
        userId: session.userId,
        username: session.username
    }
}

const serialize = (session: Session) => {
    return {
        userId: session.userId,
        username: session.username
    }
}