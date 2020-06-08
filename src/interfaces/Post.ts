export default interface Post {
    /**
     * Post Title - e.g.: How to become a good programmer
     */
    postName: string;
    /**
     * Post Content - e.g.: "The secret is to...lorem ipsum dolor sit amet..."
     * Might be rich formatted as in text editors like Word
     */
    postData: string;
    /**
     * Post Author - e.g.: John Doe, Jane Doe
     */
    postAuthor: string;
    /**
     * Post Thumbnail Preview URL - e.g.: https://thebestimages.com/image1.png
     */
    postThumbnail: string;
    /**
     * User registration date stored as raw text - e.g.: Monday, June 8, 2020 6:10 PM
     * Usually generated with the MomentJS library
     * (can also be seen at User.ts:18)
     */
    createdAt: string;
}
