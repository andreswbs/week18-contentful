import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
function PostDetails({post}) {
    if (!post) {
        return <></>
    }
    return (
        <div>
            <h1>{post.fields.title}</h1>
            <div>
                {post.fields.excerpt}
            </div>
            <div className="contentDetails">
                {documentToReactComponents(post.fields.content)  }
            </div>
        </div>
    )
}

export default PostDetails