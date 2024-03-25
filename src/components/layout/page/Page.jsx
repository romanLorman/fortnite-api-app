import { TournamentBoard } from 'components/routing/tournament-board/TournamentBoard'
import { MapGallery } from 'components/routing/map-gallery/MapGallery'
import { Shop } from 'components/routing/shop/Shop'
import { Crew } from 'components/routing/crew/Crew'

export const Page = () => {
  return (
    <main className="page">
      <Shop parentBlock={'page'} />
      <TournamentBoard parentBlock={'page'} />
      <MapGallery parentBlock={'page'} />
      <Crew parentBlock={'page'} />
    </main>
  )
}
