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
    'gatsby-transformer-remark',
    'gatsby-plugin-react-helmet'
  ],
}
