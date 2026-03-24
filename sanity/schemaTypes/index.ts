import {type SchemaTypeDefinition} from 'sanity'

import {aboutPageType} from './aboutPage'
import {culinaryPageType} from './culinaryPage'
import {experienceItem} from './experienceItem'
import {experiencesPageType} from './experiencesPage'
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
import {wellnessPageType} from './wellnessPage'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    linkObject,
    imageBlock,
    navGroup,
    statItem,
    experienceItem,
    teaserSection,
    roomFloorItem,
    siteSettingsType,
    navigationType,
    homePageType,
    aboutPageType,
    culinaryPageType,
    experiencesPageType,
    wellnessPageType,
    roomsPageType,
    roomType,
  ],
}
