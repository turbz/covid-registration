/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

const participants = require("./data/participants.json")
const children = require("./data/children.json")
const register = require("./data/register.json")

const members = participants.map(participant => {
  const linkParticipant = (array, id) =>
    array.filter(child => child[id] === participant.id)

  return Object.assign(participant, {
    children: linkParticipant(children, "guardianID"),
    attendanceRegister: linkParticipant(register, "participantID"),
  })
})

module.exports = {
  siteMetadata: {
    title: "GBC Randfontein",
    participants: members,
  },
}
