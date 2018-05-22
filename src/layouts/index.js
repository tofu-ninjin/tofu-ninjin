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
      ]}
    />
    <Header
      siteTitle={data.site.siteMetadata.title}
      logoSrc={data.logo.childImageSharp.resize.src}
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
      }
    }
    logo: file(relativePath: { eq: "logo.png" }) {
      childImageSharp {
        resize(width: 70, height: 70) {
          src
        }
      }
    }
  }
`
