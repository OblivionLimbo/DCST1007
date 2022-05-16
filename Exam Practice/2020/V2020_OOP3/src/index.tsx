import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { Show, showService, Rating } from './services';
import { Alert, Card, Row, Column, NavBar, Button, Form } from './widgets';
import { createHashHistory } from 'history';

const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a show

class ShowList extends Component {
  shows: Show[] = [];
  ratings: Rating[] = [];
  search: string = '';

  render() {
    return (
      <>
      <Card title="Barne-TV Programmer">
      <Button.Success onClick={() => history.push('/create')}>Legg til program</Button.Success>
      <br />
      <Form.Label>Søk</Form.Label>
      <Form.Input type="text" value={this.search} onChange={(event) => (this.search = event.target.value)}/>
      <br /><br />
      {this.shows
      .filter((show) => (show.title.toLowerCase().includes(this.search.toLowerCase())))
      .map((show) => (
        <>
            <Card title={show.title} key={show.id}>
              <Row>
                <Column>{show.description}</Column>
                </Row>
              <Row>
                <Column>Terningkast: {''}
                  { this.ratings
                    .filter((showRating) => (showRating.showId === show.id))
                    .reduce((average, showRating, _index, ratings) => (average + showRating.rating / ratings.length), 0).toFixed(2)
                  }
                </Column>
                <Column>
                  Gi terningkast <br />
                  { [1,2,3,4,5,6].map((rates)=>(
                    <img key={rates} src={rates+'.png'} width={'60vh'} style={{cursor:'pointer'}} onClick={() => this.rate(rates,show.id)}/>
                  ))
                  }
                  {' '}
                </Column>
              </Row>
              <Row>
                <Column>
                  <Button.Light onClick={() => history.push('/shows/' + show.id)}>Rediger</Button.Light>
                </Column>
              </Row>
            </Card>
            <br />
            </>
          ))}
      </Card>
      </>
    );
  }

  rate(rating: number,showId: number){
    showService
    .addRating(rating, showId)
    .then(() => {this.mounted()});
  }

  mounted() {
    showService
    .getShows()
    .then((shows) => (this.shows = shows))
    .catch(err => console.error(err));

    showService
    .getRatings()
    .then((rating) => (this.ratings = rating))
    .catch(err => console.error(err));
  }
}

class ShowCreate extends Component {
  show: Show = new Show();

  render(){
    return(
      <>
      <Card title="Legg til program">
          <Form.Label>Tittel</Form.Label>
          <Form.Input type="text" value={this.show.title} onChange={(event) => (this.show.title = event.target.value)} />
          <Form.Label>Beskrivelse</Form.Label>
          <Form.Input type="text" value={this.show.description} onChange={(event) => (this.show.description = event.target.value)} />
          <br />
          <Row>
            <Column>
              <Button.Success onClick={() => this.add()}>Legg til</Button.Success>
              {' '}
              <Button.Danger onClick={() => history.push('/')}>Avbryt</Button.Danger>
            </Column>
          </Row>
      </Card>

      </>
    )
  }

  add() {
    showService
    .createShow(this.show)
    .then(() => history.push('/'))
    .catch(err => console.error(err));
  }
}

class ShowEdit extends Component<{ match: { params: { id: number } } }> {
  show: Show = new Show();

  render(){
    return(
      <>
      <Card title="Rediger program">
          <Form.Label>Tittel</Form.Label>
          <Form.Input type="text" value={this.show.title} onChange={(event) => (this.show.title = event.target.value)} />
          <Form.Label>Beskrivelse</Form.Label>
          <Form.Input type="text" value={this.show.description} onChange={(event) => (this.show.description = event.target.value)} />
          <br />
          <Row>
            <Column>
              <Button.Success onClick={() => this.edit()}>Lagre</Button.Success>
              {' '}
              <Button.Light onClick={() => history.push('/')}>Avbryt</Button.Light>
              {' '}
              <Button.Danger onClick={() => this.handleDelete()}>Slett</Button.Danger>
            </Column>
          </Row>         
      </Card>
      </>
    )
  }
  handleDelete() {
    { confirm('Vil du slette programmet?') ?
      showService.deleteShow(this.show.id)
      .then(() => history.push('/'))
      .catch(err => console.error(err))
     : console.log('cancel');
  }
}

  edit() {
    showService.updateShow(this.show)
    .then(() => history.push('/'))
    .catch(err => console.error(err));
  }
  mounted(){
    showService
    .getShow(this.props.match.params.id)
    .then((show) => (this.show = show))
    .catch(err => console.error(err));
  }
}

ReactDOM.render(
  <div>
    <Alert />
    <HashRouter>
      <div>
        <Route exact path="/" component={ShowList} />
        <Route exact path="/shows/:id" component={ShowEdit} />
        <Route exact path="/create" component={ShowCreate} />
      </div>
    </HashRouter>
  </div>,
  document.getElementById('root')
);
