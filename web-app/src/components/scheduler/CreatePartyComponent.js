import React from "react";

const CreatePartyComponent = () => {
    return (
        <div className={"section"}>
            <div>
                <span className={"card-title"}> Schedule a room</span>
                <p>Enter your information below</p>
                <form>
                    <label>
                        Name:
                        <input type={'text'} name={'name'}/>
                    </label>
                    <input type={'submit'} value={"Submit"}/>
                </form>
            </div>
        </div>
    );
}

export default CreatePartyComponent;