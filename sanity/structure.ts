import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.documentTypeListItem('siteSettings').title('Site settings'),
      S.documentTypeListItem('navigation').title('Navigation'),
      S.divider(),
      S.documentTypeListItem('homePage').title('Home page'),
      S.documentTypeListItem('aboutPage').title('About page'),
      S.documentTypeListItem('culinaryPage').title('Culinary page'),
      S.documentTypeListItem('experiencesPage').title('Experiences page'),
      S.documentTypeListItem('roomsPage').title('Rooms page'),
      S.documentTypeListItem('room').title('Rooms'),
    ])
