import { FC } from 'react';
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from '@fortawesome/react-fontawesome';

type IconProps = FontAwesomeIconProps & {};

const Icon: FC<IconProps> = ({ ...props }) => {
  return (
    <>
      <FontAwesomeIcon {...props} />
    </>
  );
};

export default Icon;
