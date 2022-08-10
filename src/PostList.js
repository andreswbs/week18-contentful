import {useEffect, useState} from 'react'
import PostDetails from './PostDetails'

export default function PostList() {
    const [entries, setEntries] = useState(false)
    const [assets, setAssets] = useState(false)
    const [authors, setAuthors] = useState(false)
    const [activePost, setActivePost] = useState(false)


    const apiHost = "https://cdn.contentful.com"
    async function loadEntries() {
        const url = `https://cdn.contentful.com/spaces/${process.env.REACT_APP_SPACE_ID}/environments/${process.env.REACT_APP_ENVIRONMENT}/entries?access_token=${process.env.REACT_APP_ACCESS_TOKEN}`
        const response = await fetch(url)
        const result = await response.json()

        const authorsArray = result.items.filter((e) => e.sys.contentType.sys.id === 'author')
        console.log(authorsArray)
        const authorsObj = {}
        authorsArray.forEach(author => {
            authorsObj[author.sys.id] = author
        });

        setEntries(result)
        setAuthors(authorsObj)
    }
    async function selectPost(postId) {
        const post = entries.items.find(e => (
            e.sys.contentType.sys.id === 'post' && e.sys.id === postId
        ))
        console.log('selectedPost', postId, post)
        setActivePost(post)
        return post
    }
    async function loadAssets() {
        const url = `${apiHost}/spaces/${process.env.REACT_APP_SPACE_ID}/environments/${process.env.REACT_APP_ENVIRONMENT}/assets?access_token=${process.env.REACT_APP_ACCESS_TOKEN}`
        const response = await fetch(url)
        const result = await response.json()
        console.log('Assets:',result)
        setAssets(result)
    }
    useEffect(() => {
        loadEntries()
        loadAssets()
    }, [])

    if (!entries || !assets || !authors) {
        return (<div>Loading ...</div>)
    }

    function getAssetUrl(assetId) {
        const found = assets.items.find(e => e.sys.id === assetId)
        if (!found) {
            //TODO: If not found, send back some placeholder picture url
            return '' 
        }
        return 'https:' + found.fields.file.url
    }

    function getAuthor(entityId) {
       return authors[entityId]
    }

    const posts = entries.items.filter((e)=>e.sys.contentType.sys.id === 'post')

    return (
        <div>
            <div className='posts'>
                {posts.map((post, index) => {
                    const backgroundUrl = getAssetUrl(post.fields.coverImage.sys.id)
                    const author = getAuthor(post.fields.author.sys.id)
                    return (
                        <div key={index} style={{
                            backgroundImage: `url("${backgroundUrl}")`
                        }} >
                            {post.fields.title}
                            <p>
                            Author: {author.fields.name}
                            </p>
                            <p>
                                <button onClick={() => selectPost(post.sys.id)}>Read more ...</button>
                            </p>
                        </div>
                    )
                })}
            </div>
            <PostDetails post={activePost} />
        </div>
    )
}