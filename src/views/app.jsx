const React = require('react')

module.exports = function app(props) {
  const {debt} = props
  const firstname = debt.length > 0 ? debt[0].firstname : ''
  return (
    <div style={{fontFamily: 'Arial'}}>
      <h1>Moi {firstname}</h1>
      <h3>Tässä on sinun velat. Muista että maksamisen jälkeen voi kestää jonkin aikaa ennenkuin maksun suoritus näkyy sivuilla. Punaisella merkityt maksut ovat maksamattomia ja vihreät maksettuja.</h3>
      <h2>Maksutiedot: </h2>
      <p>Tilinumero: FI89 7997 7995 1312 86</p>
      <p>Saaja: TKO-äly ry</p>
      <br />
      <br />
      {renderDebtTable(debt)}
    </div>
  )
}

function renderDebtTable(debt) {
  return debt.map(({event, amount, refnum, payed}) => {
    return (
      <div style={{marginBottom: '40px', border: '3px solid rgba(0,0,0,0.2)', borderRadius: '5px', backgroundColor: payed === 1 ? 'rgba(0, 255, 0, 0.2)' : 'rgba(255, 0, 0, 0.2)'}}>
        <h4>{event}</h4>
        <p>Hinta: {amount}€</p>
        <p>Viitenumero: {refnum}</p>
      </div>
    )
  })
}