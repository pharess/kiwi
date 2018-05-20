// - Import react components
import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import SvgDehaze from 'material-ui/svg-icons/image/dehaze'
import { green700, grey400, blue500 } from 'material-ui/styles/colors'
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar'
import IconButton from 'material-ui/IconButton'
import RaisedButton from 'material-ui/RaisedButton'
import Popover, { PopoverAnimationVertical } from 'material-ui/Popover'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import Paper from 'material-ui/Paper'
import NotificationsIcon from 'material-ui/svg-icons/social/notifications'
import EventListener, { withOptions } from 'react-event-listener'


// - Import components
import UserAvatar from 'UserAvatar'
import Notify from 'Notify'


// - Import actions
import * as globalActions from 'globalActions'
import * as authorizeActions from 'authorizeActions'

// - Create HomeHeader component class
export class HomeHeader extends Component {

    /**
     * Component constructor
     * @param  {object} props is an object properties of component
     */
    constructor(props) {
        super(props)

        // Default state
        this.state = {
            /**
             * User avatar popover is open if true
             */
            openAvatarMenu: false,
            /**
             * Show header title or not (true/false)
             */
            showTitle: true,
            /**
             * If true notification menu will be open
             */
            openNotifyMenu: false
        }

        // Binding functions to `this`
        this.onToggleSidebar = this.onToggleSidebar.bind(this)
        this.handleCloseNotify = this.handleCloseNotify.bind(this)

    }



    /**
     * Handle close notification menu 
     * 
     * 
     * @memberof HomeHeader
     */
    handleCloseNotify = () => {
        this.setState({
            openNotifyMenu: false
        })
    }


    // On click toggle sidebar
    onToggleSidebar = () => {
        if (this.props.sidebarStatus) {
            this.props.sidebar(false)

        } else {
            this.props.sidebar(true)

        }
    }

    /**
     * Handle notification touch 
     * 
     * 
     * @memberof HomeHeader
     */
    handleNotifyTouchTap = (event) => {
        // This prevents ghost click.
        event.preventDefault();

        this.setState({
            openNotifyMenu: true,
            anchorEl: event.currentTarget,
        });
    }

    /**
     * Handle touch on user avatar for popover
     * 
     * 
     * @memberof HomeHeader
     */
    handleAvatarTouchTap = (event) => {
        // This prevents ghost click.
        event.preventDefault();

        this.setState({
            openAvatarMenu: true,
            anchorEl: event.currentTarget,
        });
    }

    /**
     * Handle logout user
     * 
     * 
     * @memberof HomeHeader
     */
    handleLogout = () => {
        this.props.logout();
    }

    /**
     * Handle close popover
     * 
     * 
     * @memberof HomeHeader
     */
    handleRequestClose = () => {
        this.setState({ openAvatarMenu: false });
    };


    /**
     * Handle resize event for window to manipulate home header status
     * @param  {event} evt is the event is passed by winodw resize event
     */
    handleResize = (evt) => {

        // Set initial state
        var width = window.innerWidth

        if (width >= 600 && !this.state.showTitle) {
            this.setState({
                showTitle: true
            })

        }
        else if (width < 600 && this.state.showTitle) {

            this.setState({
                showTitle: false
            })
        }
    }

    componentDidMount = () => {
        this.handleResize()
    }


    // Render app DOM component
    render() {
        var styles = {
            toolbarStyle: {
                backgroundColor: "",
                transition: "all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms",
                boxSizing: "border-box",
                fontFamily: "Roboto, sans-serif",
                position: "fixed",
                zIndex: "1101",
                width: "100%",
                top: "0px",
                boxShadow: '0 1px 8px rgba(0,0,0,.3)'
            },
            avatarStyle: {
                margin: 5,
                cursor: 'pointer'
            }


        }

        return (

            <Toolbar style={styles.toolbarStyle} className="g__greenBox">
                <EventListener
                    target="window"
                    onResize={this.handleResize}
                    onKeyUp={this.handleKeyUp}
                />
                {/* Left side */}
                <ToolbarGroup firstChild={true}>

                    <IconButton iconStyle={{ color: "#fff" }} onClick={this.onToggleSidebar} >
                        <SvgDehaze style={{ color: "#fff", marginLeft: "15px", cursor: "pointer" }} />
                    </IconButton>

                    {/* Header title */}
                    <div style={{marginLeft: '15px'}}>
                        <svg width="21" height="17" xmlns="http://www.w3.org/2000/svg"><path d="M5.97 11.151L1.017 8.117c-.308-.184-.292-.437.048-.57L19.547.16c.334-.132.72-.301.647.043l-3.42 16.618s.513.304.204.12l-6.272-3.034-2.797 2.417-1.94-5.173zm1.293-.878l1.145 3.64c.078.25.198.251.26-.02l.534-2.327 8.357-8.74c.384-.4.333-.457-.113-.125L7.263 10.273z" fill="#FFF" /></svg>
                    </div>
                    <ToolbarTitle style={{ color: "#fff", marginLeft: "15px" }} text="Oasis" />
                </ToolbarGroup>
                <ToolbarGroup>

                </ToolbarGroup>

                {/* Notification */}
                <ToolbarGroup lastChild={true}>
                    <div className="homeHeader__right">
                        {this.props.notifyCount > 0 ? (<IconButton tooltip="Notifications" onTouchTap={this.handleNotifyTouchTap}>
                            <div className="homeHeader__notify">
                                <div className='title'>{this.props.notifyCount}</div>
                            </div>
                        </IconButton>)

                            : (<IconButton tooltip="Notifications" onTouchTap={this.handleNotifyTouchTap}>
                                <NotificationsIcon color='rgba(255, 255, 255, 0.87)' />
                            </IconButton>)}
                        <Notify open={this.state.openNotifyMenu} anchorEl={this.state.anchorEl} onRequestClose={this.handleCloseNotify} />


                        {/* User avatar*/}
                        <UserAvatar
                            onTouchTap={this.handleAvatarTouchTap}
                            fullName={this.props.fullName}
                            fileName={this.props.avatar}
                            size={32}
                            style={styles.avatarStyle}
                        />
                        <Popover
                            open={this.state.openAvatarMenu}
                            anchorEl={this.state.anchorEl}
                            anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                            targetOrigin={{ horizontal: 'left', vertical: 'top' }}
                            onRequestClose={this.handleRequestClose}
                        >
                            <Menu>
                                <NavLink to={`/${this.props.uid}`}><MenuItem primaryText="Profile" style={{ color: blue500 }} /></NavLink>
                                <NavLink to='/settings'><MenuItem primaryText="Settings" style={{ color: "rgb(117, 117, 117)" }} /></NavLink>
                                <MenuItem primaryText="Log Out" style={{ color: 'red' }} onClick={this.handleLogout.bind(this)} />
                            </Menu>
                        </Popover>
                    </div>
                </ToolbarGroup>

            </Toolbar>



        )
    }
}

// - Map dispatch to props
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        logout: () => dispatch(authorizeActions.dbLogout())
    }
}

// - Map state to props
const mapStateToProps = (state, ownProps) => {

    let notifyCount = state.notify.userNotifies
        ? Object
            .keys(state.notify.userNotifies)
            .filter((key) => !state.notify.userNotifies[key].isSeen).length
        : 0
    return {
        avatar: state.user.info && state.user.info[state.authorize.uid] ? state.user.info[state.authorize.uid].avatar : '',
        fullName: state.user.info && state.user.info[state.authorize.uid] ? state.user.info[state.authorize.uid].fullName : '',
        title: state.global.headerTitle,
        notifyCount
    }
}

// - Connect component to redux store
export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader)
