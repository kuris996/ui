import React from 'react';
import { formatMessage } from 'umi-plugin-react/locale';
import Link from 'umi/link';
import Exception from '@/components/Exception';

const Exception404 = () => (
  <Exception
    type="404"
    desc="Случилось страшное, но мы уже работаем над этим"
    linkElement={Link}
    backText="Вернуться"
  />
);

export default Exception404;
