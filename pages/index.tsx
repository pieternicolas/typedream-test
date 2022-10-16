import dynamic from 'next/dynamic';

const Home = dynamic(() => import('screens/Home'), { ssr: false }); // This is to prevent errors from using local storage as a storing medium

export default Home;
