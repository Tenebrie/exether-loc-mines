/**
 * How to use:
 * Open the translation .pdf in Firefox, run the script from browser console.
 */

let dictionary = []
const collectedPages = []

function parseTranslations(text) {
    const parser = new DOMParser()
    const node = parser.parseFromString(text, 'text/html')
    const value = []
    const spans = node.querySelectorAll('span')
    for (let i = 0; i < spans.length; i++) {
        const val = spans[i].innerText
        if (val.startsWith('/') && val.endsWith('/')) {
            value.push({
                conlang: spans[i - 2].innerText,
                english: spans[i + 3].innerText,
                pronounciation: val,
            })
        }
    }
    return value
}

function collectVisibleData() {
    const data = [...document.getElementsByClassName('page')]
        .filter((page) => !!page.innerHTML && page.innerHTML.length > 200)
        .map((page) => ({
            number: Number(page.ariaLabel.split(' ')[1]),
            nodes: parseTranslations(page.innerHTML),
        }))
        .filter((data) => collectedPages.indexOf(data.number) === -1)

    for (let i = 0; i < data.length; i++) {
        collectedPages.push(data[i].number)
    }
    dictionary = dictionary.concat(data)
}

function collectData() {
    return new Promise((resolve) => {
        const container = document.getElementById('viewerContainer')
        container.scrollTo(0, 0)

        const doCollect = () => {
            container.scrollBy(0, container.clientHeight)
            collectVisibleData()
            if (container.scrollTop + container.clientHeight < container.scrollHeight) {
                setTimeout(doCollect, 50)
            } else {
                resolve()
            }
        }
        setTimeout(doCollect, 1)
    })
}

;(async () => {
    await collectData()
    console.info('Collected!')
    dictionary.sort((a, b) => a.number - b.number)
    const result = dictionary.flatMap((page) => page.nodes)
    console.info(result)
    console.info(JSON.stringify(result))
})()
