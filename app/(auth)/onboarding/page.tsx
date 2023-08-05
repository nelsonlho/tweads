import AccountProfile from '@/components/forms/AccountProfile';
import { currentUser } from '@clerk/nextjs';

type Props = {};

const Onboarding = async (props: Props) => {
  const user = await currentUser();

  const userInfo = {
    _id: null,
  };

  const userData = {
    id: 'id',
    objectId: 'objectId',
    username: 'username',
    name: 'name',
    bio: 'bio',
    image: 'image',
  };
  return (
    <main className="mx-auto flex max-w-3xl flex-col justify-start px-10 py-20">
      <h1 className="head-text">Onboarding</h1>
      <p className="mt-3 text-base-regular text-light-2">
        Complete your profile now to use Tweads
      </p>

      <section className="mt-9 bg-dark-2 p-10">
        <AccountProfile user={userData} btnTitle="continue" />
      </section>
    </main>
  );
};

export default Onboarding;
