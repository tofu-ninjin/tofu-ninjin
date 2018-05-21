import React from 'react'
import Link from 'gatsby-link'
import {
  Container,
  Image,
  Menu
} from 'semantic-ui-react'

const Header = ({ siteTitle, logoSrc }) => (
  <Menu fixed='top'>
    <Container text>
      <Link to='/'>
        <Menu.Item as='a' header>
          <Image
            size='mini'
            src={logoSrc}
            style={{ marginRight: '1.5em' }}
          />
          {siteTitle}
        </Menu.Item>
      </Link>
    </Container>
  </Menu>
)

export default Header
