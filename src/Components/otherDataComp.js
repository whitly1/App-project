import React, { Component } from 'react'
class OtherDataComp extends Component {
    constructor() {
        super()
        this.state = {}
    }
    render() {
        return (
            <div>
                Street:<input type="text" defaultValue={this.props.user.address.street} onChange={(e) => { this.props.streetValue(e.target.value) }} /><br />
                City:<input type="text" defaultValue={this.props.user.address.city} onChange={(e) => { this.props.cityValue(e.target.value) }} /><br />
                Zip-Code:<input type="text" defaultValue={this.props.user.address.zipcode} onChange={(e) => { this.props.zipcodeValue(e.target.value) }} /><br />
            </div>
        )
    }
}
export default OtherDataComp
