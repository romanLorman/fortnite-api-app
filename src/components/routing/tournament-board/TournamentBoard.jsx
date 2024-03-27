import { SliderTournamentBoard } from 'components/shared/slider-tournament-board/SliderTournamentBoard'
import { useContext } from 'react'
import { GlobalContext } from 'context/context'
import { SliderTournamentBoardLoader } from 'components/shared/slider-tournament-board/SliderTournamentBoardLoader'
export const TournamentBoard = ({ parentBlock }) => {
  const { tournaments } = useContext(GlobalContext)

  return (
    <section
      id="tournaments"
      className={`${parentBlock}__tournament-board tournament-board`}
    >
      <div className="tournament-board__container">
        <div className="tournament-board__title_large">current tournaments</div>
        {tournaments ? (
          <SliderTournamentBoard
            parentBlock={'tournament-board'}
            tournaments={tournaments}
          />
        ) : (
          <SliderTournamentBoardLoader parentBlock={'tournament-board'} />
        )}
      </div>
    </section>
  )
}
