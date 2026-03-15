import {type SchemaTypeDefinition} from 'sanity'

import {aboutPageType} from './aboutPage'
import {culinaryPageType} from './culinaryPage'
import {homePageType} from './homePage'
import {imageBlock} from './imageBlock'
import {linkObject} from './linkObject'
import {navGroup} from './navGroup'
import {navigationType} from './navigation'
import {roomFloorItem} from './roomFloorItem'
import {roomType} from './room'
import {roomsPageType} from './roomsPage'
import {siteSettingsType} from './siteSettings'
import {statItem} from './statItem'
import {teaserSection} from './teaserSection'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    linkObject,
    imageBlock,
    navGroup,
    statItem,
    teaserSection,
    roomFloorItem,
    siteSettingsType,
    navigationType,
    homePageType,
    aboutPageType,
    culinaryPageType,
    roomsPageType,
    roomType,
  ],
}
