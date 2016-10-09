import {Component, Input, ViewChild} from '@angular/core';
import {NavController, Platform} from 'ionic-angular';
import {
    GoogleMap, GoogleMapsEvent, GoogleMapsLatLng, Geolocation, GoogleMapsMarker, CameraPosition,
    AnimateCameraOptions, GoogleMapsMarkerOptions
} from 'ionic-native';

declare var plugin: any;


@Component({
    selector: 'map',
    templateUrl: 'map.html'
})
export class MapComponent {
    public map: GoogleMap;
    public position: GoogleMapsLatLng;

    constructor(public navCtrl: NavController, private platform: Platform) {

    }

    ngAfterViewInit() {
        let location = new GoogleMapsLatLng(48.858165, 2.353622);;

        this.map = new GoogleMap('divmap');


        this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
            console.log('map ready');
            this.map.setCenter(location);
            //this.map.setCameraTarget(position);
            this.map.on(GoogleMapsEvent.CAMERA_CHANGE).subscribe(() => {
                console.log('map change');
            });
        });
    }

    onClick() {
        console.log('onClick')
        this.position = new GoogleMapsLatLng(48.858165, 2.353622);;
        this.map.animateCamera({
            target: <GoogleMapsLatLng>{lat:48.858165 , lng: 2.353622},
            zoom: 17,
            tilt: 60,
            bearing: 140,
            duration: 5000
        }).then(() => {
            this.map.addMarker(<GoogleMapsMarkerOptions>{
                position:  <GoogleMapsLatLng>{lat:48.858165 , lng: 2.353622},
                title: "Welecome to \n" +
                "Cordova GoogleMaps plugin for iOS and Android",
                snippet: "This plugin is awesome!",
                animation: plugin.google.maps.Animation.BOUNCE
            }).then((marker) => {
                marker.showInfoWindow();

                // Catch the click event
                marker.addEventListener(plugin.google.maps.event.INFO_CLICK).subscribe( () => alert("Hello world!"))
            })
        })
    }
}