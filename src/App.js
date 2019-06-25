import React, { Component } from 'react';
import Particles from 'react-particles-js';

import Register from './components/Register/Register';
import SignIn from './components/SignIn/SignIn';
import Navigation from './components/Navigation/Navigation';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import './App.css';

const praticesOptions = {
  particles: {
    number: {
      value: 100,
      desity: {
        enables: true,
        value_area: 800
      }
    }
  }
}



const initialState = {
  input: '',
  imageUrl: '',
  boxes: [],
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  },
}


class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }

    })
  }

  // componentDidMount() {
  //   fetch('http://localhost:3000')
  //     .then(response => response.json())
  //     .then();
  // }

  onRouteChange = (route) => {
    if (route === 'home') {
      this.setState({ isSignedIn: true });
    }
    else if (route === 'signout') {
      this.setState(initialState);
    }

    this.setState({ route });
  }

  calculateFaceLoction = (data) => {

    const regions = data.outputs[0].data.regions;

    console.log(regions);

    return regions.map(region => {
      const clarifaiFace = region.region_info.bounding_box;
      const image = document.getElementById('inputImage');
      const width = Number(image.width);
      const height = Number(image.height);
      return {
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - (clarifaiFace.right_col * width),
        bottomRow: height - (clarifaiFace.bottom_row * height)
      }
    });
    // [0].region_info.bounding_box;
    // const image = document.getElementById('inputimage');
    // const width = Number(image.width);
    // const height = Number(image.height);
    // return {
    //   leftCol: clarifyFace.left_col * width,
    //   topRow: clarifyFace.top_row * height,
    //   rightCol: width - (clarifyFace.right_col * width),
    //   bottomRow: height - (clarifyFace.bottom_row * height)
    // }
  }

  displayFaceboxes = (boxes) => {
    this.setState({ boxes });
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    fetch('https://fast-eyrie-35897.herokuapp.com/imageurl', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        input: this.state.input
      })
    })
      .then(response => response.json())
      .then(
        response => {
          if (response) {
            fetch('https://fast-eyrie-35897.herokuapp.com/image', {
              method: 'put',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                id: this.state.user.id
              })
            }).then(response => response.json())
              .then(count =>
                this.setState(Object.assign(this.state.user, { entries: count })
                ))
              .catch(console.log);
          }
          this.displayFaceboxes(this.calculateFaceLoction(response));
        })
      .catch(err => {
        console.log(err);
      })
  }

  render() {
    const { isSignedIn, imageUrl, route, boxes } = this.state;
    return (
      <div className="App" >
        <Particles className='particles'
          params={praticesOptions}
        />
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
        {route === 'home' ?
          <div>
            <Logo />
            <Rank name={this.state.user.name} entries={this.state.user.entries} />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit} />
            <FaceRecognition boxes={boxes} imageUrl={imageUrl} />
          </div >
          : (route === 'signin' ?
            <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
            : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
          )
        }
      </div >
    )
  }
}

export default App;
