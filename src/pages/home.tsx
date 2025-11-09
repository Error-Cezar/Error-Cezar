
import { body_el } from './components/home/body/body';
import { HomeLayout } from './components/home/layout';

export const Top = (props: { visitCount: number }) => {
  return (
    <HomeLayout title={'meow'}>
        {body_el(props.visitCount)}
    </HomeLayout>
  )
}