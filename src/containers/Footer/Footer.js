import React, {Component} from 'react';
import style from "./Footer.module.css";

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return <footer className={this.props.type===1?style.Footer:style.FooterL}>
            <div className="container">
                <div className="row">
                    <div className="col-md-12 py-5">
                        <div className={style.IconsContainer}>
                            <a className="fb-ic" href={"https://www.facebook.com/CEII.UCA/"}>
                                <i className="fab fa-facebook-f fa-lg white-text mr-md-5 mr-3 fa-2x" style={{color:"white"}}> </i>
                            </a>
                            <a className="ins-ic" href={"https://www.instagram.com/ceii.uca/"}>
                                <i className="fab fa-instagram fa-lg white-text mr-md-5 mr-3 fa-2x" style={{color:"white"}}> </i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    }
}

export default Footer