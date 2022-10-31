import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { itemsFetchData } from '../actions/items';

class ItemList extends Component {
  componentDidMount() {
    this.props.fetchData('http://5af1eee530f9490014ead8c4.mockapi.io/items');
  }

  componentDidUpdate() {
    console.log(this.props.fetchingStatus);
  }

  render() {
    if (this.props.items.list1 && this.props.items.list2) {
      return (
        <div>
          <ul>
            {this.props.items.list1.map((item) => (
              <li key={item.id}>{item.label}</li>
            ))}
          </ul>
          <ItemListWithChild list={this.props.items.list2} />
        </div>
      );
    }
    return null;
  }
}

ItemList.propTypes = {
  fetchData: PropTypes.func.isRequired,
  items: PropTypes.objectOf(PropTypes.array).isRequired,
  fetchingStatus: PropTypes.string.isRequired,
};

function ItemListWithChild({ list }) {
  const createList = (list) =>
    list.map((item) => {
      if (item.children.length === 0) {
        return <li key={item.id}>{item.label} No childrens</li>;
      }
      if (item.children.length !== 0) {
        return (
          <div key={item.id}>
            {item.label}
            {'Childrens =>'}
            {createList(item.children)}
            <br />
          </div>
        );
      }
    });

  return <ul>{createList(list)}</ul>;
}
ItemListWithChild.propTypes = {
  list: PropTypes.array.isRequired,
};

const getItems = (state) => state.items.items;
const getFetchingStatus = (state) => state.items.fetchingStatus;
// I make primitive selector, because this project has an old version of React
// and it doesn't support Hooks and "reselect" library

const mapStateToProps = (state) => ({
  items: getItems(state),
  fetchingStatus: getFetchingStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchData: (url) => dispatch(itemsFetchData(url)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);
