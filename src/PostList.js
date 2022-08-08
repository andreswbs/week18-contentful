import {useEffect, useState} from 'react'
export default function PostList() {
    const [entries, setEntries] = useState(false)
    async function loadEntries() {
        const url = `https://cdn.contentful.com/spaces/${process.env.REACT_APP_SPACE_ID}/environments/${process.env.REACT_APP_ENVIRONMENT}/entries?access_token=${process.env.REACT_APP_ACCESS_TOKEN}`
        const response = await fetch(url)
        const result = await response.json()
        console.log(result)
        console.log("Posts")
        console.log(result.items.filter((e) => e.sys.contentType.sys.id === 'post'))
        console.log("Authors")
        console.log(result.items.filter((e) => e.sys.contentType.sys.id === 'author'))
        setEntries(result)
    }
    useEffect(() => {
        loadEntries()
    }, [])

    if (!entries) {
        return (<div>Loading ...</div>)
    }
    const posts = entries.items.filter((e)=>e.sys.contentType.sys.id === 'post')

    return (
        <div>
            {posts.map((post, index) => {
                return (
                    <div key={index}>
                        {post.fields.title}
                    </div>
                )
            })}
        </div>
    )
}