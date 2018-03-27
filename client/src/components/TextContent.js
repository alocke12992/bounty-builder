import React from 'react';
import ReactQuill from 'react-quill';
import { Button, Divider, Form, Segment, Responsive, Image } from 'semantic-ui-react';

class TextContent extends React.Component {
  state = { content: '', edit: false, text: '', };

  toggleForm = () => {
    this.setState( { edit: !this.state.edit, } );
  };

  handleChange = value => {
    this.setState( { text: value, } );
  };

  handleSubmit = e => {
    e.preventDefault();
   };

  showForm = () => {
    return (
      <Form onSubmit={ this.handleSubmit }>
        <ReactQuill
          value={ this.state.text }
          onChange={ this.handleChange }
        />
        <Divider hidden />
        <Form.Button color="green">
          Submit Changes
        </Form.Button>
        <Divider />
      </Form>
    );
  };

  render() {
    const { content, edit } = this.state;
    return (
      <Segment>
        { edit && this.showForm() }
        <Button onClick={ this.toggleForm }>
          { edit ? 'Back' : 'Edit' }
        </Button>
        <Divider hidden />
        <div
          dangerouslySetInnerHTML={ {
            __html: content,
          } }
        />
        <Responsive
          as={ Image }
          minWidth={ 768 }
          src={ require( '../assets/images/logo.svg' ) }
          style={ { height: '75px', width: 'auto' } }
          alt="HN Token"
        />
        <Responsive
          as={ Image }
          maxWidth={ 767 }
          src={ require( '../assets/images/logo.svg' ) }
          style={ { height: '60px', width: 'auto' } }
          alt="HN Token"
        />
        <p>
          Deconet makes software development
          sustainable by equitably rewarding
          contributors using the the economic
          infrastructure and technology of the
          blockchain.
          </p>
        <p>
          The Deconet bounty program aims to include
          the global developer community and
          innovation partners in building a more
          rewarding and more innovative economic
          system for the creators and maintainers of
          today’s digital infrastructure.
        </p>
      </Segment>
    );
  }
}

export default TextContent;
