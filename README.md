# nextjs-blog
Next JS POC project

<p >This demo is to showcase the features of Next Js. I used The Rick and Morty API as source of data for this demo which is a REST(ish) and GraphQL API based on the television show Rick and Morty. Here the Character API is used to display list of characters using Infinite scroll for pagination.
</p>
<p>It's a Server Side Rendering Application. This demo used getServerSideProps function to pre-render this page with initial data on each request using the data returned by getServerSideProps. After that API is called on Client Side to load rest of the data.
