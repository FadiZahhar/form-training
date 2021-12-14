import React  from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Menu, Container, Button} from "semantic-ui-react";
import SignedInMenu from "./SignedinMenu";
import SignedOutMenu from "./SignedOutMenu";

export default function NavBar({setFormOpen}){
    const [authenticated,setAuthentication]= useState(false);
    const history = useHistory();

    function handleSignOut(){
        setAuthentication(false);
        history.push('/');
    }
    return(
        <Menu inverted  fixed='top'>
            <Container>
                <Menu.Item as={NavLink} exact to='/' header>
                    <img src="/assets/logo.png" alt="logo" style={{marginRight: 15}}/>
                Re-vents
                </Menu.Item>
                <Menu.Item as={NavLink} to='/events' name='Events'/>
                {authenticated && 
                <Menu.Item as={NavLink} to='/createEvent'>
                    <Button  positive inverted content='Create Event'/>
                </Menu.Item> 
                }
                {authenticated ?
                <SignedInMenu signOut={handleSignOut}/> : 
                <SignedOutMenu setAuthentication={setAuthentication}/>}
                
                
                
            </Container>

        </Menu>
    )
}