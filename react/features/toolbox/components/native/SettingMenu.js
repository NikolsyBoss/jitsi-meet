// @flow

import React, {PureComponent} from 'react';
import {Divider, Switch} from 'react-native-paper';
import {NativeModules, Text, View} from 'react-native'
import {ColorSchemeRegistry} from '../../../base/color-scheme';
import {BottomSheet, hideDialog, isDialogOpen} from '../../../base/dialog';
import {connect} from '../../../base/redux';
import {StyleType} from '../../../base/styles';
import {ReactionMenu} from '../../../reactions/components';
import {isReactionsEnabled} from '../../../reactions/functions.any';
import {getMovableButtons} from '../../functions';
import FormRow from "../../../welcome/components/settings/components/FormRow";
import {THUMB_COLOR} from "../../../welcome/components/settings/components/styles";
import {colorMap as palette} from "../../../base/ui/Tokens";
import FormSectionAccordion
    from "../../../welcome/components/settings/components/FormSectionAccordion";
import {_mapStateToProps as _abstractMapStateToProps} from "../../../welcome/components/AbstractWelcomePage";
import {AbstractSettingsView} from "../../../settings/components/AbstractSettingsView";

const {AppInfo} = NativeModules;


type Props = {
    _bottomSheetStyles: StyleType,
    _isOpen: boolean,
    _recordingEnabled: boolean,
    _width: number,
    _reactionsEnabled: boolean,
    dispatch: Function
};

type State = {

    scrolledToTop: boolean
}

let OverflowMenu_; // eslint-disable-line prefer-const

class SettingMenu extends AbstractSettingsView<Props, State> {

    constructor(props: Props) {
        super(props);
        const {
            disableCallIntegration,
            disableCrashReporting,
            disableP2P,
            displayName,
            email,
            serverURL,
            startWithAudioMuted,
            startWithVideoMuted
        } = props._settings || {};

        this.state = {
            scrolledToTop: true,
            disableCallIntegration,
            disableCrashReporting,
            disableP2P,
            displayName,
            email,
            serverURL,
            startWithAudioMuted,
            startWithVideoMuted
        };

        // Bind event handlers so they are only bound once per instance.
        this._onCancel = this._onCancel.bind(this);
        this.onStartAudioMutedChange = this.onStartAudioMutedChange.bind(this);
        this.onStartVideoMutedChange = this.onStartVideoMutedChange.bind(this);
        this._renderReactionMenu = this._renderReactionMenu.bind(this);
    }
    onStartAudioMutedChange(startWithAudioMuted) {
        super._onStartAudioMutedChange(startWithAudioMuted);
        this.setState({
            startWithAudioMuted
        });
    }


    onStartVideoMutedChange(startWithVideoMuted) {
        super._onStartVideoMutedChange(startWithVideoMuted);
        this.setState({
            startWithVideoMuted
        });
    }
    render() {
        console.log('PROPS ASA', this.props)
        console.log('state ASA', this.state)
        const {_bottomSheetStyles, _width, _reactionsEnabled} = this.props;
        const toolbarButtons = getMovableButtons(_width);

        const buttonProps = {
            ...this.props,
            afterClick: this._onCancel,
            showLabel: true,
            styles: _bottomSheetStyles.buttons
        };

        const topButtonProps = {
            afterClick: this._onCancel,
            showLabel: true,
            styles: {
                ..._bottomSheetStyles.buttons,
                style: {
                    ..._bottomSheetStyles.buttons.style,
                    borderTopLeftRadius: 16,
                    borderTopRightRadius: 16
                }
            }
        };
        const {
            disableCallIntegration,
            disableCrashReporting,
            disableP2P,
            displayName,
            email,
            serverURL,
            startWithAudioMuted,
            startWithVideoMuted
        } = this.state;
        return (
            <BottomSheet style={{backgroundColor: 'rgba(20, 24, 44, 0.9)'}}
                         onCancel={this._onCancel}
            >
                <FormRow textStyle={{color: '#fff'}}
                         label='settingsView.startWithAudioMuted'>
                    <Switch
                        onValueChange={this.onStartAudioMutedChange}
                        thumbColor={'#fff'}
                        trackColor={'#fff'}
                        value={startWithAudioMuted}/>
                </FormRow>
                <FormRow label='settingsView.startWithVideoMuted'
                         textStyle={{color: '#fff'}}
                >
                    <Switch
                        onValueChange={this.onStartVideoMutedChange}
                        thumbColor={THUMB_COLOR}
                        trackColor={{true: palette.screen01Header}}
                        value={startWithVideoMuted}/>
                </FormRow>
                <FormRow textStyle={{color: '#fff'}}
                         accordion={false}
                         expandable={false}
                         label='settingsView.buildInfoSection'>
                    <></>
                </FormRow>
                <View style={{flexDirection: 'row', paddingHorizontal: 15}}>
                    <Text style={{color: "#fff"}}>
                        Версия
                    </Text>
                    <Text style={{color: "#fff"}}>
                        {` 1.0.1`}
                    </Text>
                </View>
                <View style={{marginBottom: 40}}/>
            </BottomSheet>

        );
    }

    _onCancel: () => boolean;

    /**
     * Hides this {@code OverflowMenu}.
     *
     * @private
     * @returns {boolean}
     */
    _onCancel() {
        if (this.props._isOpen) {
            this.props.dispatch(hideDialog(OverflowMenu_));

            return true;
        }

        return false;
    }

    _renderReactionMenu: () => React$Element<any>;

    _renderReactionMenu() {
        return (<ReactionMenu
            onCancel={this._onCancel}
            overflowMenu={true}/>);
    }


}

/**
 * Function that maps parts of Redux state tree into component props.
 *
 * @param {Object} state - Redux state.
 * @private
 * @returns {Props}
 */
function _mapStateToProps(state) {
    console.log('STATE', state)
    return {
        _bottomSheetStyles: ColorSchemeRegistry.get(state, 'BottomSheet'),
        _isOpen: isDialogOpen(state, OverflowMenu_),
        _width: state['features/base/responsive-ui'].clientWidth,
        _settings: state['features/base/settings'],
        _reactionsEnabled: isReactionsEnabled(state),
    };
}

OverflowMenu_ = connect(_mapStateToProps)(SettingMenu);

export default OverflowMenu_;
