import React from 'react';
import MapView from 'react-native-maps';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Animated,
  Image,
  Dimensions,
} from "react-native";
import { Button } from 'react-native-elements';

export default class MapsView extends React.Component {
    state = {
      markers: [],
      region: {
        latitude: 52.43575,
        longitude: 16.849424,
        latitudeDelta: 0.04864195044303443,
        longitudeDelta: 0.040142817690068,
      },
    };
  
    componentWillMount() {
      this.index = 0;
      this.animation = new Animated.Value(0);
    }
    goToImageView = (data) => {
        this.props.navigation.navigate("Image", data);
    }
    fetchData = () => {
        fetch("https://locatedimg.azurewebsites.net/Home/GetAllBlobs", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
                })
                .then((response) => response.json())
                .then((json) => {
                    console.log(json)
                    var array = [];
                    json.forEach(element => {
                        var object = {}
                        object.coordinate = {}
                        object.image = {}
                        object.coordinate.latitude = element.latitude;
                        object.coordinate.longitude = element.longitude;
                        object.image.uri = element.uri;
                        array.push(object);
                    });
                    this.setState({markers: array});
                })
                .catch((error) => console.error(error))
    }

    componentDidMount() {
        this.fetchData();
      // We should detect when scrolling has stopped then animate
      // We should just debounce the event listener here
      this.animation.addListener(({ value }) => {
        let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
        if (index >= this.state.markers.length) {
          index = this.state.markers.length - 1;
        }
        if (index <= 0) {
          index = 0;
        }
  
        clearTimeout(this.regionTimeout);
        this.regionTimeout = setTimeout(() => {
          if (this.index !== index) {
            this.index = index;
            const { coordinate } = this.state.markers[index];
            this.map.animateToRegion(
              {
                ...coordinate,
                latitudeDelta: this.state.region.latitudeDelta,
                longitudeDelta: this.state.region.longitudeDelta,
              },
              350
            );
          }
        }, 10);
      });
    }
  
    render() {
      const interpolations = this.state.markers.map((marker, index) => {
        const inputRange = [
          (index - 1) * CARD_WIDTH,
          index * CARD_WIDTH,
          ((index + 1) * CARD_WIDTH),
        ];
        const scale = this.animation.interpolate({
          inputRange,
          outputRange: [1, 2.5, 1],
          extrapolate: "clamp",
        });
        const opacity = this.animation.interpolate({
          inputRange,
          outputRange: [0.35, 1, 0.35],
          extrapolate: "clamp",
        });
        return { scale, opacity };
      });
  
      return (
        <View style={styles.container}>
          <MapView
            ref={map => this.map = map}
            initialRegion={this.state.region}
            style={styles.container}
          >
            {this.state.markers.map((marker, index) => {
              const scaleStyle = {
                transform: [
                  {
                    scale: interpolations[index].scale,
                  },
                ],
              };
              const opacityStyle = {
                opacity: interpolations[index].opacity,
              };
              return (
                <MapView.Marker key={index} coordinate={marker.coordinate}>
                  <Animated.View style={[styles.markerWrap, opacityStyle]}>
                    <Animated.View style={[styles.ring, scaleStyle]} />
                    <View style={styles.marker} />
                  </Animated.View>
                </MapView.Marker>
              );
            })}
          </MapView>
          <Animated.ScrollView
            horizontal
            scrollEventThrottle={1}
            showsHorizontalScrollIndicator={false}
            snapToInterval={CARD_WIDTH}
            onScroll={Animated.event(
              [
                {
                  nativeEvent: {
                    contentOffset: {
                      x: this.animation,
                    },
                  },
                },
              ],
              { useNativeDriver: true }
            )}
            style={styles.scrollView}
            contentContainerStyle={styles.endPadding}
          >
            {this.state.markers.map((marker, index) => (
              <View style={styles.card} key={index}>
                <Image
                  source={marker.image}
                  style={styles.cardImage}
                  resizeMode="cover"
                />
                <Button buttonStyle ={styles.buttonRegister} title="View" onPress={() => {this.goToImageView(marker)}}></Button>
              </View>
            ))}
          </Animated.ScrollView>
        </View>
      );
    }
  }
      
      const { width, height } = Dimensions.get("window");
      
      const CARD_HEIGHT = height / 3.5;
      const CARD_WIDTH = CARD_HEIGHT - 50;
      
      
  

    const styles = StyleSheet.create({
        buttonRegister: {
            backgroundColor: "#32a852"
        },
        container: {
          flex: 1,
        },
        scrollView: {
          position: "absolute",
          bottom: 30,
          left: 0,
          right: 0,
          paddingVertical: 10,
        },
        endPadding: {
          paddingRight: width - CARD_WIDTH,
        },
        card: {
          padding: 10,
          elevation: 2,
          backgroundColor: "#FFF",
          marginHorizontal: 10,
          shadowColor: "#000",
          shadowRadius: 5,
          shadowOpacity: 0.3,
          shadowOffset: { x: 2, y: -2 },
          height: CARD_HEIGHT,
          width: CARD_WIDTH,
          overflow: "hidden",
        },
        cardImage: {
          flex: 3,
          width: "100%",
          height: "100%",
          alignSelf: "center",
        },
        textContent: {
          flex: 1,
        },
        cardtitle: {
          fontSize: 12,
          marginTop: 5,
          fontWeight: "bold",
        },
        cardDescription: {
          fontSize: 12,
          color: "#444",
        },
        markerWrap: {
          alignItems: "center",
          justifyContent: "center",
        },
        marker: {
          width: 8,
          height: 8,
          borderRadius: 4,
          backgroundColor: "rgba(130,4,150, 0.9)",
        },
        ring: {
          width: 24,
          height: 24,
          borderRadius: 12,
          backgroundColor: "rgba(130,4,150, 0.3)",
          position: "absolute",
          borderWidth: 1,
          borderColor: "rgba(130,4,150, 0.5)",
        },
      });