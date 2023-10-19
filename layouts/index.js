import Head from 'next/head'
import Nav from '../pages/nav'

import styled from 'styled-components'

const Wrapper = styled.footer`
  display: flex;
  min-height: 100vh;
  flex-direction: column;

  main {
    flex: 1;
  }
`
const Footer = styled.footer`
	padding: 15px;
	background: #F5F5F5;
`

export default function Layout({ children, title = 'Charaters' }) {
	return (
		<Wrapper>
			<Head>
				<title>{title}</title>
			</Head>
			<header>
				<Nav />
			</header>

			<main>
				{children}
			</main>
		</Wrapper>
	);
};