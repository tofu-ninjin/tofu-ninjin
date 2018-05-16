module.exports = {
  siteMetadata: {
    title: 'Tofuにんじん',
    description: 'Tofuとにんじんがプログラミングなどについてゆるく雑談するラジオ',
    siteUrl: 'https://tofu-ninjin.netlify.com',
    copyright: '2018 tofu-jinjin',
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
      resolve: 'gatsby-plugin-feed',
      options: {
        query: `
        {
          site {
            siteMetadata {
              title
              description
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
    {
      resolve: 'gatsby-plugin-favicon',
      options: {
        logo: './src/favicon.png',
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
    'gatsby-plugin-sass',
    'gatsby-transformer-remark',
    'gatsby-plugin-react-helmet'
  ],
}
