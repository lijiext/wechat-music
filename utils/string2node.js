export function string2node(keyword, value) {
    const nodes = []
    if (keyword.toUpperCase().startsWith(value.toUpperCase())) {
        nodes.push({
            name: 'span',
            attrs: {
                style: 'color: #26ce8a'
            },
            children: [
                {
                    type: 'text',
                    text: keyword.slice(0, value.length)
                }
            ]
        })
        nodes.push({
            name: 'span',
            attrs: {
                style: 'color: #000000'
            },
            children: [
                {
                    type: 'text',
                    text: keyword.slice(value.length)
                }
            ]
        })
    } else {
        nodes.push({
            name: 'span',
            attrs: {
                style: 'color: #000000'
            },
            children: [
                {
                    type: 'text',
                    text: keyword
                }
            ]
        })
    }
    return nodes
}