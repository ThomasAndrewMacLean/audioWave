import React, { ReactNode } from 'react';
import styled from 'styled-components';


 
type LayoutProps = {
  children: ReactNode;
  page: string;
};
const Layout = ({ children }: LayoutProps) => {
  return (
    <Main>
      {/* <Header>
        <T translationKey="title"></T>
        <nav>
          <ul>
          {pages
              .filter((p) => p.showInNav)
              .map((pag, i) => {
                return (
                  <li key={i}>
                    <NavLink active={page === pag.id} href={prefix + pag.url}>
                      <T translationKey={pag.id + 'Title'}></T>
                    </NavLink>
                  </li>
                );
              })}
        
          </ul>
        </nav>  
      </Header> */}
      {children}
      {/* <Footer>
        <div>facebook</div>
        <address>contact</address>
      </Footer> */}
    </Main>
  );
};

const Main = styled.main`
  /* margin: auto;
  width: 90%;
  max-width: 900px; */
`;

export default Layout;
