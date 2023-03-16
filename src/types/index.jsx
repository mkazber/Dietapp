import PropTypes from 'prop-types';

export const UserShape = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  gender: PropTypes.string.isRequired,
};
