const episodeHelper = require('./src/helpers/episode')

module.exports = {
  siteMetadata: {
    title: 'Tofuにんじん',
    description: 'Tofuとにんじんがプログラミングなどについてゆるく雑談するラジオ',
    siteUrl: 'https://tofu-ninjin.netlify.com',
    owner: 'tofu-ninjin',
    email: 'tofu.ninjin@gmail.com',
    copyright: '2018 tofu-ninjin',
    language: 'ja'
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
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/data`,
        name: 'data',
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/images`,
        name: 'images',
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
              owner
              email
              language
              copyright
              siteUrl
              site_url: siteUrl
            }
          }
        }`,
        setup: ({
          query: {
            site: { siteMetadata },
            ...rest
          },
        }) => {
          return {
            custom_namespaces: {
              itunes: 'http://www.itunes.com/dtds/podcast-1.0.dtd'
            },
            custom_elements: [
              {
                'itunes:author': siteMetadata.owner
              },
              {
                'itunes:image': {
                  _attr: {
                    href: `${siteMetadata.siteUrl}/itunes-artwork.png`
                  }
                }
              },
              {
                'itunes:category': {
                  _attr: {
                    text: 'Technology'
                  }
                }
              },
              {
                'itunes:owner': [
                  { 'itunes:name': siteMetadata.owner },
                  { 'itunes:email': siteMetadata.email }
                ]
              },
              { 'itunes:summary': siteMetadata.description },
              { 'itunes:explicit': 'no' }
            ],
            ...siteMetadata,
            ...rest
          }
        },
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map(edge => {
                const subtitle = episodeHelper.generateSubtitle(edge.node.frontmatter.topics, edge.node.frontmatter.speakers)

                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.html,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  enclosure: {
                    url: edge.node.frontmatter.audio.url
                  },
                  custom_elements: [
                    { 'itunes:subtitile': subtitle },
                    { 'itunes:duration': edge.node.frontmatter.audio.duration },
                  ]
                })
              })
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
                      topics
                      date
                      audio {
                        url
                        duration
                      }
                      speakers {
                        id
                        name
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
    {
      resolve: 'gatsby-plugin-favicon',
      options: {
        logo: './src/images/logo.png',
        injectHTML: true,
        icons: {
          android: true,
          appleIcon: true,
          appleStartup: true,
          coast: false,
          favicons: true,
          firefox: true,
          twitter: false,
          yandex: false,
          windows: false
        }
      }
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-86917545-2',
        anonymize: true,
        respectDNT: true
      },
    },
    'gatsby-plugin-sass',
    'gatsby-plugin-sharp',
    'gatsby-transformer-remark',
    'gatsby-transformer-yaml',
    'gatsby-transformer-sharp',
    'gatsby-plugin-react-helmet'
  ],
  mapping: {
    'MarkdownRemark.frontmatter.speakers': 'SpeakersYaml'
  }
}
