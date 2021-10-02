const fetch = require("isomorphic-fetch")
const path = require("path")

//   let { date, id, title } = useParams();

exports.createPages = async ({ actions: { createPage } }) => {
  const response = await fetch(
    `http://localhost:8000/api/portal/jobs?slug=demo`
  )

  const posts = await response.json()

  //   createPage({
  //     path: "/",
  //     component: require.resolve("./src/templates/pokemon.js"),
  //     context: {allPokemon}
  //   })

  posts.map(post => {
    const createArraY = post.job_title.split(/[^A-Z0-9]/gi)[0]
    // `/post/${post.date_opened}/${Number(post.post_id)}/${createArraY}`
    return createPage({
      path: `/post/${Number(post.post_id)}`,
      component: path.resolve("./src/templates/portal-post.js"),
      context: { post },
    })
  })
}

// exports.fetchUserData = async ({
//   actions: { createNode },
//   createContentDigest,
// }) => {
//   const response = await fetch(
//     `http://localhost:8000/api/portal/jobs?slug=demo`
//   )
//   const posts = await response.json()

//   console.log(posts)

//   createNode({
//     id: `example-build-time-data`,
//     parent: null,
//     children: [],
//     internal: {
//       type: `Example`,
//       contentDigest: createContentDigest(posts),
//     },
//   })
// }
