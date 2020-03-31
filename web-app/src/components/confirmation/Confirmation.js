import React, {Component} from 'react';
import './Confirmation.css';

class confirmation extends Component {
    render() {
        return (

            <div class = "main">
                <h3> Your Party has been Confirmed</h3>
                <span><strong> Party Package: </strong> 'Placeholder Party Package' </span>
                <span><strong> Party Date: </strong> 'Party Day' 'Party Month' 'Party Date' </span>
                <span><strong> Party Area(s): </strong> 'Placeholder Party Area', 'Optional Area 2', 'Optional Area 3' </span>
                <span><strong> Party Time: </strong> 'Placeholder Party Time (start and end)' </span>
                <span><strong> Party For: </strong> 'Placeholder Child Name' </span>
                <span><strong> Host: </strong> 'Placeholder Host Name' </span>
            </div>

        );
    }

}

export default confirmation;