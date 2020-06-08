import { table, row } from 'rethinkdb';

import prod from './prodDatabase';
import Post from '../interfaces/Post';

const checkPosts = async (postName: string): Promise<any> => {
    try {
        const post: Post = (
            await table('posts')
                .filter(row('postName').eq(postName))
                .run(await prod())
                .then((cursor) => cursor.toArray())
        )[0] as Post;
        return await post;
    } catch (err) {
        console.log('error', err);
    }
    return await undefined;
};

export default checkPosts;
