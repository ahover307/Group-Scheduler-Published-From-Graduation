import React from "react";

export function partyDescriptions(partyRoom) {
    switch (parseInt(partyRoom)) {
        //Main Gym
        case 1:
            return (
                <div>
                    Time on trampolines, foam pits, and fun on the spring floor!
                </div>
            );
        //KidMaze
        case 2:
            return (
                <div>
                    Tubes and slides for you to climb and play in!
                </div>
            );
        //Rock Wall
        case 3:
            return (
                <div>
                    Our 40 foot wall is sure to have your guests having fun
                </div>
            );
        //Preschool
        case 4:
            return (
                <div>
                    The perfect room for our younger friends, even including a ball pit, and trampoline just their size.
                </div>
            );
        //Ninja
        case 5:
            return (
                <div>
                    The ultimate of party rooms, the Ninja Warrior course will have anyone tired by the end.
                </div>
            );
        default:
            return;
    }
}