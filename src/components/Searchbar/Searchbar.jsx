import { PropTypes } from 'prop-types';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { BiSearchAlt } from 'react-icons/bi';

import {
  ButtonLabel,
  SearchbarHeader,
  SearchForm,
  SearchFormBtn,
  SearchInput,
} from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  const [searchInput, setSearchInput] = useState('');

  const handleInputChange = evt => {
    setSearchInput(evt.currentTarget.value.toLowerCase());
  };

  const handleSubmit = evt => {
    evt.preventDefault();

    if (searchInput.trim()) {
      onSubmit(searchInput);
      setSearchInput('');
      return;
    }
    toast.error('Please enter the text in the search field! 🔍', {});
  };

  return (
    <SearchbarHeader>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormBtn type="submit">
          <BiSearchAlt />
          <ButtonLabel>Search</ButtonLabel>
        </SearchFormBtn>

        <SearchInput
          className="input"
          type="text"
          name="searchInput"
          value={searchInput}
          onChange={handleInputChange}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </SearchbarHeader>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
