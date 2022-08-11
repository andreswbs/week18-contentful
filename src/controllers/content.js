const apiHost = "https://cdn.contentful.com"
   
async function loadAssets() {
    const url = `${apiHost}/spaces/${process.env.REACT_APP_SPACE_ID}/environments/${process.env.REACT_APP_ENVIRONMENT}/assets?access_token=${process.env.REACT_APP_ACCESS_TOKEN}`
    const response = await fetch(url)
    const result = await response.json()
    console.log('Assets:',result)
    return result 
}

async function loadEntries() {
    const url = `https://cdn.contentful.com/spaces/${process.env.REACT_APP_SPACE_ID}/environments/${process.env.REACT_APP_ENVIRONMENT}/entries?access_token=${process.env.REACT_APP_ACCESS_TOKEN}`
    const response = await fetch(url)
    const result = await response.json()
    return result
}

export {
    loadAssets,
    loadEntries
}

