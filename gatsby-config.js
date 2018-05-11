module.exports = {
  siteMetadata: {
    title: 'Tofuにんじん',
    description: '',
    siteUrl: 'https://tofu-ninjin.netlify.com'
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    {
      resolve: 'gatsby-plugin-feed',
      options: {
        query: `
        {
          site {
            siteMetadata {
              title
              description
              siteUrl
              site_url: siteUrl
            }
          }
        }`,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map(edge => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  enclosure: {
                    url: edge.node.frontmatter.audio.url
                  },
                  custom_elements: [
                    { 'content:encoded': edge.node.html }
                  ]
                });
              });
            },
            query: `
            {
              allMarkdownRemark(
                limit: 1000,
                sort: { order: DESC, fields: [frontmatter___date] }
              ) {
                edges {
                  node {
                    excerpt
                    html
                    fields { slug }
                    frontmatter {
                      title
                      date
                      audio {
                        url
                      }
                    }
                  }
                }
              }
            }
          `,
            output: '/feed.xml',
          },
        ],
      },
    },
    'gatsby-transformer-remark',
    'gatsby-plugin-react-helmet'
  ],
}
