import React from 'react';
import { formatMessage } from 'umi-plugin-react/locale';
import Link from 'umi/link';
import Exception from '@/components/Exception';

const Exception500 = () => (
  <Exception
    type="500"
    desc="Случилось страшное, но мы уже работаем над этим"
    linkElement={Link}
    backText="Вернуться"
  />
);

export default Exception500;
