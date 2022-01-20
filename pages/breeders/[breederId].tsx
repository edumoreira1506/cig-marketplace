import { useRouter } from 'next/router';

const BreederPage = () => {
  const router = useRouter();
  const { breederId } = router.query;

  return <p>BreederPage: {breederId}</p>;
};

export default BreederPage;
