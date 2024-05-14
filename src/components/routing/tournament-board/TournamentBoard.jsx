import { SliderTournamentBoard } from 'components/shared/slider-tournament-board/SliderTournamentBoard'
export const TournamentBoard = ({ parentBlock }) => {

  return (
    <section
      id="tournaments"
      className={`${parentBlock}__tournament-board tournament-board`}
    >
      <div className="tournament-board__container">
        <div className="tournament-board__title_large">tournaments</div>
        <SliderTournamentBoard
          parentBlock={'tournament-board'}
        />
      </div>
    </section>
  )
}
