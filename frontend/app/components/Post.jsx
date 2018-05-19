// - Import react components
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { push } from 'react-router-redux'
import moment from 'moment'
import { createAction as action } from 'redux-actions'
import Linkify from 'react-linkify'


// - Material UI
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import SvgShare from 'material-ui/svg-icons/social/share'
import SvgLink from 'material-ui/svg-icons/content/link'
import SvgComment from 'material-ui/svg-icons/Communication/comment'
import SvgFavorite from 'material-ui/svg-icons/action/favorite'
import SvgFavoriteBorder from 'material-ui/svg-icons/action/favorite-border'
import Checkbox from 'material-ui/Checkbox'
import FlatButton from 'material-ui/FlatButton'
import Divider from 'material-ui/Divider'
import { grey200, grey400, grey600, white } from 'material-ui/styles/colors'
import Paper from 'material-ui/Paper'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import TextField from 'material-ui/TextField'
import Dialog from 'material-ui/Dialog'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import IconMenu from 'material-ui/IconMenu'
import reactStringReplace from 'react-string-replace'


// - Import app components
import CommentGroup from 'CommentGroup'
import PostWrite from 'PostWrite'
import Img from 'Img'
import IconButtonElement from 'IconButtonElement'
import UserAvatar from 'UserAvatar'

// - Import actions
import * as voteActions from 'voteActions'
import * as postActions from 'postActions'
import * as globalActions from 'globalActions'

// - Create component class
export class Post extends Component {
    /**
     * Component constructor
     * @param  {object} props is an object properties of component
     */
    constructor(props) {
        super(props)
        this.state = {
            /**
             * Post text
             */
            text: this.props.body,
            /**
             * It's true if whole the text post is visible
             */
            readMoreState: false,
            /**
             * Handle open comment from parent component
             */
            openComments: false,
            /**
             * If it's true, share dialog will be open
             */
            shareOpen: false,
            /**
             * If it's true comment will be disabled on post
             */
            disableComments: this.props.disableComments,
            /**
             * If it's true share will be disabled on post
             */
            disableSharing: this.props.disableSharing,
            /**
             * Title of share post 
             */
            shareTitle: 'Share On',
            /**
             * If it's true, post link will be visible in share post dialog
             */
            openCopyLink: false,
            /**
            * If it's true, post write will be open
            */
            openPostWrite: false
        }

        // Binding functions to this
        this.handleReadMore = this.handleReadMore.bind(this)
        this.getOpenCommentGroup = this.getOpenCommentGroup.bind(this)
        this.handleVote = this.handleVote.bind(this)
        this.handleOpenShare = this.handleOpenShare.bind(this)
        this.handleCloseShare = this.handleCloseShare.bind(this)
        this.handleCopyLink = this.handleCopyLink.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.handleOpenPostWrite = this.handleOpenPostWrite.bind(this)
        this.handleClosePostWrite = this.handleClosePostWrite.bind(this)
        this.handleOpenComments = this.handleOpenComments.bind(this)
    }


    /**
     * Toggle on show/hide comment
     * @param  {event} evt passed by clicking on comment slide show
     */
    handleOpenComments = (evt) => {
        this.setState({
            openComments: !this.state.openComments
        })
    }

    /**
     * Open post write
     * 
     * 
     * @memberof Blog
     */
    handleOpenPostWrite = () => {
        this.setState({
            openPostWrite: true
        })
    }

    /**
     * Close post write
     * 
     * 
     * @memberof Blog
     */
    handleClosePostWrite = () => {
        this.setState({
            openPostWrite: false
        })
    }

    /**
     * Delete a post
     * 
     * 
     * @memberof Post
     */
    handleDelete = () => {
        this.props.delete(this.props.id)
    }

    /**
     * Show copy link 
     * 
     * 
     * @memberof Post
     */
    handleCopyLink = () => {
        this.setState({
            openCopyLink: true,
            shareTitle: 'Copy Link'
        })
    }

    /**
     * Open share post
     * 
     * 
     * @memberof Post
     */
    handleOpenShare = () => {
        this.setState({
            shareOpen: true
        })
    }

    /**
     * Close share post
     * 
     * 
     * @memberof Post
     */
    handleCloseShare = () => {
        this.setState({
            shareOpen: false,
            shareTitle: 'Share On',
            openCopyLink: false
        })
    }

    /**
     * Handle vote on a post
     * 
     * 
     * @memberof Post
     */
    handleVote = () => {
        if (this.props.userVoteStatus) {
            this.props.unvote()
        }
        else {
            this.props.vote()
        }
    }

    /**
     * Set open comment group function on state which passed by CommentGroup component
     * @param  {function} open the function to open comment list
     */
    getOpenCommentGroup = (open) => {
        this.setState({
            openCommentGroup: open
        })
    }

    /**
     * Handle read more event
     * @param  {event} evt  is the event passed by click on read more
     */
    handleReadMore(evt) {
        this.setState({
            readMoreState: !this.state.readMoreState

        });
    }
    componentDidMount() {

    }



    /**
     * Reneder component DOM
     * @return {react element} return the DOM which rendered by component
     */
    render() {

        /**
           * DOM styles
           * 
           * 
           * @memberof Post
           */
        const styles = {
            counter: {
                lineHeight: '36px',
                color: '#777',
                fontSize: '12px',
                marginRight: '6px'
            },
            postBody: {
                wordWrap: "break-word"
            },
            dialog: {
                width: '',
                maxWidth: '530px',
                borderRadius: "4px"
            },
            rightIconMenu: {
                position: 'absolute',
                right: 18,
                top: 8,
            },
            iconButton: {
                width: 24,
                height: 24

            }

        }



        const RightIconMenu = () => (
            <IconMenu iconButtonElement={IconButtonElement} style={{ display: "block", position: "absolute", top: "0px", right: "4px", transform: 'rotate(90deg)'}}>
                <MenuItem primaryText="Edit" onClick={this.handleOpenPostWrite} />
                <MenuItem primaryText="Delete" onClick={this.handleDelete} />
                <MenuItem primaryText={this.props.disableComments ? "Enable comments" : "Disable comments"} onClick={() => this.props.toggleDisableComments(!this.props.disableComments)} />
                <MenuItem primaryText={this.props.disableSharing ? "Enable sharing" : "Disable sharing"} onClick={() => this.props.toggleSharingComments(!this.props.disableSharing)} />
            </IconMenu>
        )

        const { ownerUserId, setHomeTitle, goTo, ownerDisplayName, creationDate, avatar, fullName, isPostOwner, image, body } = this.props
        // Define variables
        return (
            <div style={{backgroundColor: 'white', border: '1px solid #dddfe2', borderRadius: '5px'}}>
                <CardHeader
                    title={<NavLink to={`/${ownerUserId}`}>{ownerDisplayName}</NavLink>}
                    subtitle={moment.unix(creationDate).fromNow()}
                    avatar={<NavLink to={`/${ownerUserId}`}><UserAvatar fullName={fullName} fileName={avatar} size={36} /></NavLink>}
                >
                    {isPostOwner ? (<div style={styles.rightIconMenu}><RightIconMenu /></div>) : ''}
                </CardHeader>
                <CardText style={styles.postBody}>
                    <Linkify properties={{ target: '_blank', style: { color: 'blue' } }}>
                        {reactStringReplace(body, /#(\w+)/g, (match, i) => (
                            <NavLink
                                style={{ color: 'green' }}
                                key={match + i}
                                to={`/tag/${match}`}
                                onClick={evt => {
                                    evt.preventDefault()
                                    goTo(`/tag/${match}`)
                                    setHomeTitle(`#${match}`)
                                }}
                            >
                                #{match}

                            </NavLink>

                        ))}
                    </Linkify>
                </CardText>

                {image ? (
                    <CardMedia>
                        <Img fileName={image} />
                    </CardMedia>) : ''}

                <CardActions>
                    <div style={{ margin: "16px 8px", display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex' }}>
                            <div className='g__circle' onClick={this.handleVote}>
                                <Checkbox
                                    checkedIcon={<SvgFavorite style={{ fill: '#EC425C' }} />}
                                    uncheckedIcon={<SvgFavoriteBorder style={{ fill: '#757575' }} />}
                                    defaultChecked={this.props.userVoteStatus}
                                    style={{ transform: 'translate(6px, 6px)' }}
                                />
                            </div>
                            <div style={styles.counter}> {this.props.voteCount > 0 ? this.props.voteCount : ''} </div>
                        </div>
                        <div style={{ display: 'flex' }}>
                            {!this.props.disableComments ? (<div style={{ display: 'inherit' }}>
                                {/* <FloatingActionButton  style={{ margin: "0 8px" }} backgroundColor={white} iconStyle={{ color: grey600, fill: grey600, height: "36px", width: "36px" }} secondary={false}> */}
                                    <SvgComment onClick={this.handleOpenComments} viewBox="0 -9 24 34" style={{ height: "30px", width: "30px" }} />
                                {/* </FloatingActionButton> */}
                                <div style={styles.counter}>{this.props.commentCount > 0 ? this.props.commentCount : ''} </div></div>) : ''}
                            {!this.props.disableSharing ? 
                                // <FloatingActionButton style={{ margin: "0 8px" }} backgroundColor={white} iconStyle={{ color: grey600, fill: grey600, height: "36px", width: "36px" }} secondary={false}>
                                    <SvgShare onClick={this.handleOpenShare} viewBox="0 -9 24 34" style={{ height: "30px", width: "30px" }} /> : ''}
                                {/* </FloatingActionButton>) : ''} */}
                        </div>
                    </div>
                </CardActions>

                <CommentGroup open={this.state.openComments} ownerPostUserId={this.props.ownerUserId} onToggleRequest={this.handleOpenComments} isPostOwner={this.props.isPostOwner} disableComments={this.props.disableComments} postId={this.props.id} />

                {/* Copy link dialog*/}
                <Dialog
                    title="Share On"
                    modal={false}
                    open={this.state.shareOpen}
                    onRequestClose={this.handleCloseShare}
                    overlayStyle={{ background: "rgba(0,0,0,0.12)" }}
                    contentStyle={styles.dialog}
                    autoDetectWindowHeight={false}
                    actionsContainerStyle={{ borderTop: "1px solid rgb(224, 224, 224)" }}
                >
                    {!this.state.openCopyLink
                        ? (<Paper >
                            <Menu>
                                <MenuItem primaryText="Copy Link" leftIcon={<SvgLink />} onClick={this.handleCopyLink} />
                            </Menu>
                        </Paper>)
                        : <TextField fullWidth={true} id="text-field-default" defaultValue={`${location.origin}/${this.props.ownerUserId}/posts/${this.props.id}`} />
                    }
                </Dialog>

                <PostWrite
                    open={this.state.openPostWrite}
                    onRequestClose={this.handleClosePostWrite}
                    edit={true}
                    text={this.props.body}
                    image={this.props.image ? this.props.image : ''}
                    id={this.props.id}
                    disableComments={this.props.disableComments}
                    disableSharing={this.props.disableSharing}
                />

            </div>

        )
    }
}

/**
 * Map dispatch to props
 * @param  {func} dispatch is the function to dispatch action to reducers
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        vote: () => dispatch(voteActions.dbAddVote(ownProps.id, ownProps.ownerUserId)),
        unvote: () => dispatch(voteActions.dbDeleteVote(ownProps.id)),
        delete: (id) => dispatch(postActions.dbDeletePost(id)),
        toggleDisableComments: (status) => dispatch(postActions.dbUpdatePost({ id: ownProps.id, disableComments: status }, _ => _)),
        toggleSharingComments: (status) => dispatch(postActions.dbUpdatePost({ id: ownProps.id, disableSharing: status }, _ => _)),
        goTo: (url) => dispatch(push(url)),
        setHomeTitle: (title) => dispatch(globalActions.setHeaderTitle(title || ''))


    }
}

/**
 * Map state to props
 * @param  {object} state is the obeject from redux store
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapStateToProps = (state, ownProps) => {
    const { uid } = state.authorize
    let votes = state.vote.postVotes[ownProps.id]
    const post = (state.post.userPosts[uid] ? Object.keys(state.post.userPosts[uid]).filter((key) => { return ownProps.id === key }).length : 0)

    return {
        avatar: state.user.info && state.user.info[ownProps.ownerUserId] ? state.user.info[ownProps.ownerUserId].avatar || '' : '',
        fullName: state.user.info && state.user.info[ownProps.ownerUserId] ? state.user.info[ownProps.ownerUserId].fullName || '' : '',
        commentCount: state.comment.postComments[ownProps.id] ? Object.keys(state.comment.postComments[ownProps.id]).length : 0,
        voteCount: state.vote.postVotes[ownProps.id] ? Object.keys(state.vote.postVotes[ownProps.id]).length : 0,
        userVoteStatus: votes && Object.keys(votes).filter((key) => votes[key].userId === state.authorize.uid)[0] ? true : false,
        isPostOwner: post > 0
    }
}

// - Connect component to redux store
export default connect(mapStateToProps, mapDispatchToProps)(Post)
