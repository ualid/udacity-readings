import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'
import Panel from './Panel';
import { connect } from 'react-redux'
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { fetchPostsByCategories, fetchPosts } from './actions/posts'
import Grid from '@material-ui/core/Grid';

const styles = {
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  alignItemsCard: {
    alignItems: 'flex-end'
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

class SimpleCard extends Component {
  state = { categoriesSelected: '', filterSelected: '' };

  handleChange = e => {
    this.setState(() => {
      return { categoriesSelected: e.target.value };
    });

    if (e.target.value === "") {
      this.props.fetchPosts()
    } else {
      this.props.fetchPostsByCategories(e.target.value)
    }
  }
  handleFilter = e => {
    this.setState(() => {
      return { filterSelected: e.target.value };
    });

  }
  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
      <Grid>
       <FormControl className={classes.formControl}>
          <InputLabel htmlFor="categories-simple">Categories</InputLabel>
          <Select
            value={this.state.categoriesSelected}
            onChange={this.handleChange}
            inputProps={{
              name: 'Categories',
              id: 'categories-simple',
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {this.props.categories.map((category, index) => (
              <MenuItem key={index} value={category.name}>{category.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        </Grid>
        <Grid>
        <FormControl className={classes.formControl}>
           <InputLabel htmlFor="categories-simple">Filtrar por: </InputLabel>
          <Select
            value={this.state.filterSelected}
            onChange={this.handleFilter}
            inputProps={{
              name: 'Categories',
              id: 'categories-simple',
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
              <MenuItem value='1'>
                {'VoteScore'}
              </MenuItem>
             <MenuItem value='2'>
                {'Data de Criação'}
              </MenuItem>
          </Select>
          </FormControl>
          </Grid>
        <CardActions>
          <Button component={Link} to="/novoPost/" variant="contained" color="primary" className={classes.button}>
            Novo
          </Button>
        </CardActions>
        <CardContent>
          {this.props.posts.map((post, index) => (
            <div className="row" key={index}>
              <Panel post={post} />
            </div>
          ))
          }

        </CardContent>

      </Card>
    );
  }
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps({ posts, categories }, { id }) {
  return {
    posts: posts.data,
    categories: categories.data.categories
  }
}
const mapDispatchToProps = {
  fetchPostsByCategories,
  fetchPosts
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SimpleCard));
