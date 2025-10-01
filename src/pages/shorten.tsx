
import { body_el } from '../components/shorten/body/body';
import { ShortenLayout } from '../components/shorten_layout';

export const Shorten = () => {
  return (
    <ShortenLayout title={'meow'}>
        {body_el()}
    </ShortenLayout>
  )
}