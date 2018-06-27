import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { Container } from 'semantic-ui-react'

import Header from '../components/header'
import 'semantic-ui-css/semantic.min.css'
import './index.css'

const Layout = ({ children, data }) => (
  <div>
    <Helmet
      title={data.site.siteMetadata.title}
      meta={[
        { name: 'description', content: data.site.siteMetadata.description },
        { property: 'og:title', content: data.site.siteMetadata.title },
        { property: 'og:type', content: 'article' },
        { property: 'og:description', content: data.site.siteMetadata.description },
        { property: 'og:locale', content: 'ja_JP' },
        { property: 'og:site_name', content: data.site.siteMetadata.title },
        { property: 'og:image', content: data.site.siteMetadata.siteUrl + data.logo.childImageSharp.resize.src },
        { property: 'og:url', content: data.site.siteMetadata.siteUrl }
      ]}
    />
    <Header
      siteTitle={data.site.siteMetadata.title}
      logoSrc={data.logoTransparent.childImageSharp.resize.src}
    />
    <Container text style={{ marginTop: '7em' }}>
      {children()}
    </Container>
  </div>
)

Layout.propTypes = {
  children: PropTypes.func,
}

export default Layout

export const query = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
        description
        siteUrl
      }
    }
    logoTransparent: file(relativePath: { eq: "logo.png" }) {
      childImageSharp {
        resize(width: 70, height: 70) {
          src
        }
      }
    }
    logo: file(relativePath: { eq: "logo.jpg" }) {
      childImageSharp {
        resize(width: 400, height: 400, quality: 90) {
          src
        }
      }
    }
  }
`
