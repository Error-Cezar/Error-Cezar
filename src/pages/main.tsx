
import { body_el } from '../components/home/body/body';
import { HomeLayout } from '../components/home_layout';

export const Top = () => {
  return (
    <HomeLayout title={'meow'}>
        {body_el()}
    </HomeLayout>
  )
}