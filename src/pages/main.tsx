
import { body_el } from '../components/home/body/body';
import { MainLayout } from '../components/main_layout';

export const Top = () => {
  return (
    <MainLayout title={'meow'}>
        {body_el()}
    </MainLayout>
  )
}