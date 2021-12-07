import React, { Component } from 'react'
import Navbar from '../shared/navbar/navbar';
class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: { email: "", name: "", password: "" }
        }
    }
    onTextChange = (e, origin) => {
        let { user } = this.state
        switch (origin) {
            case "email": this.setState({ user: { ...user, email: e.target.value } }); break;
            case "name": this.setState({ user: { ...user, name: e.target.value } }); break;
            case "password": this.setState({ user: { ...user, password: e.target.value } }); break;
        }
    }
    render() {
        let { user } = this.state
        return (
            <>
                <Navbar />
                <br />
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-6 col-md-8 col-sm-12">
                            <h3 className="text-center">Registration Page</h3>
                            <br />
                            <div className="card">
                                <div className="card-body">
                                    <div className="form-group">
                                        <label htmlFor="">Email</label>
                                        <input className="form-control" type="email" placeholder="lameesaboudarwish@gmail.com" value={user.email} onChange={(e) => this.onTextChange(e, "email")} />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="">Full Name</label>
                                        <input className="form-control" type="text" placeholder="lamees Abou Darwish" value={user.name} onChange={(e) => this.onTextChange(e, "name")} />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="">Password</label>
                                        <input className="form-control" type="password" value={user.password} onChange={(e) => this.onTextChange(e, "password")} />
                                    </div>
                                    <button className="btn btn-block btn-success">Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
export default Register