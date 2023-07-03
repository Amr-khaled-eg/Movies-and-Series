


export default function Home() {
 
  return ;
}
export async function getServerSideProps() {
  // Perform some server-side logic...

  // Redirect to the homepage
  return {
    redirect: {
      destination: '/movies',
      permanent: false,
    },
  }
}
