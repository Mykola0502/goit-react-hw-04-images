import { PropTypes } from 'prop-types';
import { BtnLoad } from './Button.styled';

export const Button = ({ onClick }) => {
  return <BtnLoad onClick={onClick}>Load more</BtnLoad>;
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
