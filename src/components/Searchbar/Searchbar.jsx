import { PropTypes } from 'prop-types';
import { Component } from 'react';
import { toast } from 'react-toastify';
import { BiSearchAlt } from 'react-icons/bi';

import {
  ButtonLabel,
  SearchbarHeader,
  SearchForm,
  SearchFormBtn,
  SearchInput,
} from './Searchbar.styled';

export class Searchbar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    searchInput: '',
  };

  handleInputChange = evt => {
    this.setState({ searchInput: evt.currentTarget.value.toLowerCase() });
  };

  handleSubmit = evt => {
    evt.preventDefault();

    if (this.state.searchInput.trim()) {
      this.props.onSubmit(this.state.searchInput);
      this.setState({ searchInput: '' });
      return;
    }
    toast.error('Please enter the text in the search field! 🔍', {});
  };

  render() {
    const { searchInput } = this.state;

    return (
      <SearchbarHeader>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchFormBtn type="submit">
            <BiSearchAlt />
            <ButtonLabel>Search</ButtonLabel>
          </SearchFormBtn>

          <SearchInput
            className="input"
            type="text"
            name="searchInput"
            value={searchInput}
            onChange={this.handleInputChange}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </SearchForm>
      </SearchbarHeader>
    );
  }
}
