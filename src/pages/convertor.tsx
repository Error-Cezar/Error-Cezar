
import { body_conv } from '../components/convertor/body/body';
import { ConvertorLayout } from '../components/convertor_layout';

export const Convertor = () => {
  return (
    <ConvertorLayout title={'meow'}>
        {body_conv()}
    </ConvertorLayout>
  )
}