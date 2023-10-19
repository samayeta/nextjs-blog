import React, { useState, useEffect, useRef } from 'react'
import Layout from '../layouts/index'
import type { InferGetServerSidePropsType } from 'next';
import styled from 'styled-components';
import styles from './index.module.css';

const Wrapper = styled.div`
  width: 100%;

  > h1 {
    text-align: center;
    margin: 20px auto;
    color: rgb(32, 35, 41);
    border: none;
    font-weight: 900;
    z-index: 1;
    font-size: 5.625rem;
  }
  > h1::selection { 
    color: rgb(255, 152, 0);
    background: rgb(32, 35, 41);
  }
  > div {
    padding: 60px 0;
    background: rgb(39, 43, 51);
    max-width: 1300px;
    margin: 0 auto;
    justify-content: center;
    position: relative;
  }
`
const Article = styled.div`
  width: 550px;
  height: 200px;
  display: flex;
  background: rgb(60, 62, 68);
  border-radius: 0.5rem;
  overflow: hidden;
  gap: 20px;

  img {
    width: 200px;
  }
`
const ContentWrapper = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  padding: 10px 10px 10px 0;
  justify-content: space-between;
`
const Link = styled.a`
  color: rgb(245, 245, 245);
  text-decoration: none;
`

export default function IndexPage({
  characters,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [list, setList] = useState(characters);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const ref = useRef(null);
  const observerTarget = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          fetchData();
        }
      },
      {
        threshold: 0.1
      }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [observerTarget]);

  useEffect(() => {
    console.log('page', page)
    if (page !== 1 && page < list.info.pages && !loading) {
      setLoading(true);
      fetch(`/api/character?curPage=${page}`)
        .then(response => response.json())
        .then(data => {
          setList({
            info: { ...data.character.info },
            results: list.results.concat(data.character.results),
          });
          setLoading(false);
          console.log(data.character.info);
        });
    }
  }, [page]);


  const fetchData = () => {
    console.log('page on fetchData Call', page)
    if (page < list.info.pages && !loading) {
      setPage((page) => page + 1);
    }
  };

  return (
    <Layout>
      <Wrapper>
        <h1>The Rick and Morty</h1>
        <div ref={ref}>
          <div className={styles.container}>
            {list.results.map((item: any, index: number) =>
              <Article key={index}>
                <img
                  src={item.image}
                  alt={item.name}
                />
                <ContentWrapper>
                  <div className={styles.section}>
                    <span className={styles.link}><h2 style={{ margin: 0 }}>{item.name}</h2></span>
                    <span style={{ display: 'flex', alignItems: 'center' }}>
                      <span className={styles.statusIcon} />
                      <span>
                        {item.status} - {item.species}
                      </span>
                    </span>
                  </div>
                  <div className={styles.section}>
                    <span className={styles.textGrey}>Last known location:</span>
                    <span>{item.origin.name}</span>
                  </div>
                  <div className={styles.section}>
                    <span className={styles.textGrey}>Appeared in number of episodes:</span>
                    <span>{item.episode.length}</span>
                  </div>

                </ContentWrapper>
              </Article>
            )}
            <div className={styles.observerEle} ref={observerTarget}></div>
          </div>
          {loading && <div className={styles.loader} />}
        </div>
      </Wrapper>
    </Layout>
  );
};

export const getServerSideProps = async () => {
  const res = await fetch('https://rickandmortyapi.com/api/character?page=1');
  const characters = await res.json();
  return { props: { characters } };
};
