import React, { Component } from 'react';
import firebase from 'firebase';
import { View } from 'react-native';
import { Header, Card, CardSection, Button, Spinner } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
  state = { loggedIn: null };

  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyDKbWbtmR4BBUIw3-BlrIDQRd50pwvxoAE',
      authDomain: 'authentication-2abf3.firebaseapp.com',
      databaseURL: 'https://authentication-2abf3.firebaseio.com',
      projectId: 'authentication-2abf3',
      storageBucket: 'authentication-2abf3.appspot.com',
      messagingSenderId: '1070937468232'
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('user:');
        console.log(user);
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  onPressLogOut() {
    console.log('onPressLogOut()');
    firebase.auth().signOut()
      .then(this.setState({ loggedIn: false }));
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          // Button is not displaying properly on my end when
          // added alone, so I had to make do and put Card, and
          // CardSection to make the Button render properly
          <Card>
            <CardSection>
              <Button onPress={this.onPressLogOut.bind(this)}>
                Log out
              </Button>
            </CardSection>
          </Card>
        );

      case false:
        return <LoginForm />;

      default:
        return <Spinner size='large' />;
    }
  }

  render() {
    return (
      <View>
        <Header headerText='Authentication' />
        {this.renderContent()}
      </View>
    );
  }
}

export default App;
