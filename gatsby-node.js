const path = require('path')
const fs = require('fs')
const { createFilePath } = require('gatsby-source-filesystem')

exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {
  const { createNodeField } = boundActionCreators
  if (node.internal.type === 'MarkdownRemark') {
    const slug = createFilePath({ node, getNode, basePath: 'pages' })
    createNodeField({
      node,
      name: 'slug',
      value: slug,
    })
  } else if (node.internal.type === 'SpeakersYaml') {
    const slug = createFilePath({ node, getNode, basePath: 'data' })
    createNodeField({
      node,
      name: 'slug',
      value: slug + node.id,
    })
  }
}

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators
  return (async () => {
    await graphql(`
      {
        allMarkdownRemark {
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
      }
    `).then(result => {
      result.data.allMarkdownRemark.edges.forEach(({ node }) => {
        createPage({
          path: node.fields.slug,
          component: path.resolve('./src/templates/episode.js'),
          context: {
            // Data passed to context is available in page queries as GraphQL variables.
            slug: node.fields.slug,
          }
        })
      })
    })

    await graphql(`
      {
        allSpeakersYaml {
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
      }
    `).then(result => {
      result.data.allSpeakersYaml.edges.forEach(({ node }) => {
        createPage({
          path: node.fields.slug,
          component: path.resolve('./src/templates/speaker.js'),
          context: {
            // Data passed to context is available in page queries as GraphQL variables.
            slug: node.fields.slug,
          }
        })
      })
    })
  })()
}

exports.onPostBuild = () => {
  // RSSに指定する用のロゴ画像をpublicディレクトリにコピー
  const src = path.resolve('./src/images/logo.png')
  const dest = path.resolve('./public/itunes-artwork.png')
  fs.copyFile(src, dest, (err) => {
    if (err) {
      console.error(err.stack)
    }
  })
}
