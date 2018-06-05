function generateSubtitle(topics, speakers) {
  let subtitle = topics.join('、') + 'などについて話しました。'
  const guests = speakers.filter((speaker) => {
    return ['diginatu', 'y0za'].indexOf(speaker.id) === -1
  })
  if (guests.length > 0) {
    const prefix = guests.map((guest) => `${guest.name}さん`).join('と')
    subtitle = `${prefix}をゲストに迎えて、${subtitle}`
  }
  return subtitle
}

module.exports = {
  generateSubtitle
}
