// @flow

import {DrawerActions} from '@react-navigation/native';
import React from 'react';
import {
    Animated,
    SafeAreaView, StatusBar,
    TextInput,
    TouchableHighlight,
    TouchableOpacity,
    View,
} from 'react-native';

import {getName} from '../../app/functions';
import {ColorSchemeRegistry} from '../../base/color-scheme';
import {translate} from '../../base/i18n';
import {Icon, IconMenu, IconWarning,} from '../../base/icons';

import {MEDIA_TYPE} from '../../base/media';
import JitsiStatusBar from '../../base/modal/components/JitsiStatusBar';
import {LoadingIndicator, Text} from '../../base/react';
import {connect} from '../../base/redux';
import {
    createDesiredLocalTracks,
    destroyLocalDesktopTrackIfExists,
    destroyLocalTracks
} from '../../base/tracks';
import BaseTheme from '../../base/ui/components/BaseTheme.native';

import {
    AbstractWelcomePage,
    _mapStateToProps as _abstractMapStateToProps,
    type Props as AbstractProps
} from './AbstractWelcomePage';
import VideoSwitch from './VideoSwitch';
import WelcomePageTabs from './WelcomePageTabs';
import styles, {PLACEHOLDER_TEXT_COLOR} from './styles';
import {ViewStyle} from "react-native";

import SettingMenuButton
    from "../../toolbox/components/native/SettingMenuButton";


type Props = AbstractProps & {

    /**
     * The color schemed style of the Header component.
     */
    _headerStyles: Object,

    /**
     * Default prop for navigating between screen components(React Navigation).
     */
    navigation: Object,

    /**
     * The redux {@code dispatch} function.
     */
    dispatch: Function,
    /**
     * Default prop for navigating between screen components(React Navigation).
     */
    route: Object,

    /**
     * The translate function.
     */
    t: Function
};

/**
 * The native container rendering the welcome page.
 *
 * @augments AbstractWelcomePage
 */
class WelcomePage extends AbstractWelcomePage<*> {

    /**
     * Constructor of the Component.
     *
     * @inheritdoc
     */
    constructor(props: Props) {
        super(props);

        // $FlowExpectedError
        this.state._fieldFocused = false;

        // $FlowExpectedError
        this.state.hintBoxAnimation = new Animated.Value(0);

        // Bind event handlers so they are only bound once per instance.
        this._onFieldFocusChange = this._onFieldFocusChange.bind(this);
        this._renderHintBox = this._renderHintBox.bind(this);

        // Specially bind functions to avoid function definition on render.
        this._onFieldBlur = this._onFieldFocusChange.bind(this, false);
        this._onFieldFocus = this._onFieldFocusChange.bind(this, true);
    }

    _onFieldBlur: () => void;

    _onFieldFocus: () => void;

    _onJoin: () => void;

    _onRoomChange: (string) => void;

    _updateRoomname: () => void;
    sha256 = async (message) => {

        // encode as UTF-8
        const msgBuffer = new TextEncoder('utf-8').encode(message);

        // hash the message
        const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);

        // convert ArrayBuffer to Array
        const hashArray = Array.from(new Uint8Array(hashBuffer));

        // convert bytes to hex string
        const hashHex = hashArray.map(b => ('00' + b.toString(16)).slice(-2)).join('');
        return hashHex;
    }


    /**
     * Implements React's {@link Component#componentDidMount()}. Invoked
     * immediately after mounting occurs. Creates a local video track if none
     * is available and the camera permission was already granted.
     *
     * @inheritdoc
     * @returns {void}
     */


    componentDidMount() {
        super.componentDidMount();
        let randomStr = (Math.random() + 1).toString(36).substring(1);
        this.sha256(randomStr).then(hash => this.setState({room: hash}));

        this._updateRoomname();

        const {
            _headerStyles,
            dispatch,
            navigation
        } = this.props;

        // navigation.setOptions({
        //     headerLeft: () => (
        //         <TouchableOpacity
        //             /* eslint-disable-next-line react/jsx-no-bind */
        //             // onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        //             onPress={() => null}
        //             style={{paddingHorizontal: 20}}
        //             // style={styles.drawerNavigationIcon}
        //         >
        //             <Icon
        //                 size={30}
        //                 src={gearIcon}
        //                 // style={_headerStyles.headerButtonIcon}
        //             />
        //         </TouchableOpacity>
        //     ),
        //     // eslint-disable-next-line react/no-multi-comp
        //     headerRight: () =>
        //         <View style={{paddingHorizontal: 20}}>
        //             <VideoSwitch/>
        //         </View>
        // });
        if (!this.props._settings.startAudioOnly) {
            dispatch(destroyLocalTracks());
        } else {
            dispatch(destroyLocalDesktopTrackIfExists());

            // Make sure we don't request the permission for the camera from
            // the start. We will, however, create a video track iff the user
            // already granted the permission.
            navigator.permissions.query({name: 'camera'}).then(response => {
                response === 'granted'
                && dispatch(createDesiredLocalTracks(MEDIA_TYPE.VIDEO));
            });
        }
    }

    /**
     * Implements React's {@link Component#render()}. Renders a prompt for
     * entering a room name.
     *
     * @inheritdoc
     * @returns {ReactElement}
     */
    render() {
        // We want to have the welcome page support the reduced UI layout,
        // but we ran into serious issues enabling it so we disable it
        // until we have a proper fix in place. We leave the code here though, because
        // this part should be fine when the bug is fixed.
        //
        // NOTE: when re-enabling, don't forget to uncomment the respective _mapStateToProps line too

        /*
        const { _reducedUI } = this.props;

        if (_reducedUI) {
            return this._renderReducedUI();
        }
        */

        return this._renderFullUI();
    }

    /**
     * Renders the insecure room name warning.
     *
     * @inheritdoc
     */
    _doRenderInsecureRoomNameWarning() {
        return (
            <View
                style={[
                    styles.messageContainer,
                    styles.insecureRoomNameWarningContainer
                ]}>
                <Icon
                    src={IconWarning}
                    style={styles.insecureRoomNameWarningIcon}/>
                <Text style={styles.insecureRoomNameWarningText}>
                    {this.props.t('security.insecureRoomNameWarning')}
                </Text>
            </View>
        );
    }

    /**
     * Constructs a style array to handle the hint box animation.
     *
     * @private
     * @returns {Array<Object>}
     */
    _getHintBoxStyle() {
        return [
            styles.messageContainer,
            styles.hintContainer,
            {
                // $FlowExpectedError
                opacity: this.state.hintBoxAnimation
            }
        ];
    }

    _onFieldFocusChange: (boolean) => void;

    /**
     * Callback for when the room field's focus changes so the hint box
     * must be rendered or removed.
     *
     * @private
     * @param {boolean} focused - The focused state of the field.
     * @returns {void}
     */
    _onFieldFocusChange(focused) {
        if (focused) {
            // Stop placeholder animation.
            // $FlowExpectedError
            this._clearTimeouts();
            this.setState({
                _fieldFocused: true,
                roomPlaceholder: ''
            });
        } else {
            // Restart room placeholder animation.
            this._updateRoomname();
        }

        Animated.timing(
            // $FlowExpectedError
            this.state.hintBoxAnimation,

            // $FlowExpectedError
            {
                duration: 300,
                toValue: focused ? 1 : 0
            })
            .start(animationState =>

                // $FlowExpectedError
                animationState.finished

                // $FlowExpectedError
                && !focused
                && this.setState({
                    _fieldFocused: false
                }));
    }

    _renderHintBox: () => React$Element<any>;

    /**
     * Renders the hint box if necessary.
     *
     * @private
     * @returns {React$Node}
     */
    _renderHintBox() {
        const {t} = this.props;

        // $FlowExpectedError
        if (this.state._fieldFocused) {
            return (
                <Animated.View style={this._getHintBoxStyle()}>
                    <View style={styles.hintTextContainer}>
                        <Text style={styles.hintText}>
                            {t('welcomepage.roomnameHint')}
                        </Text>
                    </View>
                    <View style={styles.hintButtonContainer}>
                        {this._renderJoinButton()}
                    </View>
                </Animated.View>
            );
        }

        return null;
    }

    /**
     * Renders the join button.
     *
     * @private
     * @returns {ReactElement}
     */
    _renderJoinButton() {
        const {t} = this.props;
        let children;


        if (this.state.joining) {
            // TouchableHighlight is picky about what its children can be, so
            // wrap it in a native component, i.e. View to avoid having to
            // modify non-native children.
            children = (
                <View>
                    <LoadingIndicator
                        color={styles.buttonText.color}
                        size='small'/>
                </View>
            );
        } else {
            children = (
                <Text style={styles.buttonText}>
                    {this.props.t('welcomepage.join')}
                </Text>
            );
        }

        return (
            <TouchableHighlight
                accessibilityLabel=
                    {t('welcomepage.accessibilityLabel.join')}
                onPress={this._onJoin}
                style={styles.button}
                underlayColor={BaseTheme.palette.ui12}>
                {children}
            </TouchableHighlight>
        );
    }

    /**
     * Renders the full welcome page.
     *
     * @returns {ReactElement}
     */

    _renderFullUI() {

        const roomnameAccLabel = 'welcomepage.accessibilityLabel.roomname';
        const {t} = this.props;


        return (
            <>
                <View style={HEADER}>

                    <SettingMenuButton/>
                    <VideoSwitch/>
                </View>
                <JitsiStatusBar/>
                <StatusBar hidden/>
                <View style={styles.welcomePage}>
                    <SafeAreaView style={styles.roomContainer}>
                        <View style={styles.joinControls}>
                            {/*<Text style={styles.enterRoomText}>*/}
                            {/*    {t('welcomepage.roomname')}*/}
                            {/*</Text>*/}
                            {/* // $FlowExpectedError*/}

                            {/*<Text numberOfLines={1}*/}
                            {/*      style={[styles.textInput]}>*/}
                            {/*    {this.state.roomName}*/}
                            {/*</Text>*/}

                            {/*<TextInput*/}
                            {/*    accessibilityLabel={t(roomnameAccLabel)}*/}
                            {/*    autoCapitalize={'none'}*/}
                            {/*    autoComplete={'off'}*/}
                            {/*    autoCorrect={false}*/}
                            {/*    autoFocus={false}*/}
                            {/*    onBlur={this._onFieldBlur}*/}
                            {/*    // onChangeText={this._onRoomChange}*/}
                            {/*    onFocus={this._onFieldFocus}*/}
                            {/*    // onSubmitEditing={this._onJoin}*/}
                            {/*    placeholder={this.state.roomPlaceholder}*/}
                            {/*    placeholderTextColor={PLACEHOLDER_TEXT_COLOR}*/}
                            {/*    returnKeyType={'go'}*/}
                            {/*    spellCheck={false}*/}
                            {/*    style={styles.textInput}*/}
                            {/*    underlineColorAndroid='transparent'*/}
                            {/*    value={this.state.roomName}*/}
                            {/*/>*/}
                            {

                                // $FlowExpectedError
                                // this._renderInsecureRoomNameWarning()
                            }

                            {
                                // this._renderHintBox()
                            }
                        </View>
                    </SafeAreaView>
                    {/* // $FlowExpectedError*/}
                    <WelcomePageTabs disabled={this.state._fieldFocused}/>
                    <View style={BUTTON_CONTAINER}>
                        {this._renderJoinButton()}
                    </View>
                </View>
            </>
        );
    }

    /**
     * Renders a "reduced" version of the welcome page.
     *
     * @returns {ReactElement}
     */
    _renderReducedUI() {
        const {t} = this.props;

        return (
            <View style={styles.reducedUIContainer}>
                <Text style={styles.reducedUIText}>
                    {t('welcomepage.reducedUIText', {app: getName()})}
                </Text>
            </View>
        );
    }
}

/**
 * Maps part of the Redux state to the props of this component.
 *
 * @param {Object} state - The Redux state.
 * @returns {Object}
 */
function _mapStateToProps(state) {
    return {
        ..._abstractMapStateToProps(state),
        _headerStyles: ColorSchemeRegistry.get(state, 'Header')

        // _reducedUI: state['features/base/responsive-ui'].reducedUI
    };
}

export default translate(connect(_mapStateToProps)(WelcomePage));
const HEADER: ViewStyle = {
    backgroundColor: 'rgba(20, 24, 44, 0.6)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: '12%',
    padding: 20
}
const BUTTON_CONTAINER: ViewStyle = {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 50
}
