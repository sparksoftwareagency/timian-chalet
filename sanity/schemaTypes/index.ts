import {type SchemaTypeDefinition} from 'sanity'

import {aboutPageType} from './aboutPage'
import {bookingPageType} from './bookingPage'
import {culinaryPageType} from './culinaryPage'
import {eventType} from './event'
import {eventPromo} from './eventPromo'
import {eventsPageType} from './eventsPage'
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
import {wellnessFeatureItem} from './wellnessFeatureItem'
import {wellnessPageType} from './wellnessPage'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    linkObject,
    imageBlock,
    localCheeseItem,
    navGroup,
    statItem,
    experienceItem,
    wellnessFeatureItem,
    teaserSection,
    homeExperienceCard,
    homeExperiencesBand,
    eventPromo,
    roomFloorItem,
    siteSettingsType,
    navigationType,
    homePageType,
    aboutPageType,
    restaurantPageType,
    culinaryPageType,
    bookingPageType,
    experiencesPageType,
    wellnessPageType,
    localCheesePageType,
    roomsPageType,
    roomType,
    eventsPageType,
    eventType,
  ],
}
