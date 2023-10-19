import React from 'react'
import Layout from '../layouts/index'
import styles from './index.module.css';

export default function About() {
  return (
    <Layout>
      <div className={styles.aboutContainer}>
      <h1>About</h1>
      <p className={styles.aboutContent}>
        This demo is to showcase the features of Next Js. I used The Rick and Morty API as source of data for this demo which is a REST(ish) and GraphQL API based on the television show Rick and Morty. Here the Character API is used to display list of characters using Infinite scroll for pagination.
      </p>
      <p className={styles.aboutContent}>
        It&apos;s a Server Side Rendering Application. This demo used getServerSideProps function to pre-render this page with initial data on each request using the data returned by getServerSideProps. After that API is called on Client Side to load rest of the data.
      </p>
      </div>
    </Layout>
  );
}