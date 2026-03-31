import {type SchemaTypeDefinition} from 'sanity'

import {aboutPageType} from './aboutPage'
import {culinaryPageType} from './culinaryPage'
import {experienceItem} from './experienceItem'
import {experiencesPageType} from './experiencesPage'
import {homeExperienceCard, homeExperiencesBand} from './homeExperienceCard'
import {homePageType} from './homePage'
import {imageBlock} from './imageBlock'
import {linkObject} from './linkObject'
import {localCheeseItem} from './localCheeseItem'
import {localCheesePageType} from './localCheesePage'
import {navGroup} from './navGroup'
import {navigationType} from './navigation'
import {roomFloorItem} from './roomFloorItem'
import {roomType} from './room'
import {roomsPageType} from './roomsPage'
import {restaurantPageType} from './restaurantPage'
import {siteSettingsType} from './siteSettings'
import {statItem} from './statItem'
import {teaserSection} from './teaserSection'
import {wellnessPageType} from './wellnessPage'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    linkObject,
    imageBlock,
    localCheeseItem,
    navGroup,
    statItem,
    experienceItem,
    teaserSection,
    homeExperienceCard,
    homeExperiencesBand,
    roomFloorItem,
    siteSettingsType,
    navigationType,
    homePageType,
    aboutPageType,
    restaurantPageType,
    culinaryPageType,
    experiencesPageType,
    wellnessPageType,
    localCheesePageType,
    roomsPageType,
    roomType,
  ],
}
