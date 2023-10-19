import Link from 'next/link'
import styled from 'styled-components'

const Wrapper = styled.nav`
  padding: 15px;
  border-bottom: 1px solid transparent;
  display: flex;
  float: right;
  margin-right: 115px;

  a {
    
    padding: 0 20px;
    font-weight: 700;
    text-decoration: none;
    font-size: 20px;
    line-height: 24px;
    color: rgb(51, 51, 51);
  }
  a:hover, a:focus {
    color: rgb(255, 152, 0);
  }
`

const Nav = () => (
  <Wrapper>
    <Link href='/'>Home</Link>
    <Link href='/about' prefetch>About</Link>
  </Wrapper>
)

export default Nav