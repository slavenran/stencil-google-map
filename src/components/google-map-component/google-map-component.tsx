import { h, Component, Prop } from "@stencil/core";
import { Geolocation } from '@capacitor/geolocation';

@Component({
  tag: 'google-map-component',
  styleUrl: 'google-map-component.scss',
  shadow: true
})
export class GoogleMapComponent {
  
  @Prop() apiKey: string;

  public map: any;
  private mapElement: HTMLElement;

  init(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.injectSDK().then(() => {
        this.initMap().then(() => {
          resolve(true);
        }, (err) => {
          reject(err);
        });
      }, (err) => {
        reject(err);
      });
    });
  }

  // dynamically creates google maps import and mapInit function
  injectSDK(): Promise<any> {
    return new Promise((resolve) => {
      window['mapInit'] = () => {
        resolve(true);
      }
      let script = document.createElement('script');
      script.id = 'googleMaps';
      if(this.apiKey){
        script.src = 'https://maps.googleapis.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit';
      } else {
        script.src = 'https://maps.googleapis.com/maps/api/js?callback=mapInit';
      }
      document.body.appendChild(script);
    });
  }

  initMap(): Promise<any> {
    return new Promise((resolve, reject) => {
      // centers map at user current position
      Geolocation.getCurrentPosition().then((position) => {
        const latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        const mapOptions = {
          center: latLng,
          zoom: 15,
          draggableCursor: 'default'
        };
        this.map = new google.maps.Map(this.mapElement, mapOptions);

        // adds marker to user lat and lng
        let marker = new google.maps.Marker({
          map: this.map,
          position: latLng,
          animation: 4,
          draggable: true
        })

        this.map.addListener("click", (mapsMouseEvent) => {
          marker.setPosition(mapsMouseEvent.latLng);
          marker.setAnimation(4);
        })
        resolve(true);
      }, () => {
        reject('Could not initialise map');
      });
    });
  }

  componentDidLoad() {
    this.init().then(() => {
      console.log("Google Maps ready.")
    }, (err) => {
      console.log(err);
    });
  }

  render() {
    return <div ref={(el) => this.mapElement = el as HTMLElement} id='google-map-container'></div>;
  }
}