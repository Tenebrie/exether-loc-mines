import Fuse from 'fuse.js'
import { TranslationEntry } from './Translation'

export const makeFuse = (list: TranslationEntry[]) => {
    return new Fuse(list, {
        keys: ['english'],
        includeScore: true,
        distance: 1000,
    })
}
