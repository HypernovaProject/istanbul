export default interface User {
    /**
     * User's ID - used in databases
     */
    id: string;
    /**
     * User's fullname - e.g.: John Doe, Jane Doe
     */
    fullName: string;
    /**
     * User's virtual name (username) - e.g.: john_doe99, janeDoe
     */
    username: string;
    /**
     * User's password - usually stored as a hashed form
     * Hashes usually begin with the dollar sign ($)
     */
    password: string;
    /**
     * User registration date stored as raw text - e.g.: Monday, June 8, 2020 6:10 PM
     * Usually generated with the MomentJS library
     * (can also be seen at Post.ts:24)
     */
    createdAt: string;
}
