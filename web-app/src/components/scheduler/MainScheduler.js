import $ from 'jquery'
import React, {Component} from "react";
import TimeList from "./TimeList";
import CreatePartyComponent from './CreatePartyComponent';
import PartyPackageSelector from "./PartyPackageSelector";
import PartyAreaSelector from "./PartyAreaSelector";
import M from "materialize-css";

import {Carousel} from 'react-materialize'


class MainScheduler extends Component {
    state = {
        partyType: 0
    };

    componentDidMount() {
        M.AutoInit();
        console.log('Auto init ran')
    }

    nextEvent() {

        $(document).ready(function () {
            $("#myCarousel").on('click', '#btnContinue', function (e) {

                e.stopPropagation();
                const el = document.getElementById("myCarousel");
                const instance = M.Carousel.getInstance(el);
                instance.next();

            });
        });

    }

    prevEvent() {
        $(document).ready(function () {
            $("#myCarousel").on('click','#btnPrevious', function (e) {

                e.stopPropagation();
                const el = document.getElementById("myCarousel");
                const instance = M.Carousel.getInstance(el);
                instance.prev();

            });
        });

    }


    render() {
        return (
            <Carousel
                className={"center carousel"}
                options={{
                    fullWidth: true,
                    indicators: false
                }}
                carouselId={'myCarousel'}
                style = {{height: '750px'}}>
                <div className={'carousel-item'}>
                    <PartyPackageSelector/>
                    <button className={'btn next'} id={"btnContinue"} onClick={this.nextEvent()}>Next</button>
                </div>
                <div className={'carousel-item'}>
                    <PartyAreaSelector/>
                    <button className={'btn'} id={"btnPrevious"} onClick={this.prevEvent()}>Back</button>
                    <button className={'btn'} id={"btnContinue"} onClick={this.nextEvent()}>Next</button>
                </div>
                <div className={'carousel-item'}>
                    <TimeList/>
                    <button className={'btn'} id={"btnPrevious"} onClick={this.prevEvent()}>Back</button>
                    <button className={'btn'} id={"btnContinue"} onClick={this.nextEvent()}>Next</button>
                </div>
                <div className={'carousel-item'} style={{height : '700px'}}>
                    <CreatePartyComponent/>
                    <button className={'btn'} id={"btnContinue"} onClick={this.nextEvent()}>Next</button>
                </div>
            </Carousel>

        )


    }
}

export default MainScheduler;

